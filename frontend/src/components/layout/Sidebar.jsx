import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ paths, children }) => {
    const navigate = useNavigate();
    return (
        <aside className='sidebar sidebar-right'>
            <div className='sidebar-content'>{children}</div>
            <footer className='sidebar-footer'>
                <button
                    className='booking-prev'
                    onClick={() =>
                        navigate(paths.previous, { relative: 'path' })
                    }>
                    <p>Вернуться</p>
                </button>
                <button
                    className='booking-next'
                    onClick={() => navigate(paths.next, { relative: 'path' })}>
                    <p>Далее</p>
                </button>
            </footer>
        </aside>
    );
};
