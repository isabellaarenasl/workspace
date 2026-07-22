import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function Productos({ session }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [editingId, setEditingId] = useState(null)

  const cargarProductos = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setProductos(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const limpiarFormulario = () => {
    setNombre('')
    setDescripcion('')
    setPrecio('')
    setEditingId(null)
    setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (editingId) {
      const { error } = await supabase
        .from('productos')
        .update({ nombre, descripcion, precio: Number(precio) })
        .eq('id', editingId)

      if (error) {
        setErrorMsg(error.message)
        return
      }
    } else {
      const { error } = await supabase.from('productos').insert({
        nombre,
        descripcion,
        precio: Number(precio),
        user_id: session.user.id,
      })

      if (error) {
        setErrorMsg(error.message)
        return
      }
    }

    limpiarFormulario()
    cargarProductos()
  }

  const handleEditar = (producto) => {
    setEditingId(producto.id)
    setNombre(producto.nombre)
    setDescripcion(producto.descripcion || '')
    setPrecio(producto.precio ?? '')
    setErrorMsg('')
  }

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este producto?')
    if (!confirmar) return

    const { error } = await supabase.from('productos').delete().eq('id', id)

    if (error) {
      setErrorMsg(error.message)
      return
    }
    cargarProductos()
  }

  return (
    <div style={{ maxWidth: 600, margin: '20px auto' }}>
      <h2>Mis Productos</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Precio</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: '#4f46e5', color: '#fff' }}>
          {editingId ? 'Guardar cambios' : 'Crear producto'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={limpiarFormulario}
            style={{ marginLeft: 12, padding: '10px 16px', borderRadius: '8px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
          >
            Cancelar edición
          </button>
        )}
      </form>

      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>Aún no tienes productos registrados.</p>
      ) : (
        <table width="100%" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th align="left">Nombre</th>
              <th align="left">Descripción</th>
              <th align="left">Precio</th>
              <th align="left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>${Number(p.precio).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleEditar(p)}
                    style={{ marginRight: 8, padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: '#2563eb', color: '#fff' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(p.id)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: '#dc2626', color: '#fff' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
