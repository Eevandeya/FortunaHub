import { NavLink } from 'react-router-dom';

export const Step = ({ number, to }) => (
    <NavLink
        to={to}
        style={({ isActive }) =>
            isActive
                ? {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: 'solid 2px black',
                      backgroundColor: 'white',
                      color: 'black',
                  }
                : {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: 'black',
                      color: 'white',
                  }
        }>
        {number}
    </NavLink>
);
