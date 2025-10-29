import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ paths, children }) => {
    const navigate = useNavigate();

    return (
        <aside className='sidebar sidebar-right'>
            {children}
            <footer className='sidebar-footer'>
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
            </footer>
        </aside>
    );
};
