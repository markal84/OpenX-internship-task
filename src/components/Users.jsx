export default function Users(props) {
  const { users } = props;

  function getDistance(lat1, lon1, lat2, lon2) {
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const earthRadius = 6371;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  let maxDistance = 0;
  let maxUsersDistance = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const user1 = users[i];
      const user2 = users[j];
      const distance = getDistance(
        user1.address.geolocation.lat,
        user1.address.geolocation.long,
        user2.address.geolocation.lat,
        user2.address.geolocation.long
      );
      if (distance > maxDistance) {
        maxDistance = distance;
        maxUsersDistance = [user1.username, user2.username];
      }
    }
  }

  return (
    <section className="Section">
      <p>
        Total users: <span className="bold">{users.length}</span>
      </p>
      <br></br>
      <p>
        {" "}
        Users living farthest away:{" "}
        <span className="bold">{maxUsersDistance[0]}</span> and{" "}
        <span className="bold">{maxUsersDistance[1]}</span>
      </p>
      <p>
        {" "}
        with distance: <span className="bold">{maxDistance.toFixed(0)}km</span>
      </p>
    </section>
  );
}
