type PanelProps = {
    className?: string;
    children: React.ReactNode;
};

export default function Panel(props: PanelProps) {
    const { children, className = "" } = props;

    return <div className={`panel ${className}`}>{children}</div>;
}
