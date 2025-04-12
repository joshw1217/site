import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import League from './League'
import Wedding from './Wedding'
import Wow from './Wow'
import Tile from './components/Tile'
import AddressForm from './AddressForm'
import Rsvp from './Rsvp'
const Landing = () => {
  return (
    <div>
      <Header />
        <div className='h-screen w-screen p-8 flex flex-col items-center'>
          <div className='h-1/2 w-full flex flex-col items-center'>
            <h1 className='text-white text-5xl'>
              Welcome to my site!
            </h1>
            <div className='flex justify-between bg-dark-blue w-full h-full rounded-lg mt-4'>

            </div>
          </div>
          <div className='h-1/2'>

          <div className='mt-4 flex justify-between w-full'>
            <Tile link='/wedding' title='Wedding' text="I'm getting married to the love of my life, Yami, this coming June! Click here to go to our wedding site."/>
            <Tile link='/wow' title='Guild' text="If you're a member of my World of Warcraft guild, click here for raiding applications."/>
            <Tile link='/league' title='League' text="If you want to see how I'm doing in my League of Legends career, click here."/>
          </div>
        </div>
      </div>
    </div>
  )
}

const App = () => {

  return (
    <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/wedding" element={<Wedding />}>
            <Route path="address" element={<AddressForm />} />
            
          </Route>
          <Route path="/wedding/rsvp" element={<Rsvp />} />
          <Route path="/wow" element={<Wow />} />
          <Route path='/league' element={<League />} />
        </Routes>
    </>
  )
}

export default App
