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

export async function savePlayersQueue(playersArray) {
  const playerString = playersArray.map((player) => player.name).join(',')

  try {
    const response = await fetch(`${BE_URL}/players_queues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        players_queue: {
          players: playerString,
          user_id: 1,
          room_id: '0000'
        }
      })
    })

    if (response.ok) {
      return true
    } else {
      console.error('Response not ok')
      return false
    }
  } catch (error) {
    console.error('Failed to save changes:', error)
    return false
  }
}
