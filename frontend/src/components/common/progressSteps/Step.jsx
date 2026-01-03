import { NavLink } from 'react-router-dom';

export const Step = ({ number, to }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            isActive ? 'step-icon active' : 'step-icon'
        }>
        {number}
    </NavLink>
);
