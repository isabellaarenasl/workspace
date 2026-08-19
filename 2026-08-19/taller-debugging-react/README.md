# Taller de Debugging en React

Aplicacion resuelta del taller de DevTools, `console.*`, breakpoints y cinco errores comunes.

## Ejecutar

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite y las DevTools del navegador. La consola incluye grupos y trazas de los renders, filtros, acciones y carga del perfil.

## Soluciones

1. **Propiedad undefined:** la tarea 4 tiene `categoria: 'general'`, y el render puede llamar `toUpperCase()` sin romperse.
2. **Efecto infinito:** el efecto de render tiene dependencias y usa la forma funcional de `setContador`.
3. **Tipos:** los filtros comparan `completada` con los booleanos `true` y `false`.
4. **Mutacion:** agregar y completar tareas siempre crean arreglos nuevos con el setter funcional.
5. **Async:** el perfil guarda el error en estado, lo muestra en pantalla, permite reintentar y limpia el temporizador al desmontar.

## Breakpoint

En Sources busca `completarTarea`, pon un breakpoint en su primera linea y pulsa el boton de check de una tarea pendiente.
