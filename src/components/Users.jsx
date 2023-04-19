import { useState, useEffect } from 'react'
import fetchData from '../helpers/fetchData'
import { usersUrl } from '../globals/apisURL'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchData(usersUrl)
      .then((res) => {
        setUsers(res)
      })
      .catch((error) => {
        console.log(error.message);
      })
  }, [])

  return (
    <div>
      
    </div>
  )
}