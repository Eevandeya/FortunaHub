import TransparentButton from '@components.common/button/transparentButton.jsx';
import { memo } from 'react';
import it from './item_handler.module.css';

const ItemHandler = memo(
    ({ item, count = 0, maxCount, onIncrement, onDecrement }) => {
        return (
            <article className={it.item_handler}>
                <div className={it.content}>
                    <h5 className={it.content_title}>{item.name}</h5>
                    <p className={it.content_description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Praesent iaculis erat sit amet velit lobortis
                        pellentesque. Nunc vehicula cursus nisl, sit amet
                        lacinia tortor hendrerit eu. Donec a massa nec.
                    </p>
                </div>
                <div className={it.item_image}>
                    <img
                        src='/images/14.jpg'
                        alt={item.name || 'Банные принадлежности'}
                        height={30}
                        width={30}
                        loading='lazy'
                    />
                </div>
                <div className={it.controls}>
                    <div className={it.controls_panel}>
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
                            <h5>{count}</h5>
                        </span>
                        <TransparentButton
                            onClick={onIncrement}
                            disabled={count >= maxCount}
                            aria-label={`Увеличить количество ${item.name}`}
                            className={it.button}>
                            +
                        </TransparentButton>
                    </div>
                </div>
            </article>
        );
    }
);

export default ItemHandler;
