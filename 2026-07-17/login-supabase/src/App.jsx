import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './Login'
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
    <div style={{ maxWidth: 420, margin: '40px auto', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <h2>Bienvenido, {session.user.email}</h2>
      <p>Tu sesión está activa.</p>
      <button onClick={handleLogout} style={{ marginTop: '16px', padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default App
