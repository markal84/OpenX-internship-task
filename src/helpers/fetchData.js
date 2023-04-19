export default async function fetchData(apiUrl) {
  const res = await fetch(apiUrl)

  if(!res.ok) {
    throw new Error('Data could not be fetched')
  } else {
    return res.json()
  }
}
