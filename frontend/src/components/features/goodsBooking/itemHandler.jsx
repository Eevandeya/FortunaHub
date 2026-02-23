import TransparentButton from '@components.common/button/transparentButton.jsx';
import { memo } from 'react';
import style from './products.module.css';
import Card from '@components.common/card/Card.jsx';
import { NumberDisplay } from '../../common/displayInfo/numberDisplay/NumberDisplay.jsx';

const ItemHandler = memo(
    ({ item, count = 0, maxCount, onIncrement, onDecrement }) => {
        return (
            <Card
                Component='article'
                className={style.item_handler}
                tabIndex='0'>
                <div className={style.content}>
                    <h5 className={style.content_title}>{item.name}</h5>
                    <p className={style.content_description}>{item?.desc}</p>
                </div>
                <div className={style.item_image}>
                    <img
                        src={`${import.meta.env.VITE_BACKEND_API_URL}${item.imageUrl}`}
                        alt={item.name || 'Банные принадлежности'}
                        height={30}
                        width={30}
                        loading='lazy'
                    />
                </div>
                <div className={style.controls}>
                    <div className={style.controls_panel}>
                        <NumberDisplay
                            count={count}
                            maxValue={maxCount}
                            decrease={onDecrement}
                            increase={onIncrement}
                            fontColor='black'
                        />
                    </div>
                </div>
            </Card>
        );
    }
);

export default ItemHandler;
