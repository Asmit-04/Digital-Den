
import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className='bg-white'>
      <div className='py-2 px-4 flex flex-col md:flex-row justify-between items-center'>
        <h2 className='font-bold text-lg mt-6'>All Products</h2>
        <button
          className='border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white transition-all py-1 px-3 rounded-full mt-4 md:mt-4'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/** All Products */}
      <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll px-4'>
        {allProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + 'allProduct'}
            fetchdata={fetchAllProduct}
          />
        ))}
      </div>

      {/** Upload Product Component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;










// import React, { useEffect, useState } from 'react'
// import UploadProduct from '../components/UploadProduct'
// import SummaryApi from '../common'
// import AdminProductCard from '../components/AdminProductCard'

// const AllProducts = () => {
//   const [openUploadProduct,setOpenUploadProduct] = useState(false)
//   const [allProduct,setAllProduct] = useState([])

//   const fetchAllProduct = async() =>{
//     const response = await fetch(SummaryApi.allProduct.url)
//     const dataResponse = await response.json()

//     console.log("product data",dataResponse)

//     setAllProduct(dataResponse?.data || [])
//   }

//   useEffect(()=>{
//     fetchAllProduct()
//   },[])
  
//   return (
//     <div>
//         <div className='bg-white py-2 px-4 flex justify-between items-center'>
//             <h2 className='font-bold text-lg mt-6'>All Product</h2>
//             <button  className='border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
//         </div>

//         {/**all product */}
//         <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
//           {
//             allProduct.map((product,index)=>{
//               return(
//                 <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
//               )
//             })
//           }
//         </div>





//         {/**upload prouct component */}
//         {
//           openUploadProduct && (
//             <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
//           )
//         }
      

//     </div>
//   )
// }

// export default AllProducts