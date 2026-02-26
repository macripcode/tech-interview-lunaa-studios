The purpose of this files is to document the main points in the development of this tecnical test.

## Tareas

### 1. Identificar y Corregir Bugs

Revisa el código existente y encuentra errores sutiles que afectan la funcionalidad. Documenta qué encontraste y cómo lo corregiste.

| Folder      | Archivo                     | Mejora |
|------------|----------------------------|--------|
| app        | error.tsx                  | useEffect para loggear el error en consola |
| app        | error.tsx                  | Fallback `|| "Ocurrió un error inesperado."` cuando `error.message` está vacío |
| app        | error.tsx                  | Tipo del prop corregido a `Error & { digest?: string }` |
| app        | not-found.tsx              | `<h2>` cambiado a `<h1>` para semántica y SEO correctos |
| app        | UserDashboard.tsx          | useMemo en `filteredUsers` para evitar recalcular en cada render |
| app        | UserDashboard.tsx          | `Date.now()` en lugar de `users.length + 1` para IDs únicos |
| app        | UserDashboard.tsx          | `key={user.id}` en lugar de `key={index}` en el map |
| components | CreateUserModal.tsx        | Estado consolidado en un solo objeto `EMPTY_FORM` |
| components | CreateUserModal.tsx        | Reset del estado al cerrar el modal vía `useEffect` |
| components | CreateUserModal.tsx        | useCallback en `handleSubmit` |
| components | CreateUserModal.tsx        | `handleChange` genérico usando `name` del input |
| components | CreateUserModal.tsx        | Validación de campos requeridos con errores inline |
| components | CreateUserModal.tsx        | `type="email"` en el input de email |
| components | CreateUserModal.tsx        | React.memo para evitar re-renders innecesarios |
| components | SearchBar.tsx              | Debounce interno de 300ms con `useEffect + clearTimeout` |
| components | SearchBar.tsx              | Estado local `inputValue` para respuesta inmediata en UI |
| components | SearchBar.tsx              | useCallback en `handleChange` |
| components | SearchBar.tsx              | React.memo |
| components | SearchBar.tsx              | `role="search"` en el contenedor |
| components | SearchBar.tsx              | `aria-label="Buscar usuarios"` en el input |
| components | SearchBar.tsx              | `aria-hidden="true"` en el SVG decorativo |
| components | Layout.tsx                 | Extracción del header a componente separado (`Header.tsx`) |
| components | Layout.tsx                 | Responsabilidad única: solo estructura y contenedor |
| components | Header.tsx (nuevo)         | Nuevo componente con logo y navegación |
| components | ToastProvider.tsx          | useRef<Map> para tracking de timers activos |
| components | ToastProvider.tsx          | useEffect cleanup que cancela todos los timers al desmontar |
| components | UserCard.tsx               | React.memo para evitar re-renders cuando el padre cambia |
| components | UserCard.tsx               | `aria-label="Ver perfil de {nombre}"` en el Link |
| components | UserCard.tsx               | `aria-hidden="true"` en el avatar decorativo |
| —          | package.json               | `--no-turbopack` en el script dev para evitar error de WASM |
| lib        | api.ts                     | Pasando la respuesta sin modificar (interceptor de éxito como `undefined`) |
| app        | UserDashboard.tsx          | Búsqueda case-insensitive con `.toLowerCase()` en nombre, email y empresa |
| lib        | userService.ts             | `buildLocalUser` extraído de UserDashboard: lógica de construcción de `User` local fuera de la UI |
| app        | UserDashboard.tsx          | Toolbar extraído a `UserListToolbar`, responsabilidad única de orquestación de estado |
| components | UserListToolbar.tsx (nuevo)| Nuevo componente con SearchBar, contador y botón "Nuevo Usuario" |
| components | UserProfile.tsx (nuevo)    | UI del perfil de usuario extraída de `app/users/[id]/page.tsx` |
| app        | users/[id]/page.tsx        | Page reducida a fetch + render, delegando UI a `UserProfile` |
| app        | UserDashboard.tsx          | **Bug:** `handleUserCreated`, `onClose` y `onNewUser` recreados en cada render → `React.memo` en `CreateUserModal` y `UserListToolbar` era inefectivo. Corregido wrapping con `useCallback` |
| app        | users/[id]/page.tsx        | **Bug:** `let user` sin tipo explícito quedaba como `User \| undefined` tras el try/catch → error de tipos al pasar a `<UserProfile>`. Corregido con `.catch(() => notFound())` que infiere `User` directamente |



### 2. Mejorar el Rendimiento

| Folder      | Archivo              | Mejoras |
|------------|---------------------|---------|
| app        | UserDashboard.tsx   | - useMemo en `filteredUsers` para recalcular solo cuando cambian `users` o `search` <br> - `key={user.id}` en lugar de `key={index}` para correcta reconciliación del DOM |
| components | CreateUserModal.tsx | - React.memo para evitar re-renders cuando el padre cambia <br> - useCallback en `handleSubmit` <br> - Estado consolidado en un solo objeto (`useState` único) |
| components | SearchBar.tsx       | - Debounce de 300ms para evitar filtrado en cada keystroke <br> - React.memo <br> - useCallback en `handleChange` |
| components | ToastProvider.tsx   | - Cleanup de `setTimeout` usando `useRef<Map>` para prevenir memory leaks |
| components | UserCard.tsx        | - React.memo para evitar re-renders innecesarios cuando cambia el padre |
| components | UserListToolbar.tsx | - React.memo para evitar re-renders cuando cambia el padre <br> - Callbacks estables recibidos desde UserDashboard con useCallback |
| app        | UserDashboard.tsx   | - useCallback en `handleUserCreated`, `handleOpenModal` y `handleCloseModal` para estabilizar referencias y hacer efectivo el `memo` en `CreateUserModal` y `UserListToolbar` |
| app        | UserDashboard.tsx   | - `dynamic(() => import("@/components/CreateUserModal"))` para lazy loading: el bundle del modal solo se descarga cuando se abre por primera vez |

Analiza los componentes y encuentra oportunidades de optimización de rendimiento. Aplica las mejoras que consideres necesarias.

### 3. Refactorizar

Evalúa la arquitectura actual de los componentes. Si encuentras componentes con demasiadas responsabilidades o código que puede organizarse mejor, refactoriza según los principios de responsabilidad única.

### 4. Implementar Nueva Funcionalidad

**Modal "Nuevo Usuario"** — Completar la funcionalidad del modal de creación de usuarios con los siguientes requisitos:

#### Campos del formulario:
- **Nombre** (texto, requerido)
- **Email** (texto, requerido, formato de email válido)
- **Empresa** (texto, requerido)

#### Validaciones:
- Todos los campos son obligatorios
- El email debe tener formato válido
- Mostrar mensajes de error por campo

#### Comportamiento:
- Al enviar exitosamente: agregar el usuario al listado local y mostrar toast de éxito
- Si la validación falla: mostrar toast de error y no cerrar el modal
- El botón de envío debe estar deshabilitado mientras el formulario sea inválido
- Al cerrar el modal, los campos deben limpiarse

#### UI/UX:
- Diseño responsive
- Accesible (labels, roles ARIA si aplica, navegación por teclado)
- Consistente con el estilo visual existente


### BONUS - Funcionalidad Extra:
- Implementar alguna funcionalidad interesante o no considerada dentro del proyecto

---

### RoadBlocks: 
 - No ejecutaba en mac. Se eliminó carpeta .next, node_modules, y package-lock.json