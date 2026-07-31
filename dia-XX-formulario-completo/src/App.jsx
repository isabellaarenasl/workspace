import { useEffect, useState } from 'react'

// Lista de lenguajes disponibles para los checkboxes.
const availableLanguages = ['JavaScript', 'Python', 'Java', 'C++']
const countries = ['Argentina', 'Chile', 'Colombia', 'México', 'España', 'Perú']

function StudentRegistrationForm() {
  // Estado para cada campo del formulario, cumpliendo con el requisito de control por useState.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [experience, setExperience] = useState(5)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [languages, setLanguages] = useState([])
  const [modality, setModality] = useState('presencial')
  const [country, setCountry] = useState('')
  const [comments, setComments] = useState('')
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [favoriteColor, setFavoriteColor] = useState('#6366f1')
  const [submittedData, setSubmittedData] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  // Validación simple para el correo y la edad antes de habilitar el botón.
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isAgeValid = Number(age) > 0
  const isSubmitDisabled = !acceptedTerms || !isEmailValid || !isAgeValid

  // Crea una vista previa de la imagen y libera la URL anterior cuando cambia el archivo o el componente se desmonta.
  useEffect(() => {
    if (!profilePhoto) {
      setPreviewUrl('')
      return undefined
    }

    const objectUrl = URL.createObjectURL(profilePhoto)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [profilePhoto])

  // Alterna los lenguajes marcados en el array de estado.
  const toggleLanguage = (language) => {
    setLanguages((prev) =>
      prev.includes(language) ? prev.filter((item) => item !== language) : [...prev, language],
    )
  }

  // Maneja el envío del formulario y muestra un resumen con todos los campos.
  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedData({
      name,
      email,
      password,
      age,
      birthDate,
      experience,
      acceptedTerms,
      languages,
      modality,
      country,
      comments,
      profilePhoto: profilePhoto?.name ?? 'Sin archivo',
      favoriteColor,
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <section className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Registro de estudiante
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Completa tu perfil</h1>
            <p className="mt-3 text-sm text-slate-400">
              Registra tus datos principales y compártenos tu experiencia.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bloque de datos básicos del estudiante. */}
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Nombre</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                  placeholder="Tu nombre"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Correo</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                  placeholder="correo@ejemplo.com"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Contraseña</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                  placeholder="********"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Edad</span>
                <input
                  type="number"
                  min="1"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">Fecha de nacimiento</span>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(event) => setBirthDate(event.target.value)}
                  className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </label>

              <div className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200">
                  Nivel de experiencia: {experience}
                </span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={experience}
                  onChange={(event) => setExperience(Number(event.target.value))}
                  className="accent-cyan-400"
                />
              </div>
            </div>

            {/* Bloque de aceptación de términos y condiciones. */}
            <label className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-cyan-500"
              />
              <span>Acepto los términos y condiciones</span>
            </label>

            {/* Bloque para elegir varios lenguajes con checkboxes. */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="mb-3 text-sm font-medium text-slate-200">Lenguajes que conoces</p>
              <div className="flex flex-wrap gap-3">
                {availableLanguages.map((language) => (
                  <label key={language} className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={languages.includes(language)}
                      onChange={() => toggleLanguage(language)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-cyan-500"
                    />
                    {language}
                  </label>
                ))}
              </div>
            </div>

            {/* Bloque de modalidad con radio buttons. */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="mb-3 text-sm font-medium text-slate-200">Modalidad</p>
              <div className="flex flex-wrap gap-4">
                {['presencial', 'virtual'].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      value={option}
                      checked={modality === option}
                      onChange={(event) => setModality(event.target.value)}
                      className="h-4 w-4 accent-cyan-500"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Bloque para seleccionar país y escribir comentarios. */}
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-slate-200">País</span>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
              >
                <option value="">Selecciona un país</option>
                {countries.map((countryName) => (
                  <option key={countryName} value={countryName}>
                    {countryName}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-slate-200">Comentarios</span>
              <textarea
                value={comments}
                onChange={(event) => setComments(event.target.value)}
                rows="4"
                className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="Cuéntanos algo sobre ti"
              />
            </label>

            {/* Bloque para subir foto y mostrar una vista previa. */}
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-slate-200">Foto de perfil</span>
              <input
                type="file"
                onChange={(event) => setProfilePhoto(event.target.files?.[0] ?? null)}
                className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-400"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Vista previa de la foto"
                  className="mt-3 h-40 w-40 rounded-2xl object-cover border border-slate-700"
                />
              )}
            </label>

            {/* Bloque para elegir el color favorito. */}
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-slate-200">Color favorito</span>
              <input
                type="color"
                value={favoriteColor}
                onChange={(event) => setFavoriteColor(event.target.value)}
                className="h-12 w-full cursor-pointer rounded-2xl border border-slate-700 bg-transparent p-1"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              Enviar registro
            </button>
          </form>
        </section>

        <aside className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/30">
          <h2 className="text-xl font-semibold">Resumen</h2>
          <p className="mt-2 text-sm text-slate-400">
            Aquí aparecerá la información enviada una vez completes el formulario.
          </p>

          {submittedData ? (
            <div className="mt-6 space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
              <p><span className="font-semibold text-slate-200">Nombre:</span> {submittedData.name}</p>
              <p><span className="font-semibold text-slate-200">Correo:</span> {submittedData.email}</p>
              <p><span className="font-semibold text-slate-200">Contraseña:</span> {submittedData.password}</p>
              <p><span className="font-semibold text-slate-200">Edad:</span> {submittedData.age}</p>
              <p><span className="font-semibold text-slate-200">Fecha de nacimiento:</span> {submittedData.birthDate}</p>
              <p><span className="font-semibold text-slate-200">Experiencia:</span> {submittedData.experience}</p>
              <p><span className="font-semibold text-slate-200">Términos aceptados:</span> {submittedData.acceptedTerms ? 'Sí' : 'No'}</p>
              <p><span className="font-semibold text-slate-200">Lenguajes:</span> {submittedData.languages.join(', ') || 'Ninguno'}</p>
              <p><span className="font-semibold text-slate-200">Modalidad:</span> {submittedData.modality}</p>
              <p><span className="font-semibold text-slate-200">País:</span> {submittedData.country}</p>
              <p><span className="font-semibold text-slate-200">Comentarios:</span> {submittedData.comments}</p>
              <p><span className="font-semibold text-slate-200">Foto:</span> {submittedData.profilePhoto}</p>
              <p><span className="font-semibold text-slate-200">Color:</span> {submittedData.favoriteColor}</p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-400">
              Aún no hay datos enviados.
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default StudentRegistrationForm
