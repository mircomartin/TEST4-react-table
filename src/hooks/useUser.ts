import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import { type User } from '../types'

export const useUser = () => {

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor?: number; users: User[] }>(
    ['users'], // la key de la query
    fetchUsers, // como traer los datos
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor // como traer la siguiente pagina
    }
  )

  return {
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage
  }
}
