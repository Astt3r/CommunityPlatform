export default function DangerButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center squared px-4 py-2 text-sm font-bold leading-relaxed transition duration-150 ease-in-out ${
                    disabled
                        ? "text-gob-black-26 bg-gob-black-12 border-gob-black-26 pointer-events-none"
                        : `bg-gob-accent-base text-white hover:bg-gob-accent-darken-1 focus:bg-gob-accent-darken-2 focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-gob-accent-lighten-2 active:bg-gob-accent-darken-3 border-transparent`
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
