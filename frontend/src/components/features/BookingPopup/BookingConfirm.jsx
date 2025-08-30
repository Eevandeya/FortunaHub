import { useBooking } from '@hooks/useBooking.js';
import { useEffect, useState } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useForm } from 'react-hook-form';
import Select from '@components.common/select/Select.jsx';
import bookingHandler from '@root.api/bookingHandler.js';
import Modal from '@components.features/Modal/Modal.jsx';


const BookingConfirm = ({modalActive, setModalActive}) =>
{

    const { getBookingData, setCustomerInfo, setVisitorsCount, setPreferredContactMethod, visitors_count, preferred_contact_method } = useBooking();
    const { handleApiError } = useErrorHandler();
    const { register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm(
      {
          defaultValues : {
              nickname : '',
              phone_number: ''
          }
      })

    useEffect(() => {

        if(isSubmitting && isValid) { setModalActive()}
    }, [isSubmitting])

    const bookingSubmitHandler = async (data) => {
        if (isValid) {
            setCustomerInfo({nickname: data.nickname, phone_number : data.phone_number})
            try {
                const {customer, items, timeSlot, visitors_count, preferred_contact_method} = getBookingData();
                await bookingHandler(customer, items, timeSlot, visitors_count, preferred_contact_method)

            } catch(error) {
                handleApiError(error, {at : "BookingConfirm"})
            }
        }
    }

    const onError = (errors, e) => {
        console.log(errors)
    }

    return (
      <Modal active={modalActive} setActive={setModalActive}>
          <h1>Оформление заказа</h1>
          <form onSubmit={handleSubmit(bookingSubmitHandler, onError)}>
              <div className="field">
                  <label className="label">Имя</label>
                  <div className="control">
                      <input {...register("nickname",
                        { required : "Имя обязательно",
                                validate: (value) => {
                            if(!/[a-z]+/ig.test(value))
                                return "Неккоректное имя"
                        }})} placeholder="Введите имя" type="text" className="input"/>
                  </div>
              </div>
              {errors.nickname && <div className="field"><p className="has-text-danger">{errors.nickname?.message}</p></div>}
              <div className="field">
                  <label className="label">Номер телефона</label>
                  <div className="control">
                      <input {...register("phone_number",
                        { required: "Номер телефона обязателен",
                                validate: (value) => {
                            if(!/[78]\d{10}/.test(value))
                                return "Неккоректный номер телефона"
                        }})}
                             type="text" className="input" placeholder="Введите номер телефона"/>
                  </div>
              </div>
              {errors.phone_number && <div className="field"><p className="has-text-danger">{errors.phone_number?.message}</p></div>}
              <div className="field">
                  <label className='label'>Выберите способ связи</label>
                  <Select options={['Whatsapp', 'Telegram', 'Phone']} value={preferred_contact_method} onChange={setPreferredContactMethod}
                            defaultValue={'Метод связи'}
                        />
              </div>
              <div className='field is-grouped is-left'>
                  <div className="control">
                      <button type="button" onClick={() => setVisitorsCount(visitors_count - 1)}>&#8212;</button>
                  </div>
                  <p style={{backgroundColor: "gray", minWidth: "50px", borderRadius: "30px", color: "white", display: "grid", justifyContent : "center"}}>{visitors_count}</p>
                  <div className="control">
                      <button type="button" onClick={() => setVisitorsCount(visitors_count + 1)}>&#43;</button>
                  </div>
              </div>
              <div className='field is-grouped is-right'>
                  <div className='control'>
                      <input type='reset' className='button is-danger'/>
                  </div>
                  <div className="control">
                      <input type='submit' className='button is-success'/>
                  </div>
            </div>

          </form>
      </Modal>
    )
}

export default BookingConfirm;
