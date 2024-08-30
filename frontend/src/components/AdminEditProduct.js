import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'; 
import { deleteProduct } from '../redux/productSlice'; 

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => ({ ...prev, productImage: [...prev.productImage, uploadImageCloudinary.url] }));
    };

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prev) => ({ ...prev, productImage: [...newProductImage] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (responseData.success) {
            toast.success(responseData?.message);
            onClose();
            fetchdata();
        } else {
            toast.error(responseData?.message);
        }
    };

    const handleDelete = async () => {
        try {
            // Log the constructed URL to ensure it's correct
            console.log(`${SummaryApi.deleteProduct.url}/${productData._id}`);
    
            // Perform the DELETE request with the correct URL and headers
            const response = await fetch(`${SummaryApi.deleteProduct.url}/${productData._id}`, {
                method: SummaryApi.deleteProduct.method,
                credentials: 'include',
                headers: { "content-type": "application/json" },
            });
    
            // Parse the response
            const responseData = await response.json();
    
            // Handle success or error response
            if (responseData.success) {
                toast.success(responseData?.message);
                onClose();
                fetchdata();
            } else {
                toast.error(responseData?.message);
            }
        } catch (error) {
            // Handle any errors that occurred during the fetch
            toast.error(`Failed to delete product: ${error.message}`);
        }
    };
    
    
  

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-purple-700 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='enter brand name'
                        value={data.brandName}
                        name='brandName'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>{el.label}</option>
                        ))}
                    </select>

                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {data?.productImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {data.productImage.map((el, index) => (
                                    <div className='relative group' key={index}>
                                        <img
                                            src={el}
                                            alt={el}
                                            width={80}
                                            height={80}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(el);
                                            }} 
                                        />
                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-purple-700 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-purple-700 text-xs'>*Please upload product image</p>
                        )}
                    </div>

                    <label htmlFor='price' className='mt-3'>Price :</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='enter price'
                        value={data.price}
                        name='price'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='enter selling price'
                        value={data.sellingPrice}
                        name='sellingPrice'
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='description' className='mt-3'>Description :</label>
                    <textarea
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='enter product description'
                        rows={3}
                        onChange={handleOnChange}
                        name='description'
                        value={data.description}
                    >
                    </textarea>

                    <div className='flex gap-4'>
                        <button type='submit' className='px-3 py-2 bg-purple-700 text-white mb-10 hover:bg-purple-700'>Update Product</button>
                        <button type='button' className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700' onClick={handleDelete}>Delete Product</button>
                    </div>
                </form>
            </div>

            {openFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>
    );
}

export default AdminEditProduct;










// import React, { useState } from 'react';
// import { CgClose } from "react-icons/cg";
// import productCategory from '../helpers/productCategory';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../helpers/uploadImage';
// import DisplayImage from './DisplayImage';
// import { MdDelete } from "react-icons/md";
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux'; // Import useDispatch from redux
// import { deleteProduct } from '../redux/productSlice'; // Import the deleteProduct action

// const AdminEditProduct = ({
//     onClose,
//     productData,
//     fetchdata
// }) => {
//     const dispatch = useDispatch(); // Initialize dispatch
//     const [data, setData] = useState({
//         ...productData,
//         productName: productData?.productName,
//         brandName: productData?.brandName,
//         category: productData?.category,
//         productImage: productData?.productImage || [],
//         description: productData?.description,
//         price: productData?.price,
//         sellingPrice: productData?.sellingPrice
//     });
//     const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
//     const [fullScreenImage, setFullScreenImage] = useState("");

//     const handleOnChange = (e) => {
//         const { name, value } = e.target;

//         setData((prev) => {
//             return {
//                 ...prev,
//                 [name]: value
//             };
//         });
//     };

//     const handleUploadProduct = async (e) => {
//         const file = e.target.files[0];
//         const uploadImageCloudinary = await uploadImage(file);

//         setData((prev) => {
//             return {
//                 ...prev,
//                 productImage: [...prev.productImage, uploadImageCloudinary.url]
//             };
//         });
//     };

//     const handleDeleteProductImage = async (index) => {
//         console.log("image index", index);

//         const newProductImage = [...data.productImage];
//         newProductImage.splice(index, 1);

//         setData((prev) => {
//             return {
//                 ...prev,
//                 productImage: [...newProductImage]
//             };
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch(SummaryApi.updateProduct.url, {
//             method: SummaryApi.updateProduct.method,
//             credentials: 'include',
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });

//         const responseData = await response.json();

//         if (responseData.success) {
//             toast.success(responseData?.message);
//             onClose();
//             fetchdata();
//         }

//         if (responseData.error) {
//             toast.error(responseData?.message);
//         }
//     };

//     const handleDelete = () => {
//         dispatch(deleteProduct(productData._id)) // Dispatch the delete action
//             .then(() => {
//                 toast.success('Product deleted successfully');
//                 onClose();
//                 fetchdata();
//             })
//             .catch((error) => {
//                 toast.error(`Failed to delete product: ${error.message}`);
//             });
//     };

//     return (
//         <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
//             <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
//                 <div className='flex justify-between items-center pb-3'>
//                     <h2 className='font-bold text-lg'>Edit Product</h2>
//                     <div className='w-fit ml-auto text-2xl hover:text-purple-700 cursor-pointer' onClick={onClose}>
//                         <CgClose />
//                     </div>
//                 </div>

//                 <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
//                     <label htmlFor='productName'>Product Name :</label>
//                     <input
//                         type='text'
//                         id='productName'
//                         placeholder='enter product name'
//                         name='productName'
//                         value={data.productName}
//                         onChange={handleOnChange}
//                         className='p-2 bg-slate-100 border rounded'
//                         required
//                     />

//                     <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
//                     <input
//                         type='text'
//                         id='brandName'
//                         placeholder='enter brand name'
//                         value={data.brandName}
//                         name='brandName'
//                         onChange={handleOnChange}
//                         className='p-2 bg-slate-100 border rounded'
//                         required
//                     />

//                     <label htmlFor='category' className='mt-3'>Category :</label>
//                     <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
//                         <option value={""}>Select Category</option>
//                         {
//                             productCategory.map((el, index) => {
//                                 return (
//                                     <option value={el.value} key={el.value + index}>{el.label}</option>
//                                 )
//                             })
//                         }
//                     </select>

//                     <label htmlFor='productImage' className='mt-3'>Product Image :</label>
//                     <label htmlFor='uploadImageInput'>
//                         <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
//                             <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
//                                 <span className='text-4xl'><FaCloudUploadAlt /></span>
//                                 <p className='text-sm'>Upload Product Image</p>
//                                 <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
//                             </div>
//                         </div>
//                     </label>
//                     <div>
//                         {
//                             data?.productImage[0] ? (
//                                 <div className='flex items-center gap-2'>
//                                     {
//                                         data.productImage.map((el, index) => {
//                                             return (
//                                                 <div className='relative group' key={index}>
//                                                     <img
//                                                         src={el}
//                                                         alt={el}
//                                                         width={80}
//                                                         height={80}
//                                                         className='bg-slate-100 border cursor-pointer'
//                                                         onClick={() => {
//                                                             setOpenFullScreenImage(true);
//                                                             setFullScreenImage(el);
//                                                         }} />

//                                                     <div className='absolute bottom-0 right-0 p-1 text-white bg-purple-700 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
//                                                         <MdDelete />
//                                                     </div>
//                                                 </div>

//                                             )
//                                         })
//                                     }
//                                 </div>
//                             ) : (
//                                 <p className='text-purple-700 text-xs'>*Please upload product image</p>
//                             )
//                         }

//                     </div>

//                     <label htmlFor='price' className='mt-3'>Price :</label>
//                     <input
//                         type='number'
//                         id='price'
//                         placeholder='enter price'
//                         value={data.price}
//                         name='price'
//                         onChange={handleOnChange}
//                         className='p-2 bg-slate-100 border rounded'
//                         required
//                     />

//                     <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
//                     <input
//                         type='number'
//                         id='sellingPrice'
//                         placeholder='enter selling price'
//                         value={data.sellingPrice}
//                         name='sellingPrice'
//                         onChange={handleOnChange}
//                         className='p-2 bg-slate-100 border rounded'
//                         required
//                     />

//                     <label htmlFor='description' className='mt-3'>Description :</label>
//                     <textarea
//                         className='h-28 bg-slate-100 border resize-none p-1'
//                         placeholder='enter product description'
//                         rows={3}
//                         onChange={handleOnChange}
//                         name='description'
//                         value={data.description}
//                     >
//                     </textarea>

//                     <div className='flex gap-4'>
//                         <button type='submit' className='px-3 py-2 bg-purple-700 text-white mb-10 hover:bg-purple-700'>Update Product</button>
//                         <button type='button' className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700' onClick={handleDelete}>Delete Product</button>
//                     </div>
//                 </form>
//             </div>

//             {/***display image full screen */}
//             {
//                 openFullScreenImage && (
//                     <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
//                 )
//             }

//         </div>
//     );
// }

// export default AdminEditProduct;












// import React, { useState } from 'react';
// import { CgClose } from "react-icons/cg";
// import productCategory from '../helpers/productCategory';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../helpers/uploadImage';
// import DisplayImage from './DisplayImage';
// import { MdDelete } from "react-icons/md";
// import { toast } from 'react-toastify';
// import SummaryApi from '../common';
// import { useDispatch } from 'react-redux'; // Import useDispatch
// import { deleteProduct } from '../redux/productSlice'; // Import deleteProduct action

// const AdminEditProduct = ({
//     onClose,
//     productData,
//     fetchdata
// }) => {
//     const [data, setData] = useState({
//         ...productData,
//         productName: productData?.productName,
//         brandName: productData?.brandName,
//         category: productData?.category,
//         productImage: productData?.productImage || [],
//         description: productData?.description,
//         price: productData?.price,
//         sellingPrice: productData?.sellingPrice
//     });
//     const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
//     const [fullScreenImage, setFullScreenImage] = useState("");

//     const dispatch = useDispatch(); // Initialize dispatch

//     const handleOnChange = (e) => {
//         const { name, value } = e.target;

//         setData((prev) => {
//             return {
//                 ...prev,
//                 [name]: value
//             };
//         });
//     };

//     const handleUploadProduct = async (e) => {
//         const file = e.target.files[0];
//         const uploadImageCloudinary = await uploadImage(file);

//         setData((prev) => {
//             return {
//                 ...prev,
//                 productImage: [...prev.productImage, uploadImageCloudinary.url]
//             };
//         });
//     };

//     const handleDeleteProductImage = async (index) => {
//         console.log("image index", index);

//         const newProductImage = [...data.productImage];
//         newProductImage.splice(index, 1);

//         setData((prev) => {
//             return {
//                 ...prev,
//                 productImage: [...newProductImage]
//             };
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch(SummaryApi.updateProduct.url, {
//             method: SummaryApi.updateProduct.method,
//             credentials: 'include',
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });

//         const responseData = await response.json();

//         if (responseData.success) {
//             toast.success(responseData?.message);
//             onClose();
//             fetchdata();
//         }

//         if (responseData.error) {
//             toast.error(responseData?.message);
//         }
//     };

//     const handleDeleteProduct = () => {
//         // Dispatch deleteProduct action
//         dispatch(deleteProduct(productData._id))
//             .unwrap()
//             .then(() => {
//                 toast.success('Product deleted successfully');
//                 onClose();
//                 fetchdata();
//             })
//             .catch((error) => {
//                 toast.error(`Failed to delete product: ${error}`);
//             });
//     };

//     return (
//         <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
//             <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
//                 <div className='flex justify-between items-center pb-3'>
//                     <h2 className='font-bold text-lg'>Edit Product</h2>
//                     <div className='w-fit ml-auto text-2xl hover:text-purple-700 cursor-pointer' onClick={onClose}>
//                         <CgClose />
//                     </div>
//                 </div>

//                 <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
//                     <label htmlFor='productName'>Product Name :</label>
//                     <input
//                         type='text'
//                         id='productName'
//                         placeholder='enter product name'
//                         name='productName'
//                         value={data.productName}
//                         onChange={handleOnChange}
//                         className='p-2 bg-slate-100 border rounded'
//                         required
//                     />

//                     <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
//                     <input
//                         type='text'
//                         id='brandName'
//                         placeholder='enter brand name'
//                         value={data.brandName}
//                         name='brandName'
//                         onChange={handleOnChange}
//                         className='p-2 bg-slate-100 border rounded'
//                         required
//                     />

//                     <label htmlFor='category' className='mt-3'>Category :</label>
//                     <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
//                         <option value={""}>Select Category</option>
//                         {
//                             productCategory.map((el, index) => {
//                                 return (
//                                     <option value={el.value} key={el.value + index}>{el.label}</option>
//                                 );
//                             })
//                         }
//                     </select>

//                     <label htmlFor='productImage' className='mt-3'>Product Image :</label>
//                     <label htmlFor='uploadImageInput'>
//                         <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
//                             <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
//                                 <span className='text-4xl'><FaCloudUploadAlt /></span>
//                                 <p className='text-sm'>Upload Product Image</p>
//                                 <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
//                             </div>
//                         </div>
//                     </label>
//                     <div>
//                         {
//                             data?.productImage[0] ? (
//                                 <div className='flex items-center gap-2'>
//                                     {
//                                         data.productImage.map((el, index) => {
//                                             return (
//                                                 <div className='relative group' key={index}>
//                                                     <img
//                                                         src={el}
//                                                         alt={el}
//                                                         width={80}
//                                                         height={80}
//                                                         className='bg-slate-100 border cursor-pointer'
//                                                         onClick={() => {
//                                                             setOpenFullScreenImage(true);
//                                                             setFullScreenImage(el);
//                                                         }} />

//                                                     <div className='absolute bottom-0 right-0 p-1 text-white bg-purple-700 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
//                                                         <MdDelete />
//                                                     </div>
//                                                 </div>

//                                             );
//                                         })
//                                     }
//                                 </div>
//                             ) : (
//                                 <p className='text-purple-700 text-xs'>*Please upload product image</p>
//                             )
//                         }

//                     </div>

//                     <label htmlFor='price' className='mt-3'>Price :</label>
//                     <input
//                         type='number'
//                         id='price'
//                         placeholder='enter price'
//                         value={data.price}
//                         name='price'
//                         onChange={handleOnChange}
//                         className='p-2 bg-slate-100 border rounded'
//                         required
//                     />

//                     <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
//                     <input
//                         type='number'
//                         id='sellingPrice'
//                         placeholder='enter selling price'
//                         value={data.sellingPrice}
//                         name='sellingPrice'
//                         onChange={handleOnChange}
//                         className='p-2 bg-slate-100 border rounded'
//                         required
//                     />

//                     <label htmlFor='description' className='mt-3'>Description :</label>
//                     <textarea
//                         className='h-28 bg-slate-100 border resize-none p-1'
//                         placeholder='enter product description'
//                         rows={3}
//                         onChange={handleOnChange}
//                         name='description'
//                         value={data.description}
//                     >
//                     </textarea>

//                     <button className='px-3 py-2 bg-purple-700 text-white mb-10 hover:bg-purple-700'>Update Product</button>
//                 </form>

//                 <button className='px-3 py-2 bg-red-700 text-white hover:bg-red-800' onClick={handleDeleteProduct}>
//                     Delete Product
//                 </button>

//             </div>

//             {/* Display image full screen */}
//             {
//                 openFullScreenImage && (
//                     <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
//                 )
//             }

//         </div>
//     );
// };

// export default AdminEditProduct;




// import React, { useState } from 'react'
// import { CgClose } from "react-icons/cg";
// import productCategory from '../helpers/productCategory';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../helpers/uploadImage';
// import DisplayImage from './DisplayImage';
// import { MdDelete } from "react-icons/md";
// import SummaryApi from '../common';
// import {toast} from 'react-toastify'

// const AdminEditProduct = ({
//     onClose,
//     productData,
//     fetchdata
//   }) => {

//   const [data,setData] = useState({
//     ...productData,
//     productName : productData?.productName,
//     brandName : productData?.brandName,
//     category : productData?.category,
//     productImage : productData?.productImage || [],
//     description : productData?.description,
//     price : productData?.price,
//     sellingPrice : productData?.sellingPrice
//   })
//   const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
//   const [fullScreenImage,setFullScreenImage] = useState("")


//   const handleOnChange = (e)=>{
//       const { name, value} = e.target

//       setData((preve)=>{
//         return{
//           ...preve,
//           [name]  : value
//         }
//       })
//   }

//   const handleUploadProduct = async(e) => {
//     const file = e.target.files[0]
//     const uploadImageCloudinary = await uploadImage(file)

//     setData((preve)=>{
//       return{
//         ...preve,
//         productImage : [ ...preve.productImage, uploadImageCloudinary.url]
//       }
//     })
//   }

//   const handleDeleteProductImage = async(index)=>{
//     console.log("image index",index)
    
//     const newProductImage = [...data.productImage]
//     newProductImage.splice(index,1)

//     setData((preve)=>{
//       return{
//         ...preve,
//         productImage : [...newProductImage]
//       }
//     })
    
//   }


//   {/**upload product */}
//   const handleSubmit = async(e) =>{
//     e.preventDefault()
    
//     const response = await fetch(SummaryApi.updateProduct.url,{
//       method : SummaryApi.updateProduct.method,
//       credentials : 'include',
//       headers : {
//         "content-type" : "application/json"
//       },
//       body : JSON.stringify(data)
//     })

//     const responseData = await response.json()

//     if(responseData.success){
//         toast.success(responseData?.message)
//         onClose()
//         fetchdata()
//     }


//     if(responseData.error){
//       toast.error(responseData?.message)
//     }
  

//   }

//   return (
//     <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
//     <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

//          <div className='flex justify-between items-center pb-3'>
//              <h2 className='font-bold text-lg'>Edit Product</h2>
//              <div className='w-fit ml-auto text-2xl hover:text-purple-700 cursor-pointer' onClick={onClose}>
//                  <CgClose/>
//              </div>
//          </div>

//        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
//          <label htmlFor='productName'>Product Name :</label>
//          <input 
//            type='text' 
//            id='productName' 
//            placeholder='enter product name' 
//            name='productName'
//            value={data.productName} 
//            onChange={handleOnChange}
//            className='p-2 bg-slate-100 border rounded'
//            required
//          />


//          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
//          <input 
//            type='text' 
//            id='brandName' 
//            placeholder='enter brand name' 
//            value={data.brandName} 
//            name='brandName'
//            onChange={handleOnChange}
//            className='p-2 bg-slate-100 border rounded'
//            required
//          />

//            <label htmlFor='category' className='mt-3'>Category :</label>
//            <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
//                <option value={""}>Select Category</option>
//                {
//                  productCategory.map((el,index)=>{
//                    return(
//                      <option value={el.value} key={el.value+index}>{el.label}</option>
//                    )
//                  })
//                }
//            </select>

//            <label htmlFor='productImage' className='mt-3'>Product Image :</label>
//            <label htmlFor='uploadImageInput'>
//            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
//                      <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
//                        <span className='text-4xl'><FaCloudUploadAlt/></span>
//                        <p className='text-sm'>Upload Product Image</p>
//                        <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
//                      </div>
//            </div>
//            </label> 
//            <div>
//                {
//                  data?.productImage[0] ? (
//                      <div className='flex items-center gap-2'>
//                          {
//                            data.productImage.map((el,index)=>{
//                              return(
//                                <div className='relative group'>
//                                    <img 
//                                      src={el} 
//                                      alt={el} 
//                                      width={80} 
//                                      height={80}  
//                                      className='bg-slate-100 border cursor-pointer'  
//                                      onClick={()=>{
//                                        setOpenFullScreenImage(true)
//                                        setFullScreenImage(el)
//                                      }}/>

//                                      <div className='absolute bottom-0 right-0 p-1 text-white bg-purple-700 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
//                                        <MdDelete/>  
//                                      </div>
//                                </div>
                               
//                              )
//                            })
//                          }
//                      </div>
//                  ) : (
//                    <p className='text-purple-700 text-xs'>*Please upload product image</p>
//                  )
//                }
               
//            </div>

//            <label htmlFor='price' className='mt-3'>Price :</label>
//            <input 
//              type='number' 
//              id='price' 
//              placeholder='enter price' 
//              value={data.price} 
//              name='price'
//              onChange={handleOnChange}
//              className='p-2 bg-slate-100 border rounded'
//              required
//            />


//            <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
//            <input 
//              type='number' 
//              id='sellingPrice' 
//              placeholder='enter selling price' 
//              value={data.sellingPrice} 
//              name='sellingPrice'
//              onChange={handleOnChange}
//              className='p-2 bg-slate-100 border rounded'
//              required
//            />

//            <label htmlFor='description' className='mt-3'>Description :</label>
//            <textarea 
//              className='h-28 bg-slate-100 border resize-none p-1' 
//              placeholder='enter product description' 
//              rows={3} 
//              onChange={handleOnChange} 
//              name='description'
//              value={data.description}
//            >
//            </textarea>





//            <button className='px-3 py-2 bg-purple-700 text-white mb-10 hover:bg-purple-700'>Update Product</button>
//        </form> 



   
//     </div>



//     {/***display image full screen */}
//     {
//      openFullScreenImage && (
//        <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
//      )
//     }
     

//  </div>
//   )
// }

// export default AdminEditProduct