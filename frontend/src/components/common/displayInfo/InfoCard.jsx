export const InfoCard = ({ title, children }) => {
    return (
        <div
            style={{
                backgroundColor: '#F5F5F5',
                width: '80%',

                marginBlock: '40px',
                borderRadius: '30px',
                paddingInline: '10px',
                paddingBlock: '30px',
            }}>
            {title && (
                <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
};

export default InfoCard;
