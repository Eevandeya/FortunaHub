import { useNavigate } from 'react-router-dom';
import GoToButton from '../common/button/GoToButton.jsx';

export const Sidebar = ({ paths, children }) => {
    const navigate = useNavigate();
    return (
        <aside className='sidebar sidebar-right'>
            <div className='sidebar-content'>{children}</div>
            <footer className='sidebar-footer'>
                <GoToButton
                    onClick={() =>
                        navigate(paths.previous, { relative: 'path' })
                    }
                    value='Вернуться'
                    theme='black'
                />
                <GoToButton
                    onClick={() => navigate(paths.next, { relative: 'path' })}
                    value='Далее'
                    isBordering
                />
            </footer>
        </aside>
    );
};
