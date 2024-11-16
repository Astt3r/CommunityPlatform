import React from "react";
import { Link } from "@inertiajs/react";

const CustomLink = ({
    href,
    className = "",
    children,
    visited = true,
    ...props
}) => {
    return (
        <Link
            href={href}
            className={`text-base leading-normal font-bold text-gob-link-default underline hover:text-gob-link-hover focus:outline-none focus:ring-2 focus:text-gob-link-active focus:ring-offset-2 focus:outline-gob-focus-base ${
                visited ? "visited:text-gob-link-visited" : ""
            } ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
