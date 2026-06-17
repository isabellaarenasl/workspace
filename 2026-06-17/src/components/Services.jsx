// ============================================================
//  Services.jsx
// ============================================================

const servicios = [
  {
    icono: '🏠',
    titulo: 'Instalaciones residenciales',
    descripcion:
      'Diseñamos y ejecutamos instalaciones eléctricas completas para casas y apartamentos, siempre con cumplimiento RETIE.',
  },
  {
    icono: '🏢',
    titulo: 'Instalaciones comerciales',
    descripcion:
      'Ofrecemos soluciones eléctricas para locales comerciales, oficinas y bodegas, con trazados seguros y eficientes.',
  },
  {
    icono: '🛠️',
    titulo: 'Mantenimiento preventivo',
    descripcion:
      'Revisamos y ajustamos su instalación para evitar fallas, cortocircuitos y prolongar la vida útil de sus equipos.',
  },
  {
    icono: '🔌',
    titulo: 'Tableros y breakers',
    descripcion:
      'Instalamos y actualizamos tableros eléctricos, breakers y protecciones de última generación para mayor seguridad.',
  },
  {
    icono: '💡',
    titulo: 'Iluminación LED y domótica',
    descripcion:
      'Implementamos soluciones eficientes de iluminación LED y automatización para hogares y negocios modernos.',
  },
  {
    icono: '⚡',
    titulo: 'Plantas eléctricas y UPS',
    descripcion:
      'Instalamos sistemas de respaldo eléctrico y UPS para mantener sus operaciones activas durante cortes de servicio.',
  },
];

function Services() {
  return (
    <section id="servicios" className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo">Nuestros Servicios</h2>
          <p className="section-subtitulo text-muted">
            Ofrecemos soluciones eléctricas integrales para hogares y empresas,
            con calidad RETIE, atención rápida y diseño enfocado en tu seguridad.
          </p>
        </div>

        <div className="row g-4">
          {servicios.map((servicio, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4 text-center">
                  <div style={{ fontSize: '2.5rem' }} className="mb-3">
                    {servicio.icono}
                  </div>
                  <h5 className="card-title fw-bold mt-2">{servicio.titulo}</h5>
                  <p className="card-text text-muted">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;
