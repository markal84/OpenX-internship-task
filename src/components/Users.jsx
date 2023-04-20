export default function Users(props) {
  const { users } = props;

  function getDistance(lat1, lon1, lat2, lon2) {
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const earthRadius = 6371

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c

    return distance
  }

  let maxDistance = 0
  let maxUsersDistance = []

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const user1 = users[i];
      const user2 = users[j];
      const distance = getDistance(
        user1.address.geolocation.lat,
        user1.address.geolocation.long,
        user2.address.geolocation.lat,
        user2.address.geolocation.long
      )
      // console.log(`Distance between ${user1.username} and ${user2.username}: ${distance}`)
      if (distance > maxDistance) {
        maxDistance = distance;
        maxUsersDistance = [user1.username, user2.username]
      }
    }
  }

  return (
    <div>
      <p>
        Users living farthest away are: {maxUsersDistance[0]} and {maxUsersDistance[1]}
        <span> with distance: {maxDistance.toFixed(0)}</span>
      </p>
      <button type='button'>Show / hide users</button>
      {users.map((user) => {
          const { username, email, id} = user
          const { firstname, lastname } = user.name

          return (
            <div key={id}>
              <p>users</p>
           </div>
          )
      })}
    </div>
  )
}