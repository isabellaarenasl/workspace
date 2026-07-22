import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './Login'
import Productos from './Productos'
import './App.css'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (!session) {
    return <Login onLogin={setSession} />
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 600, margin: '0 auto', paddingTop: 20 }}>
        <h3>Bienvenido, {session.user.email}</h3>
        <button
          onClick={handleLogout}
          style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: '#4f46e5', color: '#fff' }}
        >
          Cerrar sesión
        </button>
      </div>
      <Productos session={session} />
    </div>
  )
}

export default App
