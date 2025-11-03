import { useCustomFetch } from './hooks/useCustomFetch'
import './App.css'



interface User{
  id: number;
  name: string;
  email: string;
}

function App() {
  const {data, isPending, isError} = useCustomFetch<User>(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  if (isError) {
    return <div>Error occurred while fetching data.</div>
  }

  if (isPending) {
    return <div>loading...</div>
  }

  return <>
  <h1>Tanstack Query</h1>
  {data?.name}</>
}

export default App
