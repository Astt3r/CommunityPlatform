import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // Soporte para temas oscuro/claro.
    content: [
        // Archivos que Tailwind debe procesar para generar estilos.
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                // Configuración de fuentes personalizadas.
                sans: ["Roboto Sans", ...defaultTheme.fontFamily.sans], // Fuente principal para texto general.
                slab: ["Roboto Slab", ...defaultTheme.fontFamily.serif], // Fuente secundaria para títulos o énfasis.
            },
            colors: {
                gob: {
                    // **Primary Palette:** Principal para elementos importantes como botones principales y enlaces destacados.
                    "primary-darken-4": "#00135A", // Usado para estados presionados muy oscuros.
                    "primary-darken-3": "#002673", // Usado para elementos secundarios oscuros.
                    "primary-darken-2": "#003B8D", // Usado para hover en botones principales.
                    "primary-darken-1": "#0051A8", // Usado para bordes o detalles oscuros.
                    "primary-base": "#0F69C4", // Color principal para botones y enlaces.
                    "primary-lighten-1": "#4282E0", // Usado para fondos o variantes más suaves.
                    "primary-lighten-2": "#649CFD", // Usado para gráficos o componentes secundarios.
                    "primary-lighten-3": "#83B6FF", // Usado para fondos claros secundarios.
                    "primary-lighten-4": "#A1D2FF", // Usado para hover de fondos claros.
                    "primary-lighten-5": "#BFEEFF", // Usado para elementos de interfaz como hover de tarjetas.

                    // **Accent Palette:** Resalta elementos como botones secundarios, iconos destacados o etiquetas llamativas.
                    "accent-base": "#FF4731", // Color principal para acentos importantes.
                    "accent-darken-1": "#F63E32", // Usado para hover en botones secundarios.
                    "accent-darken-2": "#E4332C", // Usado para estados presionados.
                    "accent-darken-3": "#D72C25", // Usado en gráficos oscuros o etiquetas críticas.
                    "accent-darken-4": "#C82018", // Usado en alertas muy destacadas.
                    "accent-lighten-1": "#FF584F", // Usado para hover en elementos destacados.
                    "accent-lighten-2": "#F37874", // Usado para fondos de acento secundarios.
                    "accent-lighten-3": "#FA9E9B", // Usado en gráficos o fondos menos llamativos.
                    "accent-lighten-4": "#FFCFD3", // Usado para fondos muy suaves de acento.
                    "accent-lighten-5": "#FFECEF", // Usado para fondos claros en tarjetas o modales.

                    // **Focus Palette:** Usado para elementos con foco.
                    "focus-text": "#373737", // Color primario para texto con foco.
                    "focus-base": "#FFBE5C", // Color principal para elementos con foco.

                    // **Neutral Palette:** Usado para fondos, textos y bordes neutros.
                    white: "#FFFFFF", // Blanco puro para fondos principales.
                    "white-26": "#FFFFFF42", // Blanco semitransparente para overlays.
                    "white-78": "#FFFFFFC7", // Blanco con más opacidad para texto.
                    "grey-5": "#F2F2F2", // Usado para fondos claros secundarios.
                    "grey-10": "#E6E6E6", // Usado para bordes suaves.
                    "grey-20": "#CCCCCC", // Usado para texto deshabilitado.
                    "grey-30": "#B3B3B3", // Usado para iconos secundarios.
                    "grey-40": "#999999", // Usado para texto de baja prioridad.
                    "grey-50": "#808080", // Usado para texto neutro.
                    "grey-60": "#666666", // Usado para bordes y líneas.
                    "grey-70": "#4D4D4D", // Usado para texto oscuro secundario.
                    "grey-80": "#333333", // Usado para encabezados.
                    "grey-90": "#1A1A1A", // Usado para gráficos oscuros.
                    black: "#111111", // Negro puro para texto principal.
                    "black-12": "#0000001F", // Negro semitransparente para textos secundarios.
                    "black-26": "#00000042", // Negro semitransparente para sombras.
                    "black-54": "#0000008A", // Negro para textos destacados.
                    "black-87": "#000000DE", // Negro para textos primarios.

                    // **Buttons Palette:** Usado para botones y enlaces.
                    "hover-primary-darken-1": "#003c7c", // Usado para hover en botones principales.
                    "active-primary-darken-1": "#00254d", // Usado para estados presionados.

                    // **Links Palette:** Usado para enlaces y botones.
                    "link-default": "#1D70B8", // Usado para enlaces y botones.
                    "link-hover": "#003078", // Usado para hover en enlaces y botones.
                    "link-visited": "#4C2C92", // Usado para enlaces y botones visitados.
                    "link-active": "#373737", // Usado para estados presionados en enlaces y botones.
                },
            },
            fontSize: {
                // Tamaños de fuente según jerarquía tipográfica.
                "3xl": "3rem", // Heading XL (Títulos grandes).
                "2xl": "2.25rem", // Heading L (Títulos principales).
                xl: "2rem", // Heading M (Subtítulos o títulos secundarios).
                lg: "1.6rem", // Heading S (Texto resaltado o mayor énfasis).
            },
            lineHeight: {
                // Altura de línea estándar para mantener legibilidad.
                normal: "1.5",
            },
            fontWeight: {
                // Pesos de fuente utilizados en todo el diseño.
                medium: "500", // Para subtítulos o texto de peso medio.
                bold: "700", // Para títulos o texto en énfasis fuerte.
            },
            spacing: {
                // Espaciado utilizado para paddings, margins, etc.
                xxs: "0.25rem", // 4px - Espaciado extra pequeño.
                xs: "0.5rem", // 8px - Espaciado pequeño.
                s: "1rem", // 16px - Espaciado base.
                m: "1.5rem", // 24px - Espaciado mediano.
                l: "2.25rem", // 36px - Espaciado grande.
                xl: "3rem", // 48px - Espaciado extra grande.
                xxl: "3.875rem", // 62px - Espaciado muy grande.
            },
            borderRadius: {
                // Bordes redondeados para tarjetas, botones y otros elementos.
                none: "0rem", // Sin redondeo.
                sm: "0.25rem", // 4px - Bordes ligeramente redondeados.
                md: "0.5rem", // 8px - Bordes moderadamente redondeados.
                lg: "1rem", // 16px - Bordes redondeados estándar.
                xl: "1.5rem", // 24px - Bordes extra redondeados.
            },
            width: {
                // Anchuras predefinidas para elementos.
                xxs: "0.25rem", // 4px
                xs: "0.5rem", // 8px
                s: "1rem", // 16px
                m: "1.5rem", // 24px
                l: "2.25rem", // 36px
                xl: "3rem", // 48px
                xxl: "4rem", // 64px
            },
            height: {
                // Alturas predefinidas para elementos.
                xxs: "0.25rem", // 4px
                xs: "0.5rem", // 8px
                s: "1rem", // 16px
                m: "1.5rem", // 24px
                l: "2.25rem", // 36px
                xl: "3rem", // 48px
                xxl: "4rem", // 64px
            },
            opacity: {
                26: "0.26",
            },
            ringWidth: {
                3: "3px", // Adds a `ring-3` utility class for a 3px ring width
            },
        },
    },

    plugins: [forms], // Plugin para estilizar formularios.
};
