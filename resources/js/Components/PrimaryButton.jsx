export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center squared border border-transparent px-4 py-2 text-sm font-bold leading-relaxed transition duration-150 ease-in-out ${
                    disabled
                        ? "text-gob-black-26 bg-gob-black-12 border-gob-black-26 pointer-events-none"
                        : `bg-gob-primary-darken-1 text-gob-white hover:bg-gob-hover-primary-darken-1 focus:bg-gob-primary-darken-1 focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-gob-focus-base active:bg-gob-active-primary-darken-1`
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
