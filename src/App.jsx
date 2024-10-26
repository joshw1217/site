import { useState, useEffect } from 'react'
import { useAnonClient } from './utils/supabase'
import reactLogo from './assets/react.svg'
import './App.css'

// eslint-disable-next-line react-hooks/rules-of-hooks
const client = useAnonClient()

const App = () => {
  const [count, setCount] = useState(0)
  const [guests, setGuests] = useState([]);
  
  useEffect(() => {
    getGuests();
  }, []);

  const getGuests = async () => {

    const { data } = await client.from("guests").select();
    setGuests(data);
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Work in progress!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div className="card">
        <h3 className='underline'>Guest List</h3>
        <ul>
          {guests.map((guest) => (
            <li key={guest.primary_guests}>{guest.primary_guests}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
