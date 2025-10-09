import { memo } from 'react';

export const VisitorsCountDisplay = memo(({ data }) => {
    return (
        <p
            style={{
                backgroundColor: 'gray',
                minWidth: '50px',
                borderRadius: '30px',
                color: 'white',
                display: 'grid',
                justifyContent: 'center',
            }}>
            {data}
        </p>
    );
});
