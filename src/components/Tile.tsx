import React from "react"
import { Link } from 'react-router-dom';


const Tile = ({ title, text, link }) => {


    return(
        <Link to={link} className='block p-6 bg-light-blue w-[30%] h-60 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-white'>
            <h3 className='mb-4 text-dark-blue text-xl font-semibold underline italic'>
                {title}
            </h3>
            <p>
                {text}
            </p>
        </Link>

    )
}

export default Tile