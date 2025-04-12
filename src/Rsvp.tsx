import React, { useState } from "react"
import { useAdminClient } from "./utils/supabase";



const Rsvp = () => {

    const [formData, setFormData] = useState({
        partyName: '',
        attending: false,
        numGuests: 0,
        partyData: {},
        eventsAttending: {},
        comments: '',
      })
      const [isSubmitted, setIsSubmitted] = useState(false)
      const [isFullScreen, setIsFullScreen] = useState(false)
      const [pageState, setPageState] = useState('initial')
      const [guestNames, setGuestNames] = useState<string[]>([])
      const [guestDetails, setGuestDetails] = useState<{name: string, meal: string}[]>([])

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }))
      }

      const handleSubmit = async (event) => {
        event.preventDefault()
        setFormData(prev => ({...prev, partyData: guestDetails}))
    
        // Send data to Supabase
        const client = useAdminClient()
        const insertData = {
            party_name: formData.partyName,
            attending: formData.attending,
            num_guests: formData.numGuests,
            party_data: formData.partyData,
            events_attending: formData.eventsAttending,
            comments: formData.comments
        }
        const { data, error } = await client
          .from('rsvps')  
          .insert(insertData)
    
        if (error) {
          console.error('Error inserting data:', error.message) // TODO: add more error handling
        } else {
          setIsSubmitted(true)
        }
      }

    return (
        <div>
        {isSubmitted ? (
            <div className="bg-[#ffffff] p-6 rounded-lg shadow-md h-full text-center">
            <h2 className="text-2xl font-semibold mb-4">Thank you for your RSVP!</h2>
            <p>This helps us better plan for the day. no response, no food.</p>
            <p>With Love,</p>
            <p>J + Y</p>
            </div> 
        ) : (
        <div className={`p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white ${isFullScreen ? 'w-full h-full' : ''}`}>
            
            <h1>{pageState === 'accepted' ? `Welcome, ${formData.partyName}` : pageState === 'declined' ? `Thank you, ${formData.partyName}` : 'RSVP'}</h1>
            
            <form onSubmit={handleSubmit} className={isFullScreen ? 'w-full h-full flex flex-col items-center justify-center' : ''}>
                {pageState === 'initial' && (
                    <>
                        <label htmlFor="partyName" className="block mb-2">Party Name</label>
                        <input type="text" name="partyName" value={formData.partyName} onChange={handleChange} className="border p-2 rounded-md w-full" placeholder="The Wilsons"/>
                        <div className="flex gap-4 mt-4">
                            <button 
                                type="button" 
                                onClick={() => {
                                    setFormData(prev => ({...prev, attending: true}));
                                    setPageState('accepted');
                                }} 
                                className="bg-[#908277] text-white px-4 py-2 hover:bg-opacity-90 transition-all duration-300"
                            >
                                Accept with Pleasure
                            </button>
                            <button 
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({...prev, attending: false}));
                                    setPageState('declined');
                                }}
                                className="bg-[#908277] text-white px-4 py-2 hover:bg-opacity-90 transition-all duration-300"
                            >
                                Decline with Regret
                            </button>
                        </div>
                    </>
                )}
                {pageState === 'accepted' && (
                    <div className="mt-4 flex flex-col gap-4">
                        <input 
                            type="number" 
                            name="numGuests"
                            placeholder="Number of Guests"
                            value={formData.numGuests}
                            onChange={(e) => {
                                handleChange(e);
                                const num = parseInt(e.target.value, 10) || 0;
                                setGuestNames(prevNames => Array(num).fill(''));
                                setGuestDetails(Array(num).fill({name: '', meal: 'chicken'}));
                            }}
                            className="border p-2"
                        />
                        {guestDetails.map((guest, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder={`Guest ${index + 1} Name`}
                                    value={guest.name}
                                    onChange={(e) => {
                                        const newGuestDetails = [...guestDetails];
                                        newGuestDetails[index] = {...newGuestDetails[index], name: e.target.value};
                                        setGuestDetails(newGuestDetails);
                                    }}
                                    className="border p-2"
                                />
                                <div className="flex gap-4">
                                    <label>
                                        <input
                                            type="radio"
                                            name={`meal-${index}`}
                                            value="chicken"
                                            checked={guest.meal === 'chicken'}
                                            onChange={(e) => {
                                                const newGuestDetails = [...guestDetails];
                                                newGuestDetails[index] = {...newGuestDetails[index], meal: e.target.value};
                                                setGuestDetails(newGuestDetails);
                                            }}
                                        />
                                        Chicken
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`meal-${index}`}
                                            value="pork"
                                            checked={guest.meal === 'pork'}
                                            onChange={(e) => {
                                                const newGuestDetails = [...guestDetails];
                                                newGuestDetails[index] = {...newGuestDetails[index], meal: e.target.value};
                                                setGuestDetails(newGuestDetails);
                                            }}
                                        />
                                        Pork
                                    </label>
                                </div>
                            </div>
                        ))}
                        <textarea
                            name="comments"
                            placeholder="Any dietary restrictions or comments?"
                            value={formData.comments}
                            onChange={handleChange}
                            className="border p-2"
                        />
                        <button 
                            type="submit"
                            className="bg-[#908277] text-white px-4 py-2 hover:bg-opacity-90 transition-all duration-300"
                        >
                            Submit RSVP
                        </button>
                    </div>
                )}
                {pageState === 'declined' && (
                    <div className="mt-4 flex flex-col gap-4">
                        <textarea
                            name="comments"
                            placeholder="Please let us know why you are declining."
                            value={formData.comments}
                            onChange={handleChange}
                            className="border p-2"
                        />
                        <button 
                            type="submit"
                            className="bg-[#908277] text-white px-4 py-2 hover:bg-opacity-90 transition-all duration-300"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </form>
        </div>
        )}
        </div>
    )
}

export default Rsvp;
        
        