import axios from 'axios'
import { mutations } from './store/store'

export async function getCurrentUser() {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/auth/current-user',
      {
        withCredentials: true
      }
    )

    if (response.data && response.data.user) {
      mutations.setUser(response.data.user)
      return response.data.user
    } else {
      mutations.setUser(null)
      return null
    }
  } catch (error) {
    mutations.setUser(null)
    return null
  }
}
