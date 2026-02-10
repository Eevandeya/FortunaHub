export const HashNavigationLink = ({ to, children, ...props }) => (
    <span>
        <a onClick={props.onClick} href={to} {...props}>
            <p>{children}</p>
        </a>
    </span>
);
