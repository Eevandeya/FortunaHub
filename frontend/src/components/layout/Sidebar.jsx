import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ paths, children }) => {
    const navigate = useNavigate();

    return (
        <aside
            style={{
                backgroundColor: 'white',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'sticky',
                top: 0,
                right: 0,
                height: '100vh',
            }}>
            {children}
            <div
                style={{
                    height: '20vh',
                    width: '100%',
                    zIndex: 10000,
                    backgroundColor: 'white',
                    boxShadow: '0 -10px 15px gray',
                }}>
                <button
                    style={{
                        width: '100px',
                        height: '40px',
                        borderRadius: '30px',
                        backgroundColor: 'black',
                        color: 'white',
                    }}
                    onClick={() =>
                        navigate(paths.previous, { relative: 'path' })
                    }>
                    <p>Вернуться</p>
                </button>
                <button
                    style={{
                        width: '100px',
                        height: '40px',
                        borderRadius: '30px',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        color: 'black',
                    }}
                    onClick={() => navigate(paths.next, { relative: 'path' })}>
                    <p>Далее</p>
                </button>
            </div>
        </aside>
    );
};
