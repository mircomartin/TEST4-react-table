import { useEffect, useMemo, useRef, useState } from 'react'
import { type User } from './types'
import { UsersList } from './components/UsersList'
import './App.css'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  useEffect(() => {

    fetch('https://randomuser.me/api?results=100')
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err) => {
        console.log(err)
      })
      
  }, [])

  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState)
  }

  const handleDelete = (uuid: string) => {
    const usersFiltered = users.filter((user) => user.login.uuid !== uuid)
    setUsers(usersFiltered)
  }

  const handleReset = () => {
    setUsers((prevState) => originalUsers.current)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])
 
  return (
    <div className="App">
      <h1>Test React</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSortByCountry}>Sort By Country</button>
        <button onClick={handleReset}>Reset</button>
        <input type="text" placeholder="Filtrar por país"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        <UsersList showColors={showColors} sortByCountry={sortByCountry} handleDelete={handleDelete} filteredUsers={filteredUsers}/>
      </main>
    </div>
  )
}

export default App
