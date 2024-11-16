export default function InputLabel({
    value,
    className = "",
    size = "sm", // Nuevo: Control del tamaño de la etiqueta
    color = "gob-primary", // Nuevo: Control del color del texto
    weight = "medium", // Nuevo: Control del peso de la fuente
    children,
    ...props
}) {
    const sizeClasses = {
        sm: "text-sm", // Tamaño pequeño
        md: "text-base", // Tamaño mediano
        lg: "text-lg", // Tamaño grande
    };

    const weightClasses = {
        light: "font-light",
        medium: "font-medium",
        bold: "font-bold",
    };

    return (
        <label
            {...props}
            className={`block font-sans leading-normal ${sizeClasses[size]} ${weightClasses[weight]} text-${color} ${className}`}
        >
            {value || children}
        </label>
    );
}
