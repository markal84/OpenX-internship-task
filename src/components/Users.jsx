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
      <button type='button'>Show users</button>
      {users.map((user) => {
          const { username, email, id} = user
          const { firstname, lastname } = user.name

          return (
            <div key={id}>
              <p>Name: {firstname} {lastname}</p>
              <p>Username: {username} <span>Email: {email}</span></p>
           </div>
          )
      })}
    </div>
  )
}