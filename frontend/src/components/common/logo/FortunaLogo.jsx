import { HashNavigationItem } from '@components.common/navigation/HashNavigationItem.jsx';
import { ROUTES } from '@root.consts/navigation.js';

const FortunaLogo = ({ logoHeader, logoImage, hasHeader }) => {
    return (
        <>
            <HashNavigationItem to={ROUTES.HOME_HASH}>
                <img src={logoImage} alt='Logo' width='64' height='64' />
            </HashNavigationItem>
            {hasHeader && <h1>{logoHeader}</h1>}
        </>
    );
};

export default FortunaLogo;
