import { NavLink } from 'react-router-dom';
import styles from './step.module.css';

export const Step = ({ number, to }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `${styles.step_icon} ${isActive && styles.active}`
        }>
        {number}
    </NavLink>
);
