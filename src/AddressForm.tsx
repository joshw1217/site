import React, { useState } from "react"
import { useAdminClient } from "./utils/supabase";



const AddressForm = () => {

    const [formData, setFormData] = useState({
        howToAddress: '',
        firstName: '',
        lastName:'',
        phone:'',
        numGuests:'',
        guestsUnderTen:'',
        addressLineOne:'',
        addressLineTwo:'',
        city: '',
        state: '',
        zip: '',
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
            first_name: formData.firstName,
            last_name: formData.lastName,
            how_to_address: formData.howToAddress,
            phone: formData.phone,
            address_line_one: formData.addressLineOne,
            address_line_two: formData.addressLineTwo,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            num_guests: formData.numGuests,
            guests_under_ten: formData.guestsUnderTen
        }
        const { data, error } = await client
          .from('guest_forms')  
          .insert(insertData)
    
        if (error) {
          console.error('Error inserting data:', error.message) // TODO: add more error handling
        } else {
          setIsSubmitted(true)
        }
      }

      const isFormValid = () => {
        return Object.entries(formData).every(([key, value]) => {
          if (key === 'addressLineTwo' || key==='howToAddress' || key==='guestsUnderTen') return true;
          return value.trim() !== ''
        })
      }

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col md:flex-row max-w-full p-2 md:p-6 bg-[#F8F4EC] shadow-md rounded-lg">
            {/* Form Section */}
            <div className="md:w-1/2 flex flex-col items-start">
            
                <h2 className="text-6xl font-semibold mb-4 font-quentin text-center">Join Us for Our Big Day!</h2>
                <p className="mb-4">Don't worry—this isn't a formal RSVP. It's helping us get a sense of who'll be joining the celebration!</p>
                {isSubmitted ? (
                    <div className="bg-[#ffffff] p-6 rounded-lg shadow-md h-full text-center">
                    <h2 className="text-2xl font-semibold mb-4">You're officially on our radar!</h2>
                    <p>Thank you for filling out the form! We can't wait to share all the details about our big day with you.</p>
                    <p>With Love,</p>
                    <p>J + Y</p>
                    </div> 
                ) : (
                <form onSubmit={handleSubmit} className="w-full p-4 space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">First Name*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Last Name*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">How should your mail be addressed?</label>
                            <input
                                type="text"
                                placeholder="The Smith Family"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="howToAddress"
                                value={formData.howToAddress}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Address Line 1*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="addressLineOne"
                                value={formData.addressLineOne}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="addressLineTwo"
                                value={formData.addressLineTwo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-[30%]">
                            <label className="block text-sm font-medium text-gray-700">City*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-[30%]">
                            <label className="block text-sm font-medium text-gray-700">State*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-[30%]">
                            <label className="block text-sm font-medium text-gray-700">Zip Code*</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm italic font-medium text-gray-700">Number of guests in your party*</label>
                            <input
                                type="number"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="numGuests"
                                value={formData.numGuests}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-[45%]">
                            <label className="block text-sm italic font-medium text-gray-700">How many guests are under 10 years old?</label>
                            <input
                                type="number"
                                className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                                name="guestsUnderTen"
                                value={formData.guestsUnderTen}
                                onChange={handleChange}
                                required
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
            {/* Image Section */}
            <div className="md:w-1/2 p-4 flex items-center justify-center">
                <img
                src="/images/address_photo.jpg"
                alt="Wedding"
                className="w-full h-auto rounded-lg shadow-md"
                />
            </div>

        </div>

        </div>
    )
}

export default AddressForm
        
        