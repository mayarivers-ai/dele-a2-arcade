# Dele A2 Arcade - Contexto del Proyecto

## Descripción General
Dele A2 Arcade es una aplicación web interactiva diseñada para ayudar a estudiantes a mejorar su vocabulario en inglés (nivel A2) a través de un juego arcade. La app combina gamificación con IA para crear ejercicios personalizados y seguimiento del progreso.

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **State Management**: Zustand 5
- **i18n**: i18next + react-i18next
- **Backend/Database**: Supabase
- **AI**: Anthropic Claude (via @ai-sdk/anthropic v3)
- **API Routes**: Node.js (Vercel)
- **Deployment**: Vercel
- **Validation**: Zod

## Estructura del Proyecto
```
dele-a2-arcade/
├── api/
│   ├── check-tester.ts       // Valida si usuario es tester
│   └── generate-exercise.ts  // Genera ejercicios con IA
├── src/
│   ├── components/           // Componentes reutilizables
│   ├── pages/               // Landing y Login
│   ├── modules/             // Funcionalidades principales
│   │   ├── vocabulary/
│   │   ├── arcade/
│   │   └── career/
│   ├── stores/              // Zustand stores
│   │   ├── userStore.ts
│   │   └── settingsStore.ts
│   ├── hooks/               // React hooks personalizados
│   ├── lib/                 // Utilidades (Supabase client, etc)
│   ├── types/               // TypeScript types
│   ├── data/                // Datos estáticos
│   ├── i18n/                // Configuración de idiomas
│   └── assets/              // Imágenes y media
├── public/                  // Assets estáticos
├── dist/                    // Build output (Vite)
├── vite.config.ts
├── tsconfig.app.json
└── package.json
```

## Características Principales

### 1. **Autenticación**
- Sistema de login con Supabase
- Callback de autenticación en `/auth/callback`
- Verificación de testers para acceso a features beta

### 2. **Módulo de Vocabulario**
- Gestión de vocabulario en inglés (nivel A2)
- Integración con Claude AI para generar ejercicios
- Guardado de progreso en Supabase

### 3. **Juego Arcade**
- Interfaz gamificada para practicar
- Sistema de puntuación y progreso
- Ejercicios generados dinámicamente por IA

### 4. **Career Hub**
- Sistema de fases para estructurar el aprendizaje
- PhaseRunner para ejecutar lecciones
- Seguimiento de progreso académico

### 5. **Internacionalización**
- Soporta múltiples idiomas
- Detección automática del idioma del navegador
- Configuración en `src/i18n/`

## State Management (Zustand)

### `userStore`
- `user`: Datos del usuario autenticado
- `session`: Token de sesión
- `isLoading`: Estado de carga
- `isTester`: Flag para acceso a features beta

### `settingsStore`
- `language`: Idioma seleccionado
- Preferencias del usuario

## Variables de Entorno (.env.local)
- `VITE_SUPABASE_URL`: URL de Supabase
- `VITE_SUPABASE_ANON_KEY`: Clave anónima de Supabase
- Otras claves específicas de configuración

## API Endpoints

### `/api/check-tester`
- **Método**: GET
- **Headers**: `Authorization: Bearer {accessToken}`
- **Response**: `{ isTester: boolean }`
- **Propósito**: Verificar si el usuario tiene acceso a features beta

### `/api/generate-exercise`
- **Método**: POST
- **Headers**: `Authorization: Bearer {accessToken}`
- **Body**: Parámetros de ejercicio (vocabulario, nivel, etc.)
- **Response**: Ejercicio generado por Claude AI
- **Propósito**: Generar ejercicios personalizados usando IA

## Scripts Disponibles
```bash
npm run dev       # Iniciar servidor de desarrollo (Vite)
npm run build     # Build para producción (TypeScript + Vite)
npm run lint      # Ejecutar ESLint
npm run preview   # Preview del build
```

## Flujo de Autenticación
1. Usuario accede a la landing page
2. Hace login en LoginPage (Supabase)
3. Callback a `/auth/callback` con token
4. Verificación de tester status via `/api/check-tester`
5. Redirección a dashboard o módulos disponibles
6. Store de usuario mantiene sesión activa

## Tecnologías Clave a Considerar

### Claude AI Integration
- Se usa `@ai-sdk/anthropic` para generar ejercicios
- Costo potencial: cada generación de ejercicio consume tokens
- Ubicación: `/api/generate-exercise.ts`

### Supabase
- Base de datos y autenticación en la nube
- Almacena usuarios, ejercicios, progreso
- Límites de tier actual: verificar en dashboard de Vercel

### Vite
- Build muy rápido
- HMR (Hot Module Replacement) en desarrollo
- Tree-shaking automático en producción

## Áreas Comunes de Mejora
- Performance: optimización de bundle, lazy loading de módulos
- UX: mejora de flujos de usuario, animations
- SEO: si es necesario para landing page
- Accesibilidad: WCAG compliance
- Testing: agregar tests unitarios e integración
- Caching: implementar estrategias de cache en Supabase

---

**Nota**: Este archivo está diseñado para ser usado como contexto en Claude normal. Cópialo y pégalo en el chat para darle contexto al asistente sin gastar créditos adicionales en exploración de código.
