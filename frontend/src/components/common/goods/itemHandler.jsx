const ItemHandler = ({ item, count = 0, maxCount,
                       handleIncrement, handleDecrement }) => {

  return (
    <div className="tags has-addons is-align-items-center mb-2 mr-2">
      <span className="tag is-medium is-light">
        <span className="icon-text">
          <span className="icon">
            <img
              alt={item.display_name} 
              style={{ width: '24px', height: '24px' }}
            />
          </span>
          <span>{item.display_name}</span>
        </span>
      </span>
      
      <span className="tag is-medium">
        <button 
          className="button is-small is-ghost" 
          onClick={handleDecrement}
          disabled={count <= 0}
        >
          <span className="icon is-small">-</span>
        </button>
        <span className="px-2">{count}</span>
        <button 
          className="button is-small is-ghost" 
          onClick={handleIncrement}
          disabled={count >= maxCount}
        >
          <span className="icon is-small">+</span>
        </button>
      </span>
    </div>
  );
};

export default ItemHandler;