import { useEffect, useState } from 'react';
import { useInventory } from '@hooks/useInventory.jsx';
import Modal from '@components.features/Modal/Modal.jsx';
import ItemHandler from '@components.common/goods/itemHandler.jsx';
import { useErrorHandler } from '@hooks/useErrorHandler.js';

const AccesoriesRental = ({modalActive, setModalActive}) => {
    const [rentalError, setRentalError] = useState('');
    const [inventory, isLoading, requestError, reserve] = useInventory();
    const [items, setItems] = useState(null);
    const { handleApiError } = useErrorHandler();

    useEffect(() => {
        function setInventory() {
            const itemsObject = inventory.map((item, index) => {
                    return ({ max: item.quantity ?? 0, name: item.display_name, quantity: 0, slug: item.slug })
                });
            setItems(itemsObject);
        }

        setInventory();
    }, []);

    const handleIncrement = (item) => {
        const newCount = Math.min(item.quantity + 1, item.quantity);
        setItems((items) => [...items, { ...item, quantity: newCount }]);
  };

  const handleDecrement = (item) => {
        const newCount = Math.max(item.quantity - 1, 0);
        setItems((items) => [...items, { ...item, quantity: newCount }]);
  };

    async function modalHandleReserve(e) {
        e.preventDefault();
        try {
            await reserve(items);
        } catch(error) {
            handleApiError(error, {at : "AccessoriesRental"})
        }
    }

  return (
    <Modal active={modalActive} setActive={setModalActive}>
      <div className="box">
        <div className="content">
          <h2 className="title is-4">Банные принадлежности</h2>

          {items?.map((item, index) => (
            <ItemHandler
              key={index}
              item={item}
              count={item.quantity}
              max={item.max}
              onIncrement={() => handleIncrement(item)}
              onDecrement={() => handleDecrement(item)}
            />
          ))}

          {rentalError && (
            <div className="notification is-danger is-light">
              {rentalError}
            </div>
          )}

          <button
            className={`button is-primary is-fullwidth ${isLoading ? 'is-loading' : ''}`}
            onClick={modalHandleReserve}
            disabled={!items?.every(item => item.is_available)}
          >
            Забронировать
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default AccesoriesRental;
