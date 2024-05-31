const BE_URL = import.meta.env.VITE_BE_URL

export async function fetchPlayersQueues() {
  try {
    const response = await fetch(`${BE_URL}/players_queues`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching players_queues:', error)
  }
}
