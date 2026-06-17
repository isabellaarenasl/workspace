import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.email && formData.servicio && formData.mensaje) {
      setEnviado(true);
    }
  };

  return (
    <section id="contacto" className="py-5 bg-dark text-white">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo text-white">Contáctenos</h2>
          <p className="text-light opacity-75">
            Solicita tu cotización eléctrica y recibe atención prioritaria.
            Nuestro equipo está listo para asesorarte en instalaciones,
            mantenimiento y respaldo para tu hogar o negocio.
          </p>
        </div>

        <div className="row g-5">

          <div className="col-lg-4">
            <h4 className="mb-4">Información de contacto</h4>
            <ul className="list-unstyled">
              <li className="mb-3">
                <span className="me-2">📍</span>
                Calle 10 # 43A-15, El Poblado, Medellín
              </li>
              <li className="mb-3">
                <span className="me-2">📞</span>
                <a className="footer-link" href="tel:+573001234567">
                  (300) 123-4567
                </a>
              </li>
              <li className="mb-3">
                <span className="me-2">📧</span>
                <a className="footer-link" href="mailto:info@volttec.com.co">
                  info@volttec.com.co
                </a>
              </li>
              <li className="mb-3">
                <span className="me-2">🕐</span>
                Lun–Vie 7am–6pm · Sáb 8am–2pm
              </li>
            </ul>
          </div>

          <div className="col-lg-8">
            <div className="bg-white text-dark rounded-3 p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label fw-semibold">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="tucorreo@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label fw-semibold">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      className="form-control"
                      placeholder="300 123 4567"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="servicio" className="form-label fw-semibold">
                      Tipo de servicio
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      className="form-select"
                      value={formData.servicio}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un servicio...</option>
                      <option value="residencial">Instalación residencial</option>
                      <option value="comercial">Instalación comercial</option>
                      <option value="mantenimiento">Mantenimiento eléctrico</option>
                      <option value="tableros">Tableros y breakers</option>
                      <option value="iluminacion">Iluminación LED y domótica</option>
                      <option value="backup">Plantas eléctricas y UPS</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label fw-semibold">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows="5"
                      className="form-control"
                      placeholder="Describe brevemente tu necesidad..."
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-voltec w-100 py-2">
                      Enviar solicitud
                    </button>
                  </div>

                  {enviado && (
                    <div className="col-12">
                      <div className="alert alert-success mt-3" role="alert">
                        ✅ ¡Gracias {formData.nombre}! Hemos recibido tu solicitud y te contactaremos pronto.
                      </div>
                    </div>
                  )}

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
