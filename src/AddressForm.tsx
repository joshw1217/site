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
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Send data to Supabase
        const client = useAdminClient()
        const { data, error } = await client
          .from('guest_forms')  
          .insert([formData]);
    
        if (error) {
          console.error('Error inserting data:', error.message);
        } else {
          console.log('Data successfully inserted:', data);
          // Optionally reset the form
          setFormData({
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
          });
        }
      };

      const isFormValid = () => {
        return Object.entries(formData).every(([key, value]) => {
          if (key === 'addressLineTwo') return true;
          return value.trim() !== '';
        });
      };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col md:flex-row max-w-full p-2 md:p-6 bg-[#F8F4EC] shadow-md rounded-lg">
            {/* Form Section */}
            <div className="md:w-1/2 flex flex-col items-start">
                <h2 className="text-6xl font-semibold mb-4 font-quentin text-center">Join Us for Our Big Day!</h2>
                <p className="mb-4">Don't worry—this isn't a formal RSVP. It's helping us get a sense of who'll be joining the celebration!</p>

                <form className="w-full p-4 space-y-4">
                {/* Form fields go here as in your original code */}
                    <div className="flex justify-between items-end">
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
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
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
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
                                required
                            />
                        </div>
                        
                        <div className="w-[45%]">
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
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
                            <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
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
                            <label className="block text-sm font-medium text-gray-700">City</label>
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
                            <label className="block text-sm font-medium text-gray-700">State</label>
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
                            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
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
                            <label className="block text-sm italic font-medium text-gray-700">Number of guests in your party</label>
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
                    className="w-full py-2 px-4 bg-slate-800 text-white rounded-md enabled:hover:bg-indigo-700 transition"
                    disabled={!isFormValid()}
                >
                    Submit
                </button>
                </form>
                
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
        
        