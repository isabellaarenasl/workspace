import { useState } from 'react'
import './App.css'

const initialState = {
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
}

function App() {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [enviado, setEnviado] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    if (enviado) {
      setEnviado(false)
    }
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.nombre.trim()) {
      nextErrors.nombre = 'El nombre es obligatorio.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Ingresa un correo válido.'
    }

    if (!formData.servicio) {
      nextErrors.servicio = 'Selecciona un servicio.'
    }

    if (!formData.mensaje.trim()) {
      nextErrors.mensaje = 'Escribe un mensaje para continuar.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setEnviado(false)
      return
    }

    setEnviado(true)
    setFormData(initialState)
  }

  return (
    <main className="page">
      <section className="card">
        <div className="intro">
          <p className="eyebrow">Formulario completo</p>
          <h1>Contáctanos</h1>
          <p>
            Completa este formulario para solicitar información sobre nuestros
            servicios y te responderemos a la brevedad.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="123456789"
            />
          </div>

          <div className="field">
            <label htmlFor="servicio">Servicio de interés</label>
            <select
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
            >
              <option value="">Selecciona una opción</option>
              <option value="Diseño web">Diseño web</option>
              <option value="Marketing">Marketing</option>
              <option value="Soporte">Soporte</option>
            </select>
            {errors.servicio && <span className="error">{errors.servicio}</span>}
          </div>

          <div className="field">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos qué necesitas"
            />
            {errors.mensaje && <span className="error">{errors.mensaje}</span>}
          </div>

          <button type="submit">Enviar solicitud</button>

          {enviado && (
            <p className="success">
              Gracias, tu solicitud se envió correctamente. Te contactaremos pronto.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default App
