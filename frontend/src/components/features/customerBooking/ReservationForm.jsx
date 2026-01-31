import { useEffect, useState } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { Controller, useForm } from 'react-hook-form';
import Select from '@components.common/select/Select.jsx';
import { NumberDisplay } from '@components.common/displayInfo/numberDisplay/NumberDisplay.jsx';
import { useReservation } from '@hooks/useReservation.js';
import { CONTACT_METHODS } from '@root.consts/contactMethods.js';
import { useSelector } from 'react-redux';
import './reservationForm.css';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import Input from 'react-phone-number-input/input';
import Button from '../../common/button/Button.jsx';

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
        control,
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
        config,
    } = useReservation(contactMethod, visitors, { isSubmitting, isValid });

    useEffect(() => {
        if (status === 'success' && isSubmitting) {
            reset({ nickname: '', phoneNumber: '' });
            setVisitors(0);
        }
    }, [status]);

    const increase = () => {
        if (visitors > config?.max_visitors_count) return;
        setVisitors((value) => value + 1);
    };
    const decrease = () => {
        if (visitors <= 0) return;
        setVisitors((value) => value - 1);
    };

    const onError = (errors) => {
        handleError(errors, 'component', { at: 'onError', type: 'validate' });
    };

    return (
        <div className='form-container'>
            <header>
                <h4>Введите персональные данные</h4>
            </header>
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
                    <div className='control'>
                        <Controller
                            name='phoneNumber'
                            control={control}
                            rules={{
                                required: 'Номер телефона обязателен',
                                validate: (value) => {
                                    if (!isPossiblePhoneNumber(value))
                                        return 'Некорректный номер телефона';
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label className='label'>
                                        Номер телефона
                                        <Input
                                            {...field}
                                            country='RU'
                                            international
                                            withCountryCallingCode
                                            className='input'
                                        />
                                    </label>
                                    {fieldState.error && (
                                        <div className='field'>
                                            <p className='has-text-danger'>
                                                {fieldState.error?.message}
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Выберите способ связи</label>
                    <div className='control'>
                        <Select
                            options={CONTACT_METHODS}
                            value={contactMethod}
                            onChange={setContactMethod}
                            defaultValue='Способ связи'
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Выберите количество человек</label>
                    <div className='control'>
                        <NumberDisplay
                            count={visitors}
                            increase={increase}
                            decrease={decrease}
                            maxValue={config?.max_visitors_count}
                            fontColor='black'
                        />
                    </div>
                </div>
                <div className='field is-grouped is-right'>
                    <div className='control'>
                        <Button
                            type='reset'
                            onClick={() => reset()}
                            message='Сбросить'
                        />
                    </div>
                    <div className='control'>
                        <Button type='submit' message='Выбрать' />
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
