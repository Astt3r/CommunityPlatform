export default function TertiaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center squared border px-4 py-2 text-sm font-bold leading-relaxed transition duration-150 ease-in-out ${
                    disabled
                        ? "text-gob-black-26 bg-gob-white border-transparent pointer-events-none"
                        : `bg-gob-white text-gob-primary-darken-1 border-transparent hover:bg-go-white hover:text-gob-hover hover:border-transparent focus:bg-gob-white focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-gob-focus-base active:bg-gob-white active:text-gob-active active:border-transparent`
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
