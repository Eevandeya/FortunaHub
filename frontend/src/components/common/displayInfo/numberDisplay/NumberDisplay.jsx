import { memo } from 'react';
import './number-handler.css';
import TransparentButton from '@components.common/button/TransparentButton.jsx';

export const NumberDisplay = memo(
    ({ count, decrease, increase, maxValue, fontColor = 'white' }) => {
        return (
            <div className='number_handler'>
                <div className='controls'>
                    <div className='number_handler_panel'>
                        <TransparentButton
                            onClick={decrease}
                            aria-disabled={count <= 0}
                            aria-label={`Уменьшить количество ${count}`}
                            className='button'
                            value='&#8212;'
                            style={{ color: fontColor }}
                        />
                        <span
                            className='counter'
                            title={`Текущее количество: ${count}`}
                            style={{ color: fontColor }}>
                            <h5>{count}</h5>
                        </span>
                        <TransparentButton
                            onClick={increase}
                            aria-disabled={count >= maxValue}
                            aria-label={`Увеличить количество ${count}`}
                            className='button'
                            value='&#43;'
                            style={{ color: fontColor }}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
