import { NavLink } from 'react-router-dom';
import styles from './linkers.module.css';

export const NavigationLink = ({ to, children, end = false, ...props }) => (
    <span>
        <NavLink
            className={({ isActive }) =>
                isActive ? styles.active_link : styles.link
            }
            to={to}
            end={end}
            {...props}>
            <p>{children}</p>
        </NavLink>
    </span>
);
