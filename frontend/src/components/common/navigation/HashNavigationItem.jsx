export const HashNavigationItem = ({ to, children, ...props }) => (
    <span>
        <a href={to} {...props}>
            {children}
        </a>
    </span>
);
