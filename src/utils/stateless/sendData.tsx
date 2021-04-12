import { api } from '../services/index'

export const sendData = async (data: string) => {
    try {
      return await api('input-data', { data })
    } catch (e) {
      return e.message
    }
}