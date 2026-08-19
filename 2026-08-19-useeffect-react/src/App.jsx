import { useEffect, useRef, useState } from 'react'
import './App.css'

const nombres = { 1: 'Ana', 2: 'Luis' }

function App() {
  const [mostrarReloj, setMostrarReloj] = useState(true)
  const [usuarioId, setUsuarioId] = useState(1)
  const [mostrarExperimento, setMostrarExperimento] = useState(true)

  return (
    <main className="page-shell">
      <div className="app">
        <header className="hero">
          <div>
            <p className="eyebrow">React / efectos / ciclo de vida</p>
            <h1>Lo que ocurre entre renders</h1>
            <p className="lede">Una consola visual para observar montaje, actualización y desmontaje sin adivinar.</p>
          </div>
          <div className="phase-key" aria-label="Fases del ciclo de vida">
            <span><i className="dot mount" />montaje</span>
            <span><i className="dot update" />actualización</span>
            <span><i className="dot clean" />limpieza</span>
          </div>
        </header>

        <div className="grid">
          <section className="panel panel-wide">
            <div className="panel-heading">
              <div><span className="number">01</span><h2>Reloj</h2></div>
              <span className="tag">cleanup</span>
            </div>
            <p className="hint">El intervalo vive mientras el componente está montado.</p>
            <button className="button" onClick={() => setMostrarReloj((visible) => !visible)}>
              {mostrarReloj ? 'Ocultar reloj' : 'Mostrar reloj'}
            </button>
            {mostrarReloj ? <Reloj /> : <p className="muted">Reloj desmontado. Revisa la consola: los ticks se detuvieron.</p>}
          </section>

          <section className="panel">
            <div className="panel-heading"><div><span className="number">02</span><h2>Contador automático</h2></div><span className="tag">closure</span></div>
            <p className="hint">La actualización funcional siempre recibe el valor actual.</p>
            <ContadorAutomatico />
          </section>

          <section className="panel">
            <div className="panel-heading"><div><span className="number">03</span><h2>Ancho de ventana</h2></div><span className="tag">listener</span></div>
            <p className="hint">Un solo listener, limpiado al desmontar.</p>
            <RastreadorVentana />
          </section>

          <section className="panel">
            <div className="panel-heading"><div><span className="number">04</span><h2>Perfil de usuario</h2></div><span className="tag">dependencia</span></div>
            <p className="hint">Cambiar el id vuelve a ejecutar el efecto de búsqueda.</p>
            <div className="user-buttons">
              {[1, 2].map((id) => <button className={usuarioId === id ? 'button selected' : 'button'} key={id} onClick={() => setUsuarioId(id)}>Usuario {id}</button>)}
            </div>
            <PerfilUsuario id={usuarioId} />
          </section>

          <section className="panel panel-wide experiment-panel">
            <div className="panel-heading"><div><span className="number">05</span><h2>Experimento de fases</h2></div><span className="tag">observa</span></div>
            <p className="hint">Abre DevTools y cambia los clics. Cada color representa un momento distinto.</p>
            <button className="button" onClick={() => setMostrarExperimento((visible) => !visible)}>
              {mostrarExperimento ? 'Desmontar experimento' : 'Montar experimento'}
            </button>
            {mostrarExperimento && <ExperimentoFases />}
          </section>
        </div>

        <footer className="footer-note">Abre la consola del navegador para ver los logs agrupados del ciclo de vida.</footer>
      </div>
    </main>
  )
}

function Reloj() {
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    console.log('Reloj: montado')
    const intervalo = setInterval(() => {
      setSegundos((segundosActuales) => {
        console.log('Reloj: tick', segundosActuales + 1)
        return segundosActuales + 1
      })
    }, 1000)

    return () => {
      clearInterval(intervalo)
      console.log('Reloj: desmontado, intervalo limpiado')
    }
  }, [])

  return <p className="metric"><strong>{String(segundos).padStart(2, '0')}</strong><span>segundos</span></p>
}

function ContadorAutomatico() {
  const [contador, setContador] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((valorActual) => {
        const siguienteValor = valorActual + 1
        console.log('Contador: valor actualizado', siguienteValor)
        return siguienteValor
      })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  return <p className="metric"><strong>{contador}</strong><span>cuenta</span></p>
}

function RastreadorVentana() {
  const [ancho, setAncho] = useState(window.innerWidth)

  useEffect(() => {
    function manejarResize() {
      console.log('Ventana: resize detectado', window.innerWidth)
      setAncho(window.innerWidth)
    }

    window.addEventListener('resize', manejarResize)
    console.log('Ventana: listener agregado')
    return () => {
      window.removeEventListener('resize', manejarResize)
      console.log('Ventana: listener removido')
    }
  }, [])

  return <p className="metric"><strong>{ancho}</strong><span>px de ancho</span></p>
}

function PerfilUsuario({ id }) {
  useEffect(() => {
    console.log('Perfil: buscando datos del usuario', id)
    return () => console.log('Perfil: limpiando efecto del usuario', id)
  }, [id])

  return <p className="profile"><span className="avatar">{nombres[id][0]}</span><span>Nombre actual: <strong>{nombres[id]}</strong></span></p>
}

function ExperimentoFases() {
  const [clics, setClics] = useState(0)
  const esPrimeraVez = useRef(true)

  useEffect(() => {
    if (esPrimeraVez.current) {
      console.log('MONTADO: el experimento apareció')
      esPrimeraVez.current = false
    } else {
      console.log('ACTUALIZADO: clics =', clics)
    }

    return () => console.log('LIMPIEZA: antes del efecto siguiente o del desmontaje')
  }, [clics])

  return <div className="experiment"><p className="metric"><strong>{clics}</strong><span>clics</span></p><button className="button dark" onClick={() => setClics((valor) => valor + 1)}>Registrar clic</button></div>
}

export default App
