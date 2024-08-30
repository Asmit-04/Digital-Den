import React, { useContext, useState } from 'react';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import DigitalDen from '../assest/DigitalDen.png'

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll('q');
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className='h-20 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='ml-0 mb-4'>
          <Link to={"/"}>
            <img
              src={DigitalDen}
              width={120}
              height={90}
              className='-ml-4 w-[15rem] h-auto md:w-[10rem] md:h-[6rem] object-contain'
              // className='-ml-4 w-[12rem]  h-auto md:w-32 md:h-16 object-contain'
              alt="DigitalDen"
            />
          </Link>
        </div>


        <div className='flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow -ml-4'> {/* pl-2 */}
  <input
    type='text'
    placeholder='Search DigitalDen'
    className='w-full outline-none text-xs md:text-base px-3'  // Added px-3 for padding
    onChange={handleSearch}
    value={search}
  />
  <div className='text-sm md:text-lg min-w-[40px] h-7 md:h-8 bg-purple-700 flex items-center justify-center rounded-r-full text-white'>
    <GrSearch />
  </div>
</div>


          

        {/* <div className='flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow -ml-4'>  
       
          <input
            type='text'
            placeholder='Search DigitalDen'
            className='w-full outline-none text-xs md:text-base'
            onChange={handleSearch}
            value={search}
          />
          <div className='text-sm md:text-lg min-w-[40px] h-7 md:h-8 bg-purple-700 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div> */}

        <div className='flex items-center gap-2 md:gap-5 ml-2'>
          <div className='relative flex justify-center'>
            {user?._id && (
              <div
                className='text-xl md:text-3xl cursor-pointer relative flex justify-center'
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    // className='w-8 h-8 md:w-10 md:h-10 rounded-full'
                      className='w-[1.7rem] h-[1.7rem] md:w-[2rem] md:h-[2rem] rounded-full'
                    alt={user?.name}
                  />
                ) : (
                  // <FaRegCircleUser className='w-8 h-8 md:w-10 md:h-10' />
                  <FaRegCircleUser className='w-[1.7rem] h-[1.7rem] md:w-[2rem] md:h-[2rem]' />
                )}
              </div>
            )}

            {/* {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-10 md:top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className='whitespace-nowrap  md:block hover:bg-slate-100 p-2'
                      onClick={() => setMenuDisplay(prev => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={'/order'}
                    className='whitespace-nowrap  md:block hover:bg-slate-100 p-2'
                    onClick={() => setMenuDisplay(prev => !prev)}
                  >
                    Order History
                  </Link>
                </nav>
              </div>
            )} */}

{menuDisplay && (
  <div className='absolute bg-white bottom-0 top-10 md:top-11 h-fit p-2 shadow-lg rounded'>
    <nav className='flex flex-col space-y-2'>
      {user?.role === ROLE.ADMIN && (
        <Link
          to={"/admin-panel/all-products"}
          className='whitespace-nowrap hover:bg-slate-100 p-2'
          onClick={() => setMenuDisplay(prev => !prev)}
        >
          Admin Panel
        </Link>
      )}
      <Link
        to={'/order'}
        className='whitespace-nowrap hover:bg-slate-100 p-2'
        onClick={() => setMenuDisplay(prev => !prev)}
      >
        Order History
      </Link>
    </nav>
  </div>
)}



          </div>

          {user?._id && (
            <Link to={"/cart"} className='text-xl md:text-2xl relative'>
              <span><FaShoppingCart /></span>
              <div className='bg-red-700 text-white w-4 h-4 md:w-5 md:h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2 md:-top-2 md:-right-3'>
                <p className='text-xs md:text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className='px-2 py-1 md:px-3 md:py-1 rounded-full text-white bg-purple-700 hover:bg-purple-800'
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className='px-2 py-1 md:px-3 md:py-1 rounded-full text-white bg-purple-700 hover:bg-purple-800'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;














// import React, { useContext, useState } from 'react'
// // import Logo from './Logo'
// import LogoN from '../assest/LogoN.jpg'
// import DigitalDen from '../assest/DigitalDen.png'
// import { GrSearch } from "react-icons/gr";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { FaShoppingCart } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify'
// import { setUserDetails } from '../store/userSlice';
// import ROLE from '../common/role';
// import Context from '../context';

// const Header = () => {
//   const user = useSelector(state => state?.user?.user)
//   const dispatch = useDispatch()
//   const [menuDisplay,setMenuDisplay] = useState(false)
//   const context = useContext(Context)
//   const navigate = useNavigate()
//   const searchInput = useLocation()
//   const URLSearch = new URLSearchParams(searchInput?.search)
//   const searchQuery = URLSearch.getAll("q")
//   const [search,setSearch] = useState(searchQuery)

//   const handleLogout = async() => {
//     const fetchData = await fetch(SummaryApi.logout_user.url,{
//       method : SummaryApi.logout_user.method,
//       credentials : 'include'
//     })

//     const data = await fetchData.json()

//     if(data.success){
//       toast.success(data.message)
//       dispatch(setUserDetails(null))
//       navigate("/")
//     }

//     if(data.error){
//       toast.error(data.message)
//     }

//   }

//   const handleSearch = (e)=>{
//     const { value } = e.target
//     setSearch(value)

//     if(value){
//       navigate(`/search?q=${value}`)
//     }else{
//       navigate("/search")
//     }
//   }
//   return (
//     <header className='h-20 shadow-md bg-white fixed w-full z-40'>
//       <div className=' h-full container mx-auto flex items-center px-4 justify-between '>
//             <div className='ml-10 mb-11'>
//                 <Link to={"/"}>
//                 <img
//                 src={DigitalDen}
//                    width={150}
//                   height={120}
//                       /> 
//                     {/* <LogoN w={90} h={50}/> */}
//                 </Link>
//             </div>

//             <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
//                 <input type='text' placeholder='Search DigitalDen' className='w-full outline-none' onChange={handleSearch} value={search}/>
//                 <div className='text-lg min-w-[50px] h-8 bg-purple-700 flex items-center justify-center rounded-r-full text-white'>
//                   <GrSearch />
//                 </div>
//             </div>


//             <div className='flex items-center gap-7'>
                
//                 <div className='relative flex justify-center'>

//                   {
//                     user?._id && (
//                       <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
//                         {
//                           user?.profilePic ? (
//                             <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
//                           ) : (
//                             <FaRegCircleUser/>
//                           )
//                         }
//                       </div>
//                     )
//                   }
                  
                  
//                   {
//                     menuDisplay && (
//                       <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
//                         <nav>
//                           {
//                             user?.role === ROLE.ADMIN && (
//                               <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
//                             )
//                           }

//                           <Link to = {'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Order History</Link>
                         
//                         </nav>
//                       </div>
//                     )
//                   }
                 
//                 </div>

//                   {
//                      user?._id && (
//                       <Link to={"/cart"} className='text-2xl relative'>
//                           <span><FaShoppingCart/></span>
      
//                           <div className='bg-red-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
//                               <p className='text-sm'>{context?.cartProductCount}</p>
//                           </div>
//                       </Link>
//                       )
//                   }
              


//                 <div>
//                   {
//                     user?._id  ? (
//                       <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-purple-700 hover:bg-purple-700'>Logout</button>
//                     )
//                     : (
//                     <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-purple-700 hover:bg-purple-700'>Login</Link>
//                     )
//                   }
                    
//                 </div>

//             </div>

//       </div>
//     </header>
//   )
// }

// export default Header