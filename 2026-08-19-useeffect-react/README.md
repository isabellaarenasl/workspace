# Taller useEffect y ciclo de vida

Aplicacion resuelta del taller sobre montaje, actualizacion, desmontaje, dependencias y cleanup.

## Ejecutar

```bash
npm install
npm run dev
```

Abre las DevTools del navegador para seguir los logs. React StrictMode puede mostrar una secuencia extra de montaje y limpieza en desarrollo; sirve para detectar efectos que no limpian sus recursos.

## Soluciones

1. **Reloj:** `setInterval` devuelve un id y el efecto retorna `clearInterval(id)`, evitando un intervalo activo despues del desmontaje.
2. **Contador:** usa `setContador(valorActual => valorActual + 1)`, por lo que no depende de una closure obsoleta. El intervalo se limpia al desmontar.
3. **Ventana:** el listener se registra una vez con `[]` y se retira con `removeEventListener` usando la misma funcion.
4. **Perfil:** el efecto observa `[id]`. El nombre se deriva del id actual, asi siempre cambia al elegir otro usuario.

## Experimento de fases

Con `[clics]`, el efecto se ejecuta al montar y despues de cada clic. La limpieza corre antes del siguiente efecto y al desmontar. Usa los botones para desmontarlo y montarlo, y cambia el arreglo de dependencias en `ExperimentoFases` para comparar `[]` y la ausencia de dependencias.

## Breakpoints

En Sources busca `Reloj`, `manejarResize` o `ExperimentoFases`. Coloca un breakpoint dentro del callback y activa el boton correspondiente para inspeccionar el estado.
