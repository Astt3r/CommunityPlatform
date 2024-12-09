import React from "react";

export default function ApplicationLogo(props) {
    return (
        <img
            src="/logo.png"
            alt="Junta Transparente Logo"
            {...props}
            style={{ maxWidth: "100%", height: "auto" }}
        />
    );
}
