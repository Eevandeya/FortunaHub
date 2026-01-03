import { memo } from 'react';
import './number-handler.css';
import TransparentButton from '../button/transparentButton.jsx';

export const VisitorsCountDisplay = memo(
    ({ count, decrease, increase, maxValue }) => {
        return (
            <div className='number_handler'>
                <div className='controls'>
                    <div className='number_handler_panel'>
                        <TransparentButton
                            onClick={decrease}
                            disabled={count <= 0}
                            aria-label={`Уменьшить количество ${count}`}
                            className='button'>
                            &#8212;
                        </TransparentButton>
                        <span
                            className='counter'
                            title={`Текущее количество: ${count}`}>
                            <h5>{count}</h5>
                        </span>
                        <TransparentButton
                            onClick={increase}
                            disabled={count >= maxValue}
                            aria-label={`Увеличить количество ${count}`}
                            className='button'>
                            &#43;
                        </TransparentButton>
                    </div>
                </div>
            </div>
        );
    }
);
