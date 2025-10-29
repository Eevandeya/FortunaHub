import { useDispatch, useSelector } from 'react-redux';
import {
    setCustomerInfo,
    setPreferredContactMethod,
    setVisitorsCount,
} from '@store/bookingSlice.js';
import { useCallback, useEffect, useState } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useForm } from 'react-hook-form';
import Select from '@components.common/select/Select.jsx';
import { VisitorsCountDisplay } from '@components.common/display/numberDisplay.jsx';
import TransparentButton from '@components.common/button/transparentButton.jsx';

const ReservationForm = () => {
    const [visitors, setVisitors] = useState(0);
    const dispatch = useDispatch();
    const preferredContactMethod = useSelector(
        (state) => state.booking.order?.preferredContactMethod
    );
    //eslint-disable-next-line
    const [status, setStatus] = useState('');
    const { handleApiError, handleError } = useErrorHandler();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        defaultValues: { nickname: undefined, phoneNumber: undefined },
    });

    useEffect(() => {
        if (isSubmitting && isValid) {
            setStatus('Created');
        }
    }, [isSubmitting]);

    const setContactMethod = (data) => {
        dispatch(setPreferredContactMethod({ preferredContactMethod: data }));
    };

    const increase = () => {
        setVisitors((value) => value + 1);
    };
    const decrease = () => {
        setVisitors((value) => value - 1);
    };
    const bookingSubmitHandler = useCallback(
        (data) => {
            if (isValid) {
                try {
                    const customerData = {
                        nickname: data.nickname,
                        phoneNumber: data.phoneNumber,
                    };
                    dispatch(setCustomerInfo({ customer: customerData }));
                    dispatch(setVisitorsCount({ visitorsCount: visitors }));

                    /*
                    reserve({
                        customer: customerData,
                        items,
                        timeSlot,
                        visitorsCount: visitors,
                        preferredContactMethod,
                    });*/
                } catch (error) {
                    handleApiError(error, { at: 'BookingConfirm' });
                    setStatus('Canceled');
                    return;
                }
                reset({ nickname: '', phoneNumber: '' });
                setVisitors(0);

                //dispatch(reloadItems());
            }
        },
        [handleApiError, isValid, visitors]
    );

    const onError = (errors) => {
        handleError(errors, 'component', { at: 'onError', type: 'validate' });
    };
    //eslint-disable-next-line
    const onClick = () => {
        setStatus('Waiting');
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
            }}>
            <form onSubmit={handleSubmit(bookingSubmitHandler, onError)}>
                <div className='field'>
                    <label className='label' htmlFor='name'>
                        Имя
                    </label>
                    <div className='control'>
                        <input
                            {...register('nickname', {
                                required: 'Имя обязательно',
                                validate: (value) => {
                                    if (!/[a-z]+/gi.test(value))
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
                        options={['whatsapp', 'telegram', 'phone']}
                        value={preferredContactMethod}
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
                        <input type='reset' className='button is-danger' />
                    </div>
                    <div className='control'>
                        <input type='submit' className='button is-success' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;
