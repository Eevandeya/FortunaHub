import TransparentButton from '@components.common/button/transparentButton.jsx';
import { memo } from 'react';

const ItemHandler = memo(
    ({ item, count = 0, maxCount, itemType, onIncrement, onDecrement }) => {
        return (
            <div className='tags has-addons is-align-items-center mb-2 mr-2'>
                <span className='tag is-medium is-light'>
                    <span className='icon-text'>
                        <span className='icon'>
                            <img
                                alt={item.display_name}
                                style={{ width: '24px', height: '24px' }}
                            />
                        </span>
                        <span>{item.display_name}</span>
                    </span>
                </span>

                <span className='tag is-medium'>
                    <TransparentButton
                        onClick={onDecrement}
                        disabled={count <= 0}>
                        <span className='icon is-small'>-</span>
                    </TransparentButton>
                    <span className='px-2'>{count}</span>
                    <TransparentButton
                        onClick={onIncrement}
                        disabled={count >= maxCount}>
                        <span className='icon is-small'>+</span>
                    </TransparentButton>
                </span>
                <div
                    style={{
                        position: 'relative',
                        left: '20px',
                        top: '5px',
                        color: 'white',
                    }}>
                    {itemType}
                </div>
            </div>
        );
    }
);

export default ItemHandler;
