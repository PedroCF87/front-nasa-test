export const throwMessage = (message: string, time: number, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    try {
      setError(message)
      setTimeout(() => { setError(null) }, time*1000)
    } catch (e) {
      setError(e.name + ': ' + e.message)
    }
}