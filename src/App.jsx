import { useEffect, useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PersonProfile from './pages/PersonProfile'
import EditProfile from './pages/EditProfile/Index'

export default function App() {
  const url = "https://randomuser.me/api/?results=50"
  const [hiredPeople, setHiredPeople] = useState([])
const [people, setPeople] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setPeople(jsonData.results);
      console.log(jsonData)
    };
    fetchData();
  }, [])

  return (
    <>
      <header className="App">
        <h1>Hire Your Team</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <button type="button">Dashboard</button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard hiredPeople={hiredPeople} people={people} />
            }
          />
          <Route
            path="/people/:id"
            element={
              <PersonProfile people={people} setHiredPeople={setHiredPeople} />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditProfile hiredPeople={hiredPeople} setHiredPeople={setHiredPeople} />
            }
          />
        </Routes>
      </main>
    </>
  )
}
