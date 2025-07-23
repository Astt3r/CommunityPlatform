# 🏘️ Community Platform - Junta Transparente

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://reactjs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-1.x-9553E9?style=flat)](https://inertiajs.com)

## 📖 Descripción

**Community Platform** es una aplicación web moderna desarrollada con Laravel y React para la gestión integral de juntas de vecinos. El sistema facilita la administración, promueve la transparencia y fomenta la participación ciudadana mediante herramientas digitales intuitivas.

### 🎯 Propósito
Digitalizar y modernizar la gestión de comunidades vecinales, proporcionando transparencia financiera, comunicación efectiva y administración eficiente de recursos comunitarios.

## ✨ Características Principales

### 👥 **Gestión de Usuarios Multi-Rol**
- **Administrador**: Control total del sistema y múltiples juntas
- **Jefe de Junta**: Gestión completa de su junta vecinal
- **Miembro de Directorio**: Acceso a funciones de gestión limitadas
- **Vecino**: Consulta de información y participación en votaciones

### 📊 **Dashboard Interactivo**
- Métricas en tiempo real de finanzas y participación
- Gráficos de ingresos, gastos y proyectos
- Indicadores de actividad de la comunidad

### 💰 **Gestión Financiera Transparente**
- Registro detallado de ingresos y gastos
- Categorización automática de transacciones
- Reportes financieros exportables (PDF/Excel)
- Historial de cuotas y pagos de vecinos

### 🏗️ **Gestión de Proyectos Comunitarios**
- Seguimiento de proyectos de mejoramiento
- Estados de avance en tiempo real
- Documentación y archivos adjuntos
- Presupuestos y control de gastos por proyecto

### 📅 **Sistema de Reuniones**
- Calendario interactivo de reuniones
- Generación automática de actas
- Control de asistencia digital
- Notificaciones automáticas

### 📋 **Gestión de Comités**
- Organización de comités especializados
- Asignación de responsabilidades
- Seguimiento de tareas y objetivos

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: Laravel 11.x
- **Base de Datos**: MySQL 8.4+
- **Autenticación**: Laravel Sanctum
- **API**: RESTful con Inertia.js

### Frontend
- **Framework**: React 18.x
- **Build Tool**: Vite
- **Styling**: TailwindCSS 3.x
- **SPA Framework**: Inertia.js
- **Iconos**: Heroicons

### Herramientas de Desarrollo
- **Testing**: PHPUnit, Pest
- **Code Quality**: Laravel Pint, PHPStan
- **Package Manager**: Composer, NPM

## 🚀 Demo en Vivo

🔗 **[Ver Demo](https://tu-demo-url.com)** *(configurar GitHub Pages)*

### 👤 Credenciales de Prueba

| Rol | Email | Contraseña | Permisos |
|-----|-------|------------|----------|
| **Administrador** | `admin@example.com` | `password` | Acceso completo al sistema |
| **Jefe de Junta** | `jefe@example.com` | `password` | Gestión de junta vecinal |
| **Miembro Directorio** | `miembro@example.com` | `password` | Funciones limitadas de gestión |
| **Vecino** | `vecino@example.com` | `password` | Consulta y participación |

## 💻 Requisitos del Sistema

- **PHP** >= 8.2.12
- **Composer** >= 2.8.3
- **MySQL** >= 8.4
- **Node.js (LTS)** >= 22.12.0
- **Git** >= 2.30

## ⚡ Instalación y Configuración

### 🔧 Configuración Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Astt3r/CommunityPlatform.git
   cd CommunityPlatform
   ```

2. **Instalar dependencias**
   ```bash
   # Dependencias PHP
   composer install
   
   # Dependencias JavaScript
   npm install
   ```

3. **Configurar entorno**
   ```bash
   # Copiar archivo de configuración
   cp .env.example .env
   
   # Generar clave de aplicación
   php artisan key:generate
   ```

4. **Configurar base de datos**
   ```env
   # Editar .env con tus credenciales
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=community_platform
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```

5. **Migrar y poblar base de datos**
   ```bash
   # Crear tablas y datos de prueba
   php artisan migrate --seed
   
   # Solo migrar (sin datos de prueba)
   php artisan migrate
   ```

6. **Iniciar servidores de desarrollo**
   ```bash
   # Terminal 1: Servidor Laravel
   php artisan serve
   
   # Terminal 2: Build frontend
   npm run dev
   ```

7. **¡Listo! 🎉**
   - Aplicación: `http://localhost:8000`
   - Login con las credenciales de prueba mostradas arriba

### 🐳 Instalación con Docker (Opcional)

```bash
# Usar Laravel Sail
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
```

## 📱 Capturas de Pantalla

### Dashboard Principal
![Dashboard](docs/screenshots/dashboard.png)

### Gestión Financiera
![Finanzas](docs/screenshots/finances.png)

### Calendario de Reuniones
![Reuniones](docs/screenshots/meetings.png)

## 🏗️ Arquitectura del Proyecto

```
app/
├── Http/Controllers/     # Controladores
├── Models/              # Modelos Eloquent
├── Exports/             # Exportadores Excel/PDF
└── Providers/           # Service Providers

resources/
├── js/                  # Componentes React
├── views/               # Plantillas Inertia
└── css/                 # Estilos

database/
├── migrations/          # Migraciones
├── seeders/            # Datos de prueba
└── factories/          # Factories para testing
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
php artisan test

# Tests con cobertura
php artisan test --coverage

# Tests específicos
php artisan test --filter=UserTest
```

## 📦 Deployment

### Producción
```bash
# Optimizar para producción
composer install --optimize-autoloader --no-dev
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Vercel (Recomendado)
El proyecto incluye configuración para Vercel en `vercel.json`

## 👨‍💻 Desarrollo

### 🛠️ Comandos Útiles

```bash
# Linter de código
./vendor/bin/pint

# Análisis estático
./vendor/bin/phpstan analyse

# Generar migraciones
php artisan make:migration create_table_name

# Generar modelos
php artisan make:model ModelName -mfc
```

### 📋 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a la organización. No está disponible bajo licencia de código abierto.

## 📞 Contacto

- **Desarrollador**: [Astt3r](https://github.com/Astt3r)
- **Proyecto Original**: [fit-dran/juntatransparente](https://github.com/fit-dran/juntatransparente)
- **Issues**: [GitHub Issues](https://github.com/Astt3r/CommunityPlatform/issues)

## 🙏 Reconocimientos

- Proyecto basado en [Junta Transparente](https://github.com/fit-dran/juntatransparente)
- Comunidad Laravel y React
- Colaboradores del proyecto original

---

⭐ **¡Si te gusta el proyecto, dale una estrella!** ⭐
