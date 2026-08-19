import { useEffect, useState } from 'react'
import './App.css'

const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  { id: 4, texto: 'Practicar debugging', categoria: 'general', completada: false },
]

function App() {
  const [tareas, setTareas] = useState(tareasIniciales)
  const [filtro, setFiltro] = useState('todas')
  useEffect(() => {
    console.group('Render de App')
    console.log('Cantidad de tareas:', tareas.length)
    console.log('Filtro activo:', filtro)
    console.groupEnd()
  }, [tareas.length, filtro])

  const tareasFiltradas = tareas.filter((tarea) => {
    console.log('Filtro:', typeof tarea.completada, tarea.completada)
    if (filtro === 'todas') return true
    if (filtro === 'completadas') return tarea.completada === true
    if (filtro === 'pendientes') return tarea.completada === false
    return true
  })

  function agregarTarea(texto) {
    if (!texto.trim()) return
    console.log('Tareas antes:', tareas.length)
    const nuevaTarea = {
      id: Date.now(),
      texto: texto.trim(),
      categoria: 'general',
      completada: false,
    }
    setTareas((tareasActuales) => [...tareasActuales, nuevaTarea])
    console.log('Nueva tarea preparada:', nuevaTarea)
  }

  function completarTarea(id) {
    console.log('Completando tarea:', id)
    setTareas((tareasActuales) => tareasActuales.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: true } : tarea,
    ))
  }

  return (
    <main className="app-shell">
      <section className="app" aria-labelledby="titulo">
        <header className="app-header">
          <div>
            <p className="eyebrow">React / DevTools / práctica</p>
            <h1 id="titulo">Taller de debugging</h1>
            <p className="intro">Una lista de tareas preparada para inspeccionar, pausar y entender.</p>
          </div>
          <div className="render-count" aria-label="Consola de debugging">
            <strong>LOG</strong>
            <span>activo</span>
          </div>
        </header>

        <nav className="filters" aria-label="Filtrar tareas">
          {['todas', 'pendientes', 'completadas'].map((opcion) => (
            <button
              className={filtro === opcion ? 'filter-button active' : 'filter-button'}
              key={opcion}
              onClick={() => setFiltro(opcion)}
            >
              {opcion[0].toUpperCase() + opcion.slice(1)}
            </button>
          ))}
        </nav>

        <div className="summary">
          <span>{tareasFiltradas.length} de {tareas.length} tareas visibles</span>
          <span className="status-dot">Estado estable</span>
        </div>

        <ul className="task-list">
          {tareasFiltradas.map((tarea) => (
            <li key={tarea.id} className={tarea.completada ? 'task completed' : 'task'}>
              <div className="task-copy">
                <span className="task-marker" aria-hidden="true">{tarea.completada ? '✓' : '○'}</span>
                <span className="task-text">{tarea.texto}</span>
              </div>
              <div className="task-actions">
                <span className="category">{tarea.categoria.toUpperCase()}</span>
                <button
                  className="complete-button"
                  onClick={() => completarTarea(tarea.id)}
                  disabled={tarea.completada}
                  aria-label={`Completar ${tarea.texto}`}
                >
                  ✓
                </button>
              </div>
            </li>
          ))}
        </ul>

        <AgregarTarea onAgregar={agregarTarea} />
        <PerfilUsuario />
      </section>
    </main>
  )
}

function AgregarTarea({ onAgregar }) {
  const [texto, setTexto] = useState('')

  function manejarEnvio(evento) {
    evento.preventDefault()
    onAgregar(texto)
    setTexto('')
  }

  return (
    <form onSubmit={manejarEnvio} className="add-form">
      <label htmlFor="nueva-tarea">Añadir una tarea</label>
      <div className="input-row">
        <input
          id="nueva-tarea"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button type="submit" className="add-button">Agregar</button>
      </div>
    </form>
  )
}

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true
    console.log('Solicitando perfil, intento:', intento)

    const temporizador = setTimeout(() => {
      const exito = Math.random() > 0.5
      if (!activo) return
      if (exito) {
        console.log('Perfil cargado correctamente')
        setUsuario({ nombre: 'Estudiante React' })
      } else {
        const nuevoError = new Error('No se pudo cargar el usuario')
        console.error('Error controlado del perfil:', nuevoError)
        setError(nuevoError.message)
      }
    }, 1000)

    return () => {
      activo = false
      clearTimeout(temporizador)
    }
  }, [intento])

  if (error) {
    return (
      <div className="profile error-profile" role="alert">
        <span><strong>Perfil:</strong> {error}</span>
        <button onClick={() => {
          setUsuario(null)
          setError(null)
          setIntento((valor) => valor + 1)
        }}>Reintentar</button>
      </div>
    )
  }

  if (!usuario) return <p className="profile loading-profile">Cargando perfil...</p>

  return <p className="profile"><strong>Perfil:</strong> {usuario.nombre}</p>
}

export default App
