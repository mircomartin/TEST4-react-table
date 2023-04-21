import { useMemo, useState } from 'react'
import { useUser } from './hooks/useUser'
import { UsersList } from './components/UsersList'
import './App.css'
import { Results } from './components/Results'

function App () {

  const { users, fetchNextPage, hasNextPage, isError, isLoading, refetch } = useUser()
  
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState)
  }

  const handleDelete = (email: string) => {
    /* const usersFiltered = users.filter((user) => user.email !== email)
    setUsers(usersFiltered) */
  }

  const handleReset = async () => {
    await refetch()
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users?.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])
 
  return (
    <div className="App">
      <h1>Test React</h1>
      <header>
        <Results />
        <div className="nav">
          <button onClick={toggleColors}>Colorear Filas</button>
          <button onClick={toggleSortByCountry}>Sort By Country</button>
          <button onClick={() => { void handleReset() }}>Reset</button>
          <input type="text" placeholder="Filtrar por país"
            onChange={(e) => setFilterCountry(e.target.value)}
          />   
        </div>
      </header>
      <main>
        {
          users.length > 0 && <UsersList showColors={showColors} sortByCountry={sortByCountry} handleDelete={handleDelete} filteredUsers={filteredUsers}/>
        }
        {isLoading && <p><strong>Cargando...</strong></p>}
        {!isLoading && isError && <p>Ha habido un Error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {
          !isLoading && !isError && hasNextPage === true && <button onClick={() => { fetchNextPage() }}>Cargar más resultados</button>
        }  
        </main>
    </div>
  )
}

export default App
