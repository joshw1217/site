import React, { useState, useEffect } from "react"
import { useAdminClient } from "./utils/supabase";



const Rsvp = () => {

    const [formData, setFormData] = useState({
        partyName: '',
        attending: false,
        numGuests: 0,
        partyData: {},
        comments: '',
      })
      const [isSubmitted, setIsSubmitted] = useState(false)
      const [isFullScreen, setIsFullScreen] = useState(false)
      const [pageState, setPageState] = useState('initial')
      const [guestNames, setGuestNames] = useState<string[]>([])
      const [guestDetails, setGuestDetails] = useState<{name: string, meal: string, options: {ceremony: boolean, dinner: boolean, reception: boolean}}[]>([])
      const [errorMessage, setErrorMessage] = useState('');

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }))
      }

      const handleSubmit = async (event) => {
        event.preventDefault()
        if (guestDetails.some(guest => !guest.name.trim())) {
            setErrorMessage('Please enter all guest names before submitting.');
            return;
        }
        setErrorMessage('');
        setFormData(prev => ({...prev, partyData: guestDetails}))
    
        // Send data to Supabase
        const client = useAdminClient()
        const insertData = {
            party_name: formData.partyName,
            attending: formData.attending,
            num_guests: formData.numGuests,
            party_data: guestDetails,
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

      useEffect(() => {
      }, [formData]);

    return (
        <div>
            <div className="absolute top-6 left-6">
                <a href="/wedding" className="bg-[#908277] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300 flex items-center">
                    <img src="/images/arrow.svg" alt="Back" className="mr-2 w-[10%]" />
                    Back to Wedding Site
                </a>
            </div>
            {isSubmitted ? (
                <div className={`p-8 bg-white min-h-screen flex flex-col items-center justify-center overflow-hidden ${isFullScreen ? 'w-full h-full' : ''}`}>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Thank you for your RSVP!</h2>
                    <p className="text-center">This helps us better plan for the day.</p>
                    <p className="text-center">With Love,</p>
                    <p className="text-center">J + Y</p>
                </div> 
            ) : (
            <div className={`p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white ${isFullScreen ? 'w-full h-full' : ''}`}>
                
                <h1>{pageState === 'accepted' ? `WELCOME, ${formData.partyName}` : pageState === 'declined' ? `Thank you, ${formData.partyName}` : `RSVP TO JOSH AND YAMI'S WEDDING`}</h1>
                
                <form onSubmit={handleSubmit} className={isFullScreen ? 'w-full h-full flex flex-col items-center justify-center' : ''}>
                    {pageState === 'initial' && (
                        <>
                            <label htmlFor="partyName" className="block mb-2 mt-4">ENTER YOUR NAME</label>
                            <input type="text" name="partyName" value={formData.partyName} onChange={handleChange} className="border p-2 rounded-md w-full" placeholder="Josh Wilson"/>
                            <div className="flex gap-4 mt-4">
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        if (!formData.partyName.trim()) {
                                            setErrorMessage('Please enter your name before proceeding.');
                                            return;
                                        }
                                        setErrorMessage('');
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
                                        if (!formData.partyName.trim()) {
                                            setErrorMessage('Please enter your name before proceeding.');
                                            return;
                                        }
                                        setErrorMessage('');
                                        setFormData(prev => ({...prev, attending: false}));
                                        setPageState('declined');
                                    }}
                                    className="bg-[#908277] text-white px-4 py-2 hover:bg-opacity-90 transition-all duration-300"
                                >
                                    Decline with Regret
                                </button>
                            </div>
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        </>
                    )}
                    {pageState === 'accepted' && (
                        <div className="mt-4 flex flex-col gap-4">
                            <label className="ftext-xl">How many are in your party? (including yourself)</label>
                            <label className="italic text-sm">Please enter the same number as your RSVP card</label>
                            <input 
                                type="number" 
                                name="numGuests"
                                placeholder="Number of Guests"
                                value={formData.numGuests}
                                onChange={(e) => {
                                    handleChange(e);
                                    const num = parseInt(e.target.value, 10) || 0;
                                    setGuestNames(Array(num).fill(''));
                                    setGuestDetails(Array(num).fill({name: '', meal: 'chicken', options: {ceremony: true, dinner: true, reception: true}}));
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
                                    <label className="font-semibold">Meal Selection</label>
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
                                            <span style={{ marginLeft: '8px' }}>Chicken</span>
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
                                            <span style={{ marginLeft: '8px' }}>Pork</span>
                                        </label>
                                    </div>
                                    <label className="font-semibold">Attending Events</label>
                                    <div className="flex gap-4">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={guest.options.ceremony}
                                                onChange={(e) => {
                                                    const newGuestDetails = [...guestDetails];
                                                    newGuestDetails[index] = {...newGuestDetails[index], options: {...newGuestDetails[index].options, ceremony: e.target.checked}};
                                                    setGuestDetails(newGuestDetails);
                                                }}
                                            />
                                            <span style={{ marginLeft: '8px' }}>Ceremony</span>
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={guest.options.dinner}
                                                onChange={(e) => {
                                                    const newGuestDetails = [...guestDetails];
                                                    newGuestDetails[index] = {...newGuestDetails[index], options: {...newGuestDetails[index].options, dinner: e.target.checked}};
                                                    setGuestDetails(newGuestDetails);
                                                }}
                                            />
                                            <span style={{ marginLeft: '8px' }}>Dinner</span>
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={guest.options.reception}
                                                onChange={(e) => {
                                                    const newGuestDetails = [...guestDetails];
                                                    newGuestDetails[index] = {...newGuestDetails[index], options: {...newGuestDetails[index].options, reception: e.target.checked}};
                                                    setGuestDetails(newGuestDetails);
                                                }}
                                            />
                                            <span style={{ marginLeft: '8px' }}>Reception</span>
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
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
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
        
        