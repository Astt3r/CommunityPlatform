import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        error = false,
        disabled = false,
        isProcessing = false,
        value = "",
        placeholder = "", // Add placeholder prop here
        ...props
    },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const computedClassName = `
        squared shadow-sm border-1 border-gob-black-87 
        ${disabled ? "border-gob-grey-30 cursor-not-allowed" : ""}
        ${
            isProcessing
                ? "border-gob-primary-base border-1 ring-1 ring-gob-primary-base cursor-wait"
                : ""
        }
        ${value ? "bg-gob-filled" : ""}
        ${
            error
                ? "border-gob-accent-darken-3 ring-red-500"
                : "focus:ring-gob-focus-base border-gob-black"
        }
        hover:ring-1 hover:ring-gob-black-87 focus:ring-3 focus:border-1
        ${className}
    `;

    return (
        <input
            {...props}
            type={type}
            className={computedClassName.trim()}
            ref={localRef}
            disabled={disabled}
            value={value}
            placeholder={placeholder} // Pass placeholder here
        />
    );
});
