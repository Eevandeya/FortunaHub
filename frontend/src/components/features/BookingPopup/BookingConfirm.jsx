import { useBooking } from '@hooks/useBooking.js';
import { useCallback, useEffect, useState } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useForm } from 'react-hook-form';
import Select from '@components.common/select/Select.jsx';
import bookingHandler from '@root.api/bookingHandler.js';
import Modal from '@components.features/Modal/Modal.jsx';
import { VisitorsCountDisplay } from '@components.common/display/numberDisplay.jsx';
import TransparentButton from '@components.common/button/transparentButton.jsx';

const BookingConfirm = ({ modalActive, setModalActive }) => {
    const [visitors, setVisitors] = useState(0);
    const {
        getBookingData,
        setCustomerInfo,
        setVisitorsCount,
        setPreferredContactMethod,
        preferredContactMethod,
    } = useBooking();
    const { handleApiError, handleError } = useErrorHandler();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        defaultValues: { nickname: undefined, phoneNumber: undefined },
    });

    useEffect(() => {
        if (isSubmitting && isValid) {
            setModalActive();
        }
    }, [isSubmitting]);

    const bookingSubmitHandler = useCallback(
        async (data) => {
            if (isValid) {
                const { customer, items, timeSlot, preferredContactMethod } =
                    getBookingData();
                const customerData = {
                    nickname: data.nickname ?? customer.nickname,
                    phoneNumber: data.phoneNumber ?? customer.phoneNumber,
                };
                setCustomerInfo(customerData);
                setVisitorsCount(visitors);
                try {
                    await bookingHandler(
                        customerData,
                        items,
                        timeSlot,
                        visitors,
                        preferredContactMethod
                    );
                } catch (error) {
                    handleApiError(error, { at: 'BookingConfirm' });
                }
            }
        },
        [
            getBookingData,
            handleApiError,
            isValid,
            setCustomerInfo,
            setVisitorsCount,
            visitors,
        ]
    );

    const onError = (errors) => {
        handleError(errors, 'component', { at: 'onError', type: 'validate' });
    };

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <h1>Оформление заказа</h1>
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
                                    if (!/[a-zA-zа-яА-я]+/gi.test(value))
                                        return 'Неккоректное имя';
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
                                        return 'Неккоректный номер телефона';
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
                        onChange={setPreferredContactMethod}
                        defaultValue={'Метод связи'}
                    />
                </div>
                <div className='field is-grouped is-left'>
                    <div className='control'>
                        <TransparentButton
                            onClick={() => setVisitors(visitors - 1)}
                            disabled={visitors <= 0}>
                            &#8212;
                        </TransparentButton>
                    </div>
                    <VisitorsCountDisplay data={visitors} />
                    <div className='control'>
                        <TransparentButton
                            onClick={() => setVisitors(visitors + 1)}
                            disabled={false}>
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
        </Modal>
    );
};

export default BookingConfirm;
