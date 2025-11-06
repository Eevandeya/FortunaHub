import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
    <div
        role='alert'
        style={{ padding: '20px', background: '#2b3d5b', flex: 1 }}>
        <h1 style={{ color: 'gray' }}>Ошибка 404</h1>
        <span
            style={{
                width: '70vw',
                height: '30vh',
                borderRadius: '10px',
                outline: 'solid 3px black',
                backgroundColor: '#364154',
            }}>
            <h4>
                Такой страницы не существует. Пожалуйста{' '}
                {
                    <Link to='/' style={{ color: 'white' }}>
                        перейдите
                    </Link>
                }{' '}
                на главную страницу
            </h4>
        </span>
    </div>
);
