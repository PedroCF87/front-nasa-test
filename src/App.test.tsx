import { api } from './utils/services/index'

test('renders fox bit nasa test', async () => {
  
  const testData = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`
  const data = btoa(testData)
  const response =  await api('input-data', { data })  
  expect(response.result).toEqual(["1 3 N", "5 1 E"])

})
