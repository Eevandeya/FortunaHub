import { NavLink } from 'react-router-dom';

export const NavigationItem = ({ to, children, end = false, ...props }) => (
    <span>
        <NavLink
            style={({ isActive }) =>
                isActive ? { color: 'white' } : { color: '#c6cec9' }
            }
            to={to}
            end={end}
            {...props}>
            {children}
        </NavLink>
    </span>
);
