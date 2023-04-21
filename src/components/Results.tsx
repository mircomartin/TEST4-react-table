import { useUser } from '../hooks/useUser'

export const Results = () => {

  const { users } = useUser()
  
  return (
    <div>
      <h2>Resultados: {users.length}</h2>
    </div>
  )
}
