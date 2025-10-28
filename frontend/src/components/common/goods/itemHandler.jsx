import TransparentButton from '@components.common/button/transparentButton.jsx';
import { memo } from 'react';
import it from './item_handler.module.css';

const ItemHandler = memo(
    //eslint-disable-next-line
    ({ item, count = 0, maxCount, itemType, onIncrement, onDecrement }) => {
        return (
            <article className={it.item_handler}>
                <div className={it.content}>
                    <img
                        src={item.icon}
                        alt={item.name || 'Банные принадлежности'}
                        height={32}
                        width={32}
                        loading='lazy'
                    />
                    <p className={it.item_name}>{item.name}</p>
                </div>

                <div className={it.controls}>
                    <TransparentButton
                        onClick={onDecrement}
                        disabled={count <= 0}
                        aria-label={`Уменьшить количество ${item.name}`}
                        className={it.button}>
                        —
                    </TransparentButton>
                    <span
                        className={it.counter}
                        aria-live='polite'
                        title={`Текущее количество: ${count}`}>
                        {count}
                    </span>
                    <TransparentButton
                        onClick={onIncrement}
                        disabled={count >= maxCount}
                        aria-label={`Увеличить количество ${item.name}`}
                        className={it.button}>
                        +
                    </TransparentButton>
                </div>
            </article>
        );
    }
);

export default ItemHandler;
