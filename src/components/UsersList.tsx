import { useMemo } from 'react'
import { type User } from '../types'

interface Props {
  filteredUsers: User[]
  showColors: boolean
  sortByCountry: boolean
  handleDelete: (uuid: string) => void
}

export const UsersList = ({ showColors, sortByCountry, handleDelete, filteredUsers }: Props) => {
  const usersSortedByCountry = useMemo(() => {
    return sortByCountry ? [...filteredUsers]?.sort((a, b) => a.location.country.localeCompare(b.location.country)) : filteredUsers
  }, [sortByCountry, filteredUsers])
  
  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usersSortedByCountry.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'
          return (
            <tr key={user.login.uuid} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.title} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDelete(user.login.uuid)}>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
