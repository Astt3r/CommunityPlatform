# Junta Transparente

## Descripción

Este proyecto es una aplicación web desarrollada en Laravel para la gestión de juntas de vecinos. El sistema está diseñado para facilitar la administración, la transparencia y la participación ciudadana en las juntas de vecinos, ofreciendo herramientas para gestionar proyectos, reuniones, ingresos, gastos y más.

## Características

-   **Gestión de Vecinos**: Registro, consulta y administración de los miembros de las juntas de vecinos.
-   **Gestión de Proyectos**: Creación, visualización y seguimiento de proyectos comunitarios.
-   **Gestión de Reuniones**: Calendario interactivo y generacion de actas.
-   **Gestión Financiera**: Registro de ingresos, gastos y otros.
-   **Transparencia**: Acceso a documentos y reportes por parte de los vecinos.
-   **Autenticación y Roles**: Control de acceso basado en roles.

## Requisitos del Sistema

-   **PHP** >= 8.2.12
-   **Composer** >= 2.8.3
-   **MySQL** >= 8.4
-   **Node.js(LTS)** >= 22.12.0
-   **Laravel** >= 11.x

## Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/fit-dran/juntatransparente
    ```
2. Accede al directorio del proyecto:
    ```bash
    cd tu_repositorio
    ```
3. Instala las dependencias de PHP:
    ```bash
    composer install
    ```
4. Instala las dependencias de Node.js:
    ```bash
    npm install
    ```
5. Crea el archivo `.env` basado en `.env.example` y configura las credenciales de tu base de datos.
    ```bash
     cp .env.example .env
    ```
6. Genera la clave de la aplicación:
    ```bash
    php artisan key:generate
    ```
7. Ejecuta las migraciones de la base de datos si deseas tener una base de datos sin registros de prueba elimina --seed:
    ```bash
    php artisan migrate --seed
    ```
8. Inicia el servidor de desarrollo:
    ```bash
    php artisan serve
    npm run dev
    ```

## Documentación

-   **Arquitectura**: Laravel sigue una arquitectura MVC (Modelo-Vista-Controlador) para un desarrollo organizado y escalable.
-   **Dependencias**:
    -   Frontend: [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Inertia](https://inertiajs.com/), [React](https://reactjs.org/)
    -   Backend: [Laravel](https://laravel.com/)
-   **Base de Datos**: Relacional (MySQL).

## Contribución

Este proyecto no es un proyecto de código abierto, por lo que no aceptamos contribuciones. Si deseas contribuir a este proyecto, por favor contacta al equipo de desarrollo en [adolfo.luna@virginiogomez.cl](mailto:adolfo.luna@virginiogomez.cl).

## Seguridad

Si encuentras alguna vulnerabilidad de seguridad, por favor informa al equipo de desarrollo directamente.
