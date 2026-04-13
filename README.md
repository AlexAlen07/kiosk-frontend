# Kiosk - Demo

## Overview
Toque primero, orientado a vertical (retrato). Frontend demo para acceder a conocimiento en áreas comunes: políticas, videos, cursos, cuestionarios y certificados.

## Resumen
Kiosk es una SPA (Vite + React + TypeScript) optimizada para pantallas verticales tipo kiosk. Funciona en **modo demo** por defecto (datos mock en `src/lib/mocks.ts`) y puede integrarse con un backend que llame a OpenAI para el ChatBot.

---

## Tecnologías
- Vite  
- React  
- TypeScript  
- Tailwind CSS  
- shadcn-ui

---

## Inicio rápido

```bash
## Clona el repositorio
git clone <TU_GIT_URL>

# Entra al proyecto
cd kiosk-frontend

# Instala dependencias
npm install

# Copia el ejemplo de variables de entorno (solo la primera vez)
cp .env.example .env.local

# Inicia el servidor de desarrollo
npm run dev

# Abre el navegador en http://localhost:5173/
```

## Características
### Características Implementadas
- **Pantalla de Inicio**: Navegación basada en cuadrícula con grandes mosaicos táctiles
- **Demostración de Lector de Tarjetas**: Simulación de teclado HID para el inicio de sesión de empleados
- **ChatBot (NebuBot IA)**: Asistente de IA para información de seguridad (demostración + compatible con OpenAI)
- **Políticas y Procedimientos**: Visor de documentos con categorías
- **Videotutoriales**: Reproductor de video con miniaturas y categorías
- **Cuestionarios**: Cuestionario interactivo con puntuación y resultados
- **Certificados**: Generación y descarga (el modo demo crea un archivo de texto)
- **Centro de Ayuda**: Preguntas frecuentes e información de contacto

### Modo Demo
La aplicación se ejecuta en modo demo por defecto, utilizando datos simulados de `src/lib/mocks.ts`. Si `VITE_API_BASE` no está configurado, todas las llamadas a la API recurren a los datos simulados.

---

## Demostración del lector de tarjetas

### Cómo funciona
El componente CardReaderDemo captura la entrada del teclado de los lectores de tarjetas HID (Keyboard Wedge).

- La **entrada oculta** permanece enfocada para capturar los datos de la tarjeta.
- Validación de tokens** con `mockEmployees` en mocks.ts.
- Persistencia de sesión** en `localStorage` (`nebubot_employee`).


### Demo Tokens
| Token | Employee |
|-------|----------|
| CARD001 | María García |
| CARD002 | Carlos Rodríguez |
| CARD003 | Ana López |
| DEMO123 | Juan Martínez |

---

## ChatBot (OpenAI-Ready)

### Architecture
El chatbot utiliza un patrón de proveedor para facilitar el cambio de backend:

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (ChatBotPage.tsx)                              │
│                                                          │
│  ┌──────────────────┐     ┌────────────────────────┐    │
│  │  chatProvider    │────▶│  DemoProvider          │    │
│  │  (factory)       │     │  (local rules)         │    │
│  └──────────────────┘     └────────────────────────┘    │
│           │                                              │
│           │ VITE_CHAT_PROVIDER=openai                   │
│           ▼                                              │
│  ┌────────────────────────┐                             │
│  │  OpenAIProvider        │──────▶ /api/chat (backend)  │
│  │  (calls backend API)   │                             │
│  └────────────────────────┘                             │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│  Backend (Edge Function)                                 │
│  - Reads OPENAI_API_KEY from env                        │
│  - Calls OpenAI API                                     │
│  - Returns { reply: string }                            │
└─────────────────────────────────────────────────────────┘
```

### Configuración

#### Modo Demo (predeterminado)
No se necesita configuración. Utiliza respuestas predefinidas.

```bash
npm run dev
```

#### Modo OpenAI
1. Establece las variables de entorno:
```env
VITE_CHAT_PROVIDER=openai
VITE_CHAT_API_ENDPOINT=/api/chat
```

2. Configura el backend con `OPENAI_API_KEY` (ver sección Backend)

---

## Estructura del proyecto

```
src/
├── components/
│   ├── CardReaderDemo.tsx    # HID card reader simulation
│   ├── KioskHeader.tsx       # Logo and card reader indicator
│   ├── KioskTile.tsx         # Reusable tile component
│   ├── KioskModal.tsx        # Modal wrapper for pages
│   └── LoadingSpinner.tsx    # Loading and empty states
├── pages/
│   ├── KioskHome.tsx         # Main home page with grid
│   ├── ChatBotPage.tsx       # AI chatbot interface
│   ├── PoliciesPage.tsx      # Document viewer
│   ├── VideosPage.tsx        # Video player
│   ├── CoursesPage.tsx       # Course progress
│   ├── QuizPage.tsx          # Quiz functionality
│   ├── CertificatesPage.tsx  # Certificate management
│   └── HelpPage.tsx          # Help and FAQ
├── lib/
│   ├── api.ts                # API helpers with fallback
│   ├── chatProvider.ts       # Chat provider system
│   └── mocks.ts              # Mock data for demo
└── types/
    └── kiosk.ts              # TypeScript interfaces
```

---

## Notas de seguridad

⚠️ **IMPORTANTE**: ¡Nunca expongas las claves de API en el código frontend!

- Las variables `VITE_*` se empaquetan en el código cliente (PUBLIC)
- `OPENAI_API_KEY` debe estar solo en el entorno del backend (PRIVATE)
- El frontend llama a `/api/chat`, el backend llama a OpenAI

---

## Notas de diseño

- **Orientation**: Optimized for 1024×1366 portrait displays
- **Touch targets**: Minimum 48px for accessibility
- **Theme**: Dark industrial with high contrast colors
- **Animations**: Subtle framer-motion micro-interactions
