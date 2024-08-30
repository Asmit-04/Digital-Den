import React from 'react'
import CancelImage from '../assest/CancelImage.gif'
import { Link }  from  'react-router-dom'


const Cancel = () => {
  return (
    <div>
     <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
    
    <img
    src={CancelImage}
    width={250}
    height={250}
    />
    <p className='text-purple-700 font-bold text-xl p-4'>Payment Failed!!</p>
     <Link to={"/cart"}className='p-2 px-3 mt-3 border-purple-700 rounded font-semibold text-purple-700 hover:bg-purple-700 hover:text-white'>Go back to cart😣</Link>       
  </div>
    </div>
  )
}

export default Cancel





