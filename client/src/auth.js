import axios from 'axios'
import { mutations } from './store/store'

export async function getCurrentUser() {
  try {
    console.log('Getting current user')
    const response = await axios.get(
      'http://localhost:3000/api/auth/current-user',
      {
        withCredentials: true
      }
    )
    console.log('Current user:', response.data)

    if (response.data && response.data.user) {
      mutations.setUser(response.data.user)
      return response.data.user
    } else {
      mutations.setUser(null)
      return null
    }
  } catch (error) {
    console.error('Error fetching current user:', error)
    mutations.setUser(null)
    return null
  }
}
