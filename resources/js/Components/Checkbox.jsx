export default function Checkbox({ className = "", state = "off", ...props }) {
    const isDisabled = state === "disabled" || state === "offdisabled";

    return (
        <div className="relative flex items-center">
            <input
                {...props}
                type="checkbox"
                id={props.id}
                disabled={isDisabled}
                className={`peer h-4 w-4 shrink-0 rounded-sm border-2 border-gob-black-54{
                    stateClasses[state] || ""
                }   disabled:cursor-not-allowed disabled:text-gob-grey-30 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gob-focus-base ${className}`}
            />
            {props.label && (
                <label
                    htmlFor={props.id}
                    className="ml-2 text-base font-medium leading-relaxed text-gob-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {props.label}
                </label>
            )}
        </div>
    );
}
