import React from 'react'
import SuccessImage from '../assest/SuccessImage.gif'
import { Link }  from  'react-router-dom'


const Success = () => {
  return (
    <div className=' w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded ' >
    
      <img
      src={SuccessImage}
      width={250}
      height={250}
      />
      <p className='text-green-600 font-bold text-xl p-4'>Payment Successful😊</p>
       <Link to={"/order"}className='p-2 px-3 mt-3 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>       
    </div>
  )
}

export default Success
