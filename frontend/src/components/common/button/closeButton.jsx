import { memo } from 'react';

const CloseButton = memo(({ onClick }) => (
    <button
        style={{
            height: '10px',
            width: '10px',
            backgroundColor: 'black',
            clipPath:
                'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',
        }}
        onClick={onClick}
    />
));

export default CloseButton;
