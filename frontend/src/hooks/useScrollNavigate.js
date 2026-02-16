import { useLocation, useNavigate } from 'react-router-dom';

const useScrollNavigate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (path, targetId, options = {}) => {
        navigate(path, {
            replace: location.pathname === path,
            state: { scrollTo: { id: targetId, options } },
        });
    };
};

export default useScrollNavigate;
