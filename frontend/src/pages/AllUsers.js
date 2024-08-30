import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className='bg-white pb-4 mt-10'>
      <div className="overflow-x-auto">
        <table className='min-w-full userTable'>
          <thead>
            <tr className='bg-black text-white'>
              <th className='px-2 py-1'>Sr.</th>
              <th className='px-2 py-1'>Name</th>
              <th className='px-2 py-1'>Email</th>
              <th className='px-2 py-1'>Role</th>
              <th className='px-2 py-1'>Created Date</th>
              <th className='px-2 py-1'>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((el, index) => (
              <tr key={el._id} className='text-center'>
                <td className='px-2 py-1'>{index + 1}</td>
                <td className='px-2 py-1'>{el?.name}</td>
                <td className='px-2 py-1'>{el?.email}</td>
                <td className='px-2 py-1'>{el?.role}</td>
                <td className='px-2 py-1'>{moment(el?.createdAt).format('LL')}</td>
                <td className='px-2 py-1'>
                  <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}>
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openUpdateRole && (
        <ChangeUserRole 
          onClose={() => setOpenUpdateRole(false)} 
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
}

export default AllUsers;











// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import { toast } from 'react-toastify'
// import moment from 'moment'
// import { MdModeEdit } from "react-icons/md";
// import ChangeUserRole from '../components/ChangeUserRole';

// const AllUsers = () => {
//     const [allUser,setAllUsers] = useState([])
//     const [openUpdateRole,setOpenUpdateRole] = useState(false)
//     const [updateUserDetails,setUpdateUserDetails] = useState({
//         email : "",
//         name : "",
//         role : "",
//         _id  : ""
//     })

//     const fetchAllUsers = async() =>{
//         const fetchData = await fetch(SummaryApi.allUser.url,{
//             method : SummaryApi.allUser.method,
//             credentials : 'include'
//         })

//         const dataResponse = await fetchData.json()

//         if(dataResponse.success){
//             setAllUsers(dataResponse.data)
//         }

//         if(dataResponse.error){
//             toast.error(dataResponse.message)
//         }

//     }

//     useEffect(()=>{
//         fetchAllUsers()
//     },[])

//   return (
//     <div className='bg-white pb-4 mt-10'>
//         <table className='w-full userTable  '>
//             <thead>
//                 <tr className='bg-black text-white '>
//                     <th>Sr.</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Created Date</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody className=''>
//                 {
//                     allUser.map((el,index) => {
//                         return(
//                             <tr>
//                                 <td>{index+1}</td>
//                                 <td>{el?.name}</td>
//                                 <td>{el?.email}</td>
//                                 <td>{el?.role}</td>
//                                 <td>{moment(el?.createdAt).format('LL')}</td>
//                                 <td>
//                                     <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
//                                     onClick={()=>{
//                                         setUpdateUserDetails(el)
//                                         setOpenUpdateRole(true)

//                                     }}
//                                     >
//                                         <MdModeEdit/>
//                                     </button>
//                                 </td>
//                             </tr>
//                         )
//                     })
//                 }
//             </tbody>
//         </table>

//         {
//             openUpdateRole && (
//                 <ChangeUserRole 
//                     onClose={()=>setOpenUpdateRole(false)} 
//                     name={updateUserDetails.name}
//                     email={updateUserDetails.email}
//                     role={updateUserDetails.role}
//                     userId={updateUserDetails._id}
//                     callFunc={fetchAllUsers}
//                 />
//             )      
//         }
//     </div>
//   )
// }

// export default AllUsers