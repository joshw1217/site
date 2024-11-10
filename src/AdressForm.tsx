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

        <div className=" max-w-full max-h-full m-8 p-6 bg-[#e1e8e3] shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Join us for our big day!</h2>
            <p>Don’t worry—this isn’t a formal RSVP. It's helping us get a sense of who’ll be joining the celebration!</p>
            <div className="flex flex-col md:flex-row">
                {/* Form Section */}
                <div className="md:w-1/2 p-4">
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">How should your mail be addressed?</label>
                        <input
                            type="text"
                            placeholder="E.g. The Smith Family"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="howToAddress"
                            value={formData.howToAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
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
                    <div>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            placeholder="xxx-xxx-xxxx"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm italic font-medium text-gray-700">Number of guests in your party</label>
                        <input
                            type="number"
                            placeholder="Jane Smith, John Smith, Joe Smith"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="numGuests"
                            value={formData.numGuests}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm italic font-medium text-gray-700">How many guests are under 10 years old?</label>
                        <input
                            type="text"
                            placeholder="1"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="guestsUnderTen"
                            value={formData.guestsUnderTen}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                        <input
                            type="text"
                            placeholder="123 Main Street"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="addressLineOne"
                            value={formData.addressLineOne}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                        <input
                            type="text"
                            placeholder="Apt 2"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="addressLineTwo"
                            value={formData.addressLineTwo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City Name</label>
                        <input
                            type="text"
                            placeholder="E.g. The Smith Family"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            placeholder="CA"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                        <input
                            type="text"
                            placeholder="90210"
                            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                <div className="md:w-1/2 p-4 mt-4 md:mt-0 flex items-center justify-center">
                <img
                    src="/IMG_4345.jpg"
                    alt="Wedding"
                    className="w-full h-auto rounded-lg shadow-md"
                />
                </div>
            </div>
        </div>

    )
}

export default AddressForm
        
        