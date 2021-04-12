import axios from 'axios'

export const api = async (target: string, data: any) => {
  try {      
      const response = await axios({
        method: 'post',
        headers: {    
            'crossDomain': true,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        url: `${process.env.REACT_APP_API_URL}/${target}`,
        data: data
      })
      .then((respAxios) => respAxios.data)
      .catch((error) => {
        return { error: error.response.data.error }
      })

      return response
    
    } catch (error) {

      console.log(">> Axios API > Catch Error: ", error)
      
      return error.message
    }
  }