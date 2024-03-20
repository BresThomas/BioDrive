export default async function queryApi() {
  const response = await fetch('http://localhost:3001/hello')
  const data = await response.json()
  
  return data;
}