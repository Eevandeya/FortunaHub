import { useEffect, useState } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useForm } from 'react-hook-form';
import Select from '@components.common/select/Select.jsx';
import { VisitorsCountDisplay } from '@components.common/display/numberDisplay.jsx';
import TransparentButton from '@components.common/button/transparentButton.jsx';
import { useReservation } from '@hooks/useReservation.js';
import { CONTACT_METHODS } from '@root.consts/contactMethods.js';
import { useSelector } from 'react-redux';

const ReservationForm = () => {
    const [visitors, setVisitors] = useState(0);
    const [contactMethod, setContactMethod] = useState(CONTACT_METHODS[0]);
    const { handleError } = useErrorHandler();
    const { nickname: bookingNickname, phoneNumber: bookingPhoneNumber } =
        useSelector((state) => state.booking.order.customer);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        defaultValues: {
            nickname: bookingNickname ?? '',
            phoneNumber: bookingPhoneNumber ?? '',
        },
    });
    const {
        reserve,
        status,
        statusMessage: message,
    } = useReservation(contactMethod, visitors, { isSubmitting, isValid });

    useEffect(() => {
        if (status === 'success' && isSubmitting) {
            reset({ nickname: '', phoneNumber: '' });
            setVisitors(0);
        }
    }, [status]);

    const increase = () => {
        setVisitors((value) => value + 1);
    };
    const decrease = () => {
        setVisitors((value) => value - 1);
    };

    const onError = (errors) => {
        handleError(errors, 'component', { at: 'onError', type: 'validate' });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
            }}>
            <form onSubmit={handleSubmit(reserve, onError)}>
                <div className='field'>
                    <label className='label' htmlFor='name'>
                        Имя
                    </label>
                    <div className='control'>
                        <input
                            {...register('nickname', {
                                required: 'Имя обязательно',
                                validate: (value) => {
                                    if (!/[a-zа-я]+/gi.test(value))
                                        return 'Некорректное имя';
                                },
                            })}
                            placeholder='Введите имя'
                            type='text'
                            className='input'
                            id='name'
                        />
                    </div>
                </div>
                {errors.nickname && (
                    <div className='field'>
                        <p className='has-text-danger'>
                            {errors.nickname?.message}
                        </p>
                    </div>
                )}
                <div className='field'>
                    <label className='label' htmlFor='phoneNumber'>
                        Номер телефона
                    </label>
                    <div className='control'>
                        <input
                            {...register('phoneNumber', {
                                required: 'Номер телефона обязателен',
                                validate: (value) => {
                                    if (!/[78]\d{10}/.test(value))
                                        return 'Некорректный номер телефона';
                                },
                            })}
                            type='text'
                            className='input'
                            placeholder='Введите номер телефона'
                            id='phoneNumber'
                        />
                    </div>
                </div>
                {errors.phoneNumber && (
                    <div className='field'>
                        <p className='has-text-danger'>
                            {errors.phoneNumber?.message}
                        </p>
                    </div>
                )}
                <div className='field'>
                    <label className='label'>Выберите способ связи</label>
                    <Select
                        options={CONTACT_METHODS}
                        value={contactMethod}
                        onChange={setContactMethod}
                        defaultValue={'Метод связи'}
                    />
                </div>
                <div className='field is-grouped is-left'>
                    <div className='control'>
                        <TransparentButton
                            onClick={decrease}
                            disabled={visitors <= 0}>
                            &#8212;
                        </TransparentButton>
                    </div>
                    <VisitorsCountDisplay data={visitors} />
                    <div className='control'>
                        <TransparentButton onClick={increase} disabled={false}>
                            &#43;
                        </TransparentButton>
                    </div>
                </div>
                <div className='field is-grouped is-right'>
                    <div className='control'>
                        <input type='reset' value='Отменить' />
                    </div>
                    <div className='control'>
                        <input type='submit' value='Выбрать' />
                    </div>
                </div>
            </form>
            <span>
                <h2>{message}</h2>
            </span>
        </div>
    );
};

export default ReservationForm;
