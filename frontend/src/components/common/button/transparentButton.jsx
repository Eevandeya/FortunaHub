import { memo } from 'react';

const TransparentButton = memo(({ children, onClick, disabled }) => (
    <button
        type='button'
        className='button is-small is-ghost'
        onClick={onClick}
        disabled={disabled}>
        {children}
    </button>
));

export default TransparentButton;
