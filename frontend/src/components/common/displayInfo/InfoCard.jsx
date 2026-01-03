import './cards.css';

export const InfoCard = ({ title, children }) => {
    return (
        <article className='booking-card-container'>
            <div className='booking-card-meta'>
                {title && (
                    <div className='card-title'>
                        <h3>{title}</h3>
                    </div>
                )}
                <div className='card-content'>{children}</div>
            </div>
        </article>
    );
};

export default InfoCard;
