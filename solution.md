The purpose of this files is to document the solving process of the technical test for the Front End position at Lunaa Studio.

### 1. Listado detallado de cambios por folder y archivo

## app

<details>
<summary><strong>error.tsx</strong></summary>

- useEffect para loggear el error en consola  
- Fallback `|| "Ocurrió un error inesperado."` cuando `error.message` está vacío  
- Tipo corregido a `Error & { digest?: string }`

</details>

<details>
<summary><strong>layout.tsx</strong></summary>

- `async RootLayout`: único punto de fetch (`await getUsers()`)  
- Envuelve toda la app con `<UsersProvider>`

</details>

<details>
<summary><strong>not-found.tsx</strong></summary>

- `<h2>` cambiado a `<h1>` para semántica y SEO correctos

</details>

<details>
<summary><strong>page.tsx</strong></summary>

- Eliminado el fetch y el provider  
- Solo renderiza `UserDashboard` (datos vienen del layout)

</details>

<details>
<summary><strong>UserDashboard.tsx</strong></summary>

- useMemo en `filteredUsers`
- `Date.now()` para IDs únicos
- `key={user.id}` en lugar de `index`
- Búsqueda case-insensitive
- Toolbar extraído a `UserListToolbar`
- Callbacks estabilizados con `useCallback`
- Prop actualizada a `onSubmit`

</details>

<details>
<summary><strong>users/[id]/page.tsx</strong></summary>

- Delegación de UI a `UserProfile`
- `.catch(() => notFound())` para evitar `User | undefined`
- Convertido a Client Component (`useParams()` + contexto)
- Eliminados `notFound()` en cliente (evitaba navegación correcta)

</details>

---

## components

<details>
<summary><strong>CreateEditUserModal.tsx</strong></summary>

- Renombrado desde `CreateUserModal`
- Estado consolidado en `EMPTY_FORM`
- Reset con `useEffect`
- `handleChange` genérico
- Validación inline
- `type="email"`
- React.memo
- Botón deshabilitado con `!isFormValid`
- Toast de error / éxito
- Modo avanzado dinámico
- Props genéricas (`onSubmit`, `initialValues`, etc.)
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` en el contenedor del diálogo
- `useId()` para IDs únicos que vinculan cada `<label htmlFor>` con su `<input id>`
- `aria-describedby` en los campos con error, apuntando al `<p role="alert">` del mensaje
- `aria-label="Cerrar"` en el botón X; SVG marcado con `aria-hidden="true"`
- Foco inicial en el primer input al abrir; foco restaurado al elemento trigger al cerrar
- Tecla **Escape** cierra el modal
- **Tab** y **Shift+Tab** quedan atrapados dentro del diálogo (focus trap)

</details>

<details>
<summary><strong>ConfirmModal.tsx (nuevo)</strong></summary>

- Modal reutilizable de confirmación
- Botones cancelar / eliminar
- React.memo
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` vinculado al `<h2>`
- Foco inicial en el botón "No, cancelar" al abrir (previene eliminación accidental); foco restaurado al trigger al cerrar
- Tecla **Escape** cierra el modal
- **Tab** y **Shift+Tab** quedan atrapados dentro del diálogo (focus trap)
- Backdrop marcado con `aria-hidden="true"`

</details>

<details>
<summary><strong>UserProfile.tsx (nuevo)</strong></summary>

- UI extraída de page
- Botón editar (✏️)
- Botón eliminar (🗑️)
- Integración con `CreateEditUserModal`
- `deleteUser(id)` + toast + redirect

</details>

<details>
<summary><strong>SearchBar.tsx</strong></summary>

- Debounce 300ms
- Estado local `inputValue`
- useCallback
- React.memo
- Atributos ARIA

</details>

<details>
<summary><strong>ToastProvider.tsx</strong></summary>

- Tracking de timers con `useRef<Map>`
- Cleanup al desmontar
- UI extraída a `ToastList.tsx`

</details>

<details>
<summary><strong>ToastList.tsx</strong></summary>

- Contenedor con `role="region"` + `aria-label="Notificaciones"` + `aria-live="polite"` + `aria-atomic="false"` — los lectores de pantalla anuncian cada toast al aparecer
- Toasts de error con `role="alert"` (interrupción inmediata); toasts de éxito con `role="status"` (anuncio suave)

</details>

<details>
<summary><strong>UserCard.tsx</strong></summary>

- React.memo
- `aria-label`
- `aria-hidden`

</details>

---

## contexts

<details>
<summary><strong>UsersContext.tsx</strong></summary>

- Estado global `users[]`
- `addUser`
- `getUserById`
- `updateUser`
- `deleteUser`

</details>

---

## hooks

<details>
<summary><strong>useUserForm.ts</strong></summary>

- Manejo completo del formulario
- Validación por campo
- `userToFormValues`
- Modo edición automático (`isAdvanced = true`)

</details>

---

## lib

<details>
<summary><strong>api.ts</strong></summary>

- Interceptor sin transformar respuesta

</details>

<details>
<summary><strong>userService.ts</strong></summary>

- `buildLocalUser` movido fuera de UI
- Derivación automática de username

</details>

---

## types

<details>
<summary><strong>user.ts</strong></summary>

- `CreateUserInput` derivado de `User`
- Extendido para modo avanzado

</details>

---

## root

<details>
<summary><strong>package.json</strong></summary>

- `--no-turbopack` para evitar error WASM

</details>


### 2. Cambios realizados en General

El primer problema que se abordó fue un bug crítico en api.ts: el interceptor de Axios estaba transformando la respuesta antes de devolverla, lo que causaba que los datos llegaran en un formato inesperado al resto de la app. La corrección fue simple pero importante: dejar pasar la respuesta sin modificarla, respetando el contrato que Axios ya establece por defecto.

En cuanto a los tipos, el tipo CreateUserInput se redefinió usando Pick sobre la interfaz User existente en lugar de duplicar campos manualmente. Esto significa que si la interfaz User cambia en el futuro, CreateUserInput lo refleja automáticamente. Además se extendió con campos opcionales como username, phone, website y address para soportar el modo avanzado del formulario, sin romper la compatibilidad con el caso básico.

Uno de los cambios más importantes a nivel de arquitectura fue la creación de un contexto global de usuarios (UsersContext). Antes, cada parte de la app hacía su propia petición o manejaba el estado localmente. Con el contexto, la carga inicial desde la API ocurre una sola vez en el layout raíz, y desde ahí todos los componentes leen y modifican el mismo estado compartido. Esto resolvió también un bug funcional: los usuarios creados localmente tenían un ID generado con Date.now() (timestamp) para evitar colisiones con los IDs numéricos que viene de la API, pero al navegar al detalle de ese usuario, la página hacía una nueva petición a la API que obviamente no lo encontraba. Con el contexto, el detalle también lee del mismo estado en memoria, por lo que los usuarios recién creados son accesibles inmediatamente.

En términos de optimización de rendimiento, se aplicaron varias técnicas de forma complementaria. useMemo se usa para calcular la lista filtrada de usuarios solo cuando cambian los datos o el término de búsqueda, evitando recalcular en cada render del componente padre. React.memo se aplicó en los componentes de modal, cards y toolbar para evitar re-renders innecesarios cuando el padre actualiza estado no relacionado, pero React.memo por sí solo no es suficiente si los props que recibe son funciones que se recrean en cada render. Por eso se complementó con useCallback en todos los handlers que se pasan como props, estabilizando sus referencias y haciendo que la comparación de React.memo sea efectiva. Finalmente, el componente CreateEditUserModal se carga con lazy loading mediante dynamic import de Next.js, lo que significa que su bundle JavaScript no forma parte de la carga inicial de la página sino que se descarga bajo demanda la primera vez que el usuario decide abrirlo.

Varios archivos nuevos se crearon siguiendo el principio de responsabilidad única. UserListToolbar concentra la barra de búsqueda, el contador de resultados y el botón de nuevo usuario, que antes vivían mezclados en el dashboard. ToastList se separó de ToastProvider para que el provider solo gestione el estado y los timers, sin preocuparse por cómo se renderiza la UI. Header se extrajo de Layout para que cada uno tenga una sola razón para cambiar. UserProfile se creó para concentrar toda la UI del detalle de un usuario, dejando la página users/[id] con la única responsabilidad de resolver el usuario del contexto y pasárselo. ConfirmModal es un componente genérico de confirmación que puede reutilizarse en cualquier flujo destructivo, sin estar acoplado a la lógica de usuarios.

Sobre las nuevas funcionalidades: la búsqueda en el listado es case-insensitive, lo que significa que buscar "garcia" encuentra "García" sin distinción. La creación de usuarios usa un formulario en dos modos: el básico pide solo nombre, email y empresa con validación en tiempo real por campo, y el modo avanzado se activa solo cuando esos tres campos son válidos, desplegando el resto de campos que coinciden exactamente con la estructura de la interfaz User (username, dirección, teléfono, sitio web, slogan y sector de empresa). Desde el detalle de un usuario también es posible editar sus datos abriendo el mismo modal pre-cargado con la información actual, o eliminarlo tras una confirmación explícita, lo que lo borra del estado y redirige al listado.

Importante tener en cuenta que todos estos cambios (usuarios creados, editados o eliminados) viven únicamente en memoria. Si la página se recarga, el estado del store vuelve pristine: los usuarios que provienen de la API, sin ninguna modificación local.


### 3. RoadBlocks: 
 - No ejecutaba en mac. Solución: Se eliminó carpeta .next, node_modules, y package-lock.json y se ejecuto nuevamente.

### 4. Live Demo: 
https://lunaa-studios-interview26022026.vercel.app/