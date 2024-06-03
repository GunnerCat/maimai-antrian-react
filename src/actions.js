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
  const userId = localStorage.getItem('id')
  const roomId = '0000'
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
          user_id: userId,
          room_id: roomId
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

export async function signUp(name) {
  try {
    const response = await fetch(`${BE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          name
        }
      })
    })
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.error('Response not ok')
      return false
    }
  } catch (error) {
    console.error('Failed to signUp', error)
    return false
  }
}
