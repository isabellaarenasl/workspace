// ============================================================
//  WhyUs.jsx
// ============================================================

const razones = [
  {
    icono: '🏆',
    titulo: 'Certificación RETIE',
    descripcion:
      'Todos nuestros trabajos cumplen con la normativa RETIE y las mejores prácticas de seguridad eléctrica.',
  },
  {
    icono: '⏱️',
    titulo: 'Respuesta rápida',
    descripcion:
      'Atendemos solicitudes con respuesta ágil para emergencias y mantenimientos en Medellín y el Área Metropolitana.',
  },
  {
    icono: '🛡️',
    titulo: 'Garantía de trabajo',
    descripcion:
      'Ofrecemos respaldo en mano de obra y materiales, para que tu instalación funcione con confianza.',
  },
  {
    icono: '💡',
    titulo: 'Soluciones a medida',
    descripcion:
      'Adaptamos cada proyecto a tus necesidades, desde una vivienda hasta una planta industrial.',
  },
];

function WhyUs() {
  return (
    <section id="nosotros" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* Columna izquierda: imagen */}
          <div className="col-lg-5">
            <img
              src="https://placehold.co/500x400/1a1e2e/f5c518?text=VoltTec"
              alt="Técnicos de VoltTec trabajando"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Columna derecha: texto y razones */}
          <div className="col-lg-7">
            <h2 className="section-titulo mb-3">¿Por qué elegirnos?</h2>

            <p className="text-muted">
              VoltTec es una empresa con más de 15 años de experiencia en instalaciones eléctricas
              residenciales y comerciales. Atendemos Medellín y el Área Metropolitana con servicios
              seguros, modernos y alineados a las necesidades de cada cliente.
            </p>

            <p className="text-muted mb-4">
              Nuestro equipo trabaja con materiales de alta calidad, protocolos RETIE y atención cercana,
              garantizando proyectos confiables para hogares, oficinas, comercios e industrias.
            </p>

            <ul className="list-unstyled">
              {razones.map((razon, index) => (
                <li key={index} className="d-flex gap-3 mb-3">
                  <span style={{ fontSize: '1.5rem' }}>{razon.icono}</span>
                  <div>
                    <strong>{razon.titulo}</strong>
                    <p className="text-muted mb-0 small">{razon.descripcion}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyUs;
