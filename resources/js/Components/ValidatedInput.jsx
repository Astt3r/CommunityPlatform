import React from "react";

export default function ValidatedInput({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    required = false,
    inputProps = {},
}) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 ${
                    error ? "border-red-500" : ""
                }`}
                {...inputProps}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
}
