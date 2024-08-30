import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    });
    const responseData = await response.json();
    setData(responseData.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="p-3 mt-10 w-full max-w-screen-lg mx-auto">
      {!data[0] && (
        <p className="mt-6 font-bold text-2xl py-5 text-center">No Order History Available!!😣</p>
      )}

      <div className="space-y-10">
        {data.map((item, index) => (
          <div key={item.userId + index} className="bg-white shadow-lg rounded-lg p-6 border border-slate-500">
            <p className="font-bold text-2xl mb-4 text-red-600">
              Order Date: {moment(item.createdAt).format('lll')}
            </p>

            {/* Customer Name */}
            <div className="text-lg font-bold text-black">
              Customer Name: <span className="text-red-500 text-xl">{item.name}</span>
            </div>

            {/* Shipping Address */}
            <div className="text-lg font-bold text-black mt-2">
              Shipping Address:
              <div className="text-red-500">
                {item.shipping_address?.line1}, {item.shipping_address?.city}, {item.shipping_address?.state}, {item.shipping_address?.postal_code}, {item.shipping_address?.country}
              </div>
            </div>

            {/* Billing Address */}
            {/* <div className="text-lg font-bold text-black mt-2">
              Billing Address:
              <div className="text-red-500">
                {item.billing_address?.line1}, {item.billing_address?.city}, {item.billing_address?.state}, {item.billing_address?.postal_code}, {item.billing_address?.country}
              </div>
            </div> */}

            {/* Product Details */}
            <div className="border-t mt-4 pt-4 space-y-4 text-lg font-bold">
              {item?.productDetails.map((product, index) => (
                <div key={product.productId + index} className="flex flex-col lg:flex-row items-center gap-4 bg-gray-100 p-4 rounded-lg">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-28 h-28 object-contain"
                  />
                  <div className="flex-1 text-center lg:text-left">
                    <div className="text-lg font-bold text-black">{product.name}</div>
                    <div className="text-red-600 mt-1">{displayINRCurrency(product.price)}</div>
                    <p className="text-black mt-1">Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Details */}
            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-lg font-bold">
              <div className="text-lg font-bold text-black">Payment Details:</div>
              <p className="text-red-500 mt-1">Payment Type: {item.paymentDetails.payment_method_type[0]}</p>
              <p className="text-red-500 mt-1">Payment Status: {item.paymentDetails.payment_status}</p>
            </div>

            {/* Shipping Details */}
            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-lg font-bold">
              <div className="text-lg font-bold text-black">Shipping Details:</div>
              {item.shipping_options.map((shipping, index) => (
                <div key={shipping.shipping_rate} className="text-red-500 mt-1">
                  Shipping Amount: {displayINRCurrency(shipping.shipping_amount)}
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="text-2xl font-bold mt-4">
              Total Amount:
              <span className="text-red-600 ml-2">{displayINRCurrency(item.totalAmount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
























// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import moment from 'moment'
// import displayINRCurrency from '../helpers/displayCurrency'

// const OrderPage = () => {
//   const [data,setData] = useState([])

//   const fetchOrderDetails = async()=>{
//   const response =await fetch (SummaryApi.getOrder.url,{
//     method : SummaryApi.getOrder.method,
//     credentials : 'include'
//   })
// const responseData = await response.json()
// setData(responseData.data)
// console.log("order list",responseData)
//   }

//   useEffect(()=>{
//     fetchOrderDetails(0) 
//   },[])
//   return (
//     <div>
//        {
//         !data[0] && (
//           <p className='mt-6 font-bold text-2xl py-5 text-center '>No Order History Avilable!!😣</p>
//         )
//        }

//        <div className='p-4 w-full max-w-fit'>
//         {
//           data.map((item,index)=>{
//             return(
//               <div key={item.userId+index}>
//                   <p className='font-bold text-lg p-1 mb-1 mt-1 rounded-md text-slate-100 bg-purple-700 w-full max-w-fit'>Date of the order : {moment(item.createdAt).format('lll')}</p> 
//                                                                            {/* bg-green-400 */}
//                  <div className='border-2 border-black'>
//                  <div className='grid gap-1'>
  
//   {
//     item?.productDetails.map((product,index)=>{
//       return(
     
//         <div key={product.productId+index}className='flex gap-3 bg-slate-300  '>
//           <img
//            src={product.image[0]}
//            className='w-28 h-28 bg-slate-300 object-scale-down p-2'
//             />

//             <div>
//             <div className='font-medium text-lg text-ellipsis line-clamp-1 mt-6'>{product.name}</div>
//            <div className='flex items-center gap-5  mt-1'>
//             <div className='text-lg text-red-700'>{displayINRCurrency(product.price)}</div>
//             <p>Quantity : {product.quantity}</p>
//            </div>
//         </div>
//         </div>
//       )
//     })
//   }


//  </div> 
      
// <div className=' gap-4  '>
//    <div className=' bg-slate-200 p-4'>
//     <div className='text-lg font-bold ml-1'>Payment Details : </div>
//      <p className='font-medium ml-10 '>Payment Type : {item.paymentDetails.payment_method_type[0]}</p>   
//      <p className='font-medium ml-10'>Payment Status : {item.paymentDetails.payment_status}</p>                 
//     </div>
// <div  className=' bg-slate-300 pt-2 p-4  '>
// <div className='text-lg font-bold '>Shipping Details : </div>
// {
//   item.shipping_options.map((shipping,index)=>{
//     return(
//       <div key={shipping.shipping_rate} className='font-medium ml-10  '>
//         Shipping Amount : {shipping.shipping_amount}
//       </div>
//     )
//   })
// }
// </div>
// </div>       



// <div className='text-lg font-bold bg-slate-200 lg:flex-row flex flex-col pl-4 p-5  '>
//   Total Amount : 
//   <div className='font-semibold text-red-700 ml-2 '> {displayINRCurrency(item.totalAmount)}</div>
// </div>

//                  </div>

                
//             </div>
                    
//             )
//           })
//         }
//        </div>
//     </div>
//   )
// }

// export default OrderPage
