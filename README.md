# Customer Management Dashboard

 La aplicación consume datos de la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) para listar, buscar y visualizar información de usuarios.

---

## Estructura del Proyecto

```
app/
  layout.tsx              # Layout raíz con ToastProvider
  page.tsx                # Página principal (Server Component)
  UserDashboard.tsx       # Dashboard interactivo (Client Component)
  error.tsx               # Manejo de errores a nivel de ruta
  not-found.tsx           # Página 404
  users/
    [id]/
      page.tsx            # Detalle de usuario (Server Component)

components/
  Layout.tsx              # Wrapper de layout con navegación
  UserCard.tsx            # Tarjeta de usuario
  SearchBar.tsx           # Barra de búsqueda
  CreateUserModal.tsx     # Modal de creación de usuario
  ToastProvider.tsx       # Sistema de notificaciones toast

lib/
  api.ts                  # Instancia de Axios configurada
  userService.ts          # Funciones de servicio para usuarios

types/
  user.ts                 # Tipos TypeScript
```

---

## Requisitos Técnicos

### Arquitectura

- **Capa de API**: Axios configurado con `axios.create()`, interceptores de respuesta y normalización de errores en `lib/api.ts`
- **Capa de servicio**: Funciones `getUsers` y `getUserById` en `lib/userService.ts`
- **Tipos**: Definidos centralmente en `types/user.ts`

### Manejo de Errores

- Interceptor centralizado en Axios para normalizar errores de API
- Sistema de toast basado en Context para notificaciones al usuario
- Error boundary (`error.tsx`) para errores de runtime
- Página 404 personalizada

---

## Tareas

### 1. Identificar y Corregir Bugs

Revisa el código existente y encuentra errores sutiles que afectan la funcionalidad. Documenta qué encontraste y cómo lo corregiste.

### 2. Mejorar el Rendimiento

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

## Criterios de Evaluación

| Criterio | Descripción |
|---|---|
| **Calidad del código** | Código limpio, legible y mantenible |
| **Separación cliente/servidor** | Uso correcto de Server y Client Components |
| **Manejo de errores** | Errores manejados correctamente en todos los niveles |
| **Uso de Axios** | Uso correcto de la capa de API, sin llamadas directas en componentes |
| **Performance** | Optimizaciones aplicadas donde corresponde |
| **UX** | Interfaz intuitiva, feedback al usuario, estados de carga |
| **Organización del proyecto** | Estructura clara y escalable |
| **Claridad en commits** | Commits descriptivos que expliquen los cambios realizados |

---

## Notas

- No se permite el uso de librerías de UI externas (Material UI, Chakra, shadcn, etc.)
- Toda la lógica de estilos debe usar TailwindCSS
- Los cambios deben hacerse mediante commits claros y descriptivos
- El proyecto debe compilar sin errores de TypeScript
