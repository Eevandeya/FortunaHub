import { Link } from 'react-router-dom';

export const SuccessStatusPage = () => (
    <div
        role='alert'
        style={{ padding: '20px', background: '#b8f8a9', flex: 1 }}>
        <h1 style={{ color: 'gray' }}>Бронь создана успешно</h1>
        <span
            style={{
                width: '70vw',
                height: '30vh',
                borderRadius: '10px',
                outline: 'solid 3px rgb(f f f / 0.3)',
                backgroundColor: '#54d838',
            }}>
            <h4>
                Вернуться на{' '}
                {
                    <Link to='/' style={{ color: 'white' }}>
                        главную страницу
                    </Link>
                }
            </h4>
        </span>
    </div>
);
