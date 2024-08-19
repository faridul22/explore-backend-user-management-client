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

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const userInfo = { email, password }
    console.log(userInfo)

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(data => console.log("inside post request", data))
  }
  return (
    <>
      <div>
        <h1>Users management system</h1>
        <h3>Numbers of users:{users.length}</h3>
        {users.map(user => <p key={user.id}>{user.name}: {user.age}</p>)}

        <form onSubmit={handleAddUser}>
          <input type="email" name='email' placeholder='Your email' />
          <br />
          <input type="password" name='password' placeholder='password' />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  )
}

export default App
