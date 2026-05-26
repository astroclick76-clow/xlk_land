# Reporte de Correcciones de Lint

## Resumen

Se corrigieron **11 errores** de ESLint en **7 archivos** del proyecto.  
Todos los errores eran pre-existentes (no introducidos por las nuevas integraciones).  
Cero errores restantes. Build exitoso.

---

## Detalle de errores y correcciones

### 1. `src/components/Beneficios.jsx` — Línea 65
- **Error:** `react-hooks/set-state-in-effect` — Llamado a `setLifestyleImg` sincrónicamente dentro de un `useEffect`.
- **Corrección:** Eliminado `useState` + `useEffect`. El valor `lifestyleImg` se calcula directamente desde el `import.meta.glob` (eager sync) a nivel de módulo.

### 2. `src/components/Comunidad.jsx` — Línea 53
- **Error:** `react-hooks/set-state-in-effect` — Mismo patrón con `setLifestyleImg`.
- **Corrección:** Idéntico al anterior. Cálculo directo a nivel de módulo.

### 3. `src/components/Hero.jsx` — Línea 23
- **Error:** `react-hooks/set-state-in-effect` — `setVideoSrc` y `setCoverImg` en efecto sincrónico.
- **Corrección:** `videoSrc` y `coverImg` se computan a nivel de módulo. El `playbackRate` ahora se asigna mediante `onLoadedMetadata` en el elemento `<video>`, eliminando el `useEffect` completo.

### 4. `src/components/Hero.jsx` — Línea 140
- **Error:** `no-unused-vars` — Parámetro `i` no utilizado en `.map((m, i) =>`.
- **Corrección:** Cambiado a `.map((m) =>`.

### 5. `src/components/Proyecto.jsx` — Línea 40
- **Error:** `react-hooks/set-state-in-effect` — `setParkImg` en efecto sincrónico.
- **Corrección:** Mismo patrón. Cálculo directo a nivel de módulo.

### 6. `src/components/QueEsXLK.jsx` — Línea 3, columna 64
- **Error:** `no-unused-vars` — `Handshake` importado de `lucide-react` pero nunca usado.
- **Corrección:** Eliminado de la importación.

### 7. `src/components/QueEsXLK.jsx` — Línea 3, columna 75
- **Error:** `no-unused-vars` — `Users` importado de `lucide-react` pero nunca usado.
- **Corrección:** Eliminado de la importación.

### 8. `src/components/QueEsXLK.jsx` — Línea 23
- **Error:** `react-hooks/set-state-in-effect` — `setTokenImg` en efecto sincrónico.
- **Corrección:** Mismo patrón. Cálculo directo a nivel de módulo.

### 9. `src/components/Tokenomics.jsx` — Línea 2, columna 10
- **Error:** `no-shadow-restricted-names` — El import `Infinity` de `lucide-react` sombrea la propiedad global `Infinity`.
- **Corrección:** Renombrado a `InfinityIcon` en el import y en su uso.

### 10. `src/components/WalletModal.jsx` — Línea 87
- **Error:** `no-unused-vars` — `deepLink` asignado pero nunca leído.
- **Corrección:** Eliminada la variable `deepLink` y su import asociado `getPhantomDeepLink` (la función `redirectToPhantom` ya lo usa internamente).

### 11. `src/utils/isMobileDevice.js` — Línea 5
- **Error:** `no-unused-vars` — `platform` asignado pero nunca usado.
- **Corrección:** Eliminada la línea completa (`const platform = navigator.platform || ''`).

---

## Archivos modificados

| Archivo | Errores corregidos |
|---------|-------------------|
| `src/components/Beneficios.jsx` | 1 |
| `src/components/Comunidad.jsx` | 1 |
| `src/components/Hero.jsx` | 2 |
| `src/components/Proyecto.jsx` | 1 |
| `src/components/QueEsXLK.jsx` | 3 |
| `src/components/Tokenomics.jsx` | 1 |
| `src/components/WalletModal.jsx` | 1 |
| `src/utils/isMobileDevice.js` | 1 |

**Resultado final:** `npm run lint` → 0 errores. `npm run build` → exitoso.
