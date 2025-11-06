export const HashNavigationItem = ({ to, children, ...props }) => (
    <span>
        <span>
            <a href={to} {...props}>
                {children}
            </a>
        </span>
    </span>
);
