import React, { useState } from "react"
import Header from "./components/Header"
import { useAdminClient } from "./utils/supabase"


const Wow = () => {

    const [formData, setFormData] = useState({
        characterName: '',
        spec:'',
        warcraftLogs: '',
        knownAs: '',
        availability: '',
        timeZone: '',
        preferredDays: '',
        preferredTimes: '',
      })
      const [isSubmitted, setIsSubmitted] = useState(false)

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }))
      }

      const handleSubmit = async (event) => {
        event.preventDefault()
    
        // Send data to Supabase
        const client = useAdminClient()
        const insertData = {
            character_name: formData.characterName,
            spec: formData.spec,
            warcraft_logs: formData.warcraftLogs,
            known_as: formData.knownAs,
            availability: formData.availability,
            time_zone: formData.timeZone,
            preferred_days: formData.preferredDays,
            preferred_times: formData.preferredTimes
        }
        const { error } = await client
          .from('raid_applications')  
          .insert(insertData)
    
        if (error) {
          console.error('Error inserting data:', error.message) // TODO: add more error handling
        } else {
          setIsSubmitted(true)
        }
      }

      const isFormValid = () => {
        return Object.entries(formData).every(([key, value]) => {
          if (key ==='knownAs' || key==='preferredDays' || key==='preferredTimes') return true;
          return value.trim() !== ''
        })
      }

    return (
        <div className="min-h-screen overflow-hidden bg-[url('/images/ashenvale-wow.jpg')] bg-cover bg-center">
            <Header />
            <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row max-w-full p-2 md:p-6 bg-neutral-200 shadow-md rounded-lg">
            {/* Form Section */}
            <div className="flex flex-col items-start">
            
                <h2 className="text-6xl font-semibold mb-4 text-center">Welcome JUICERS</h2>
                <p className="mb-4">This is an application to the formal raid team of NinetyNineParse, a guild lead by Decimus/Josh</p>
                {isSubmitted ? (
                    <div className="bg-[#ffffff] p-6 rounded-lg shadow-md h-full text-center">
                    <h2 className="text-2xl font-semibold mb-4">Application received</h2>
                    <p>Thanks for filling out the application, be sure to keep an eye on the discord for further communication</p>
                    <p>With Love,</p>
                    <p>The NinetyNine</p>
                    </div> 
                ) : (
                <form onSubmit={handleSubmit} className="w-full p-4 space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Character Name*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="characterName"
                                placeholder="Decimus"
                                value={formData.characterName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">How would you like to be referred to?</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="knownAs"
                                placeholder="Josh"
                                value={formData.knownAs}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Class and Spec*</label>
                            <input
                                type="text"
                                placeholder="Warrior - Prot"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="spec"
                                value={formData.spec}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">WarcraftLogs link for your character*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="warcraftLogs"
                                value={formData.warcraftLogs}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Availability*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="availability"
                                placeholder="M-F, 5pm till midnight"
                                value={formData.availability}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Time zone*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="timeZone"
                                placeholder="Mountain Time (MST)"
                                value={formData.timeZone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Preferred Days</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="preferredDays"
                                placeholder="Tuesday and Saturday"
                                value={formData.preferredDays}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Preferred Times</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="preferredTimes"
                                placeholder="6pm start, no preferred end time"
                                value={formData.preferredTimes}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-slate-400 enabled:bg-slate-800 text-white rounded-md enabled:hover:bg-indigo-700 transition"
                    disabled={!isFormValid()}
                >
                    Submit
                </button>
                </form>
            )}
            </div>

        </div>
            </div>
        </div>
    )
}

export default Wow