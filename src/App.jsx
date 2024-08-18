import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  console.log(users)
  return (
    <>
      <div>
        <h1>Users management system</h1>
        <h3>Numbers of users:{users.length}</h3>
        {users.map(user => <p key={user.id}>{user.name}: {user.age}</p>)}
      </div>
    </>
  )
}

export default App
