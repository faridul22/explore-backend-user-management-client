/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSendDataByChatGPTForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const category = form.category.value;
    const userInfo = { name, category }
    console.log(userInfo)
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(data => {
        console.log("inside fetch", data)
        const newUser = [...users, data]
        setUsers(newUser)
        form.reset();
      })

  };
  const handleLoginCopilot = (e) => {
    e.preventDefault();
    // You can add your login logic here
  };

  return (
    <>

      {/* ------------------Microsoft copilot----------------- */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login with Microsoft Copilot</h2>
          <input
            type="text"
            placeholder="name"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="category"
            placeholder="category"
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={handleLoginCopilot}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Log In
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
          </p>
        </div>
      </div>
      {/* ---------------------ChatGPT----------------------- */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account With ChatGPT</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSendDataByChatGPTForm}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="name"
                />
              </div>
              <div>
                <label htmlFor="category" className="sr-only">category</label>
                <input
                  id="category"
                  name="category"
                  type="category"
                  autoComplete="current-category"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="category"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your category?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* -------------------------------------------- */}
      <div>
        <h1>Users Management system</h1>
        <p><i>Numbers of users: {users.length}</i></p>
        {
          users.map(user => <div
            key={user.id}
          >{user.id}: {user.name}</div>)
        }
      </div>
    </>
  )
}

export default App
