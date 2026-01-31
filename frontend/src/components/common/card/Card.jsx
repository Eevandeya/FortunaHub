const Card = ({
    //eslint-disable-next-line
    Component = 'article',
    children,
    tabIndex = '-1',
    aria,
    className,
    ...other
}) => {
    return (
        <Component
            tabIndex={tabIndex}
            className={className}
            {...aria}
            {...other}>
            {children}
        </Component>
    );
};

export default Card;
