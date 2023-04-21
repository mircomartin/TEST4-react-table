export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(`https://randomuser.me/api/?results=10&seed=mir&page=${pageParam}`)
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la peticion')
      return await res.json()
    })
    .then((res) => {
      const currentPage = Number(res.info.page)
      const nextCursor =  currentPage < 3 ? currentPage + 1 : undefined
      return {
        users: res.results,
        nextCursor
      }
    })
}
