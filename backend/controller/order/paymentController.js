const { request, response } = require('express')
const stripe =require('../../config/stripe')
const userModel = require('../../models/userModel')

const paymentController = async (request, response) => {
    try {
      const { cartItems } = request.body;
      const user = await userModel.findOne({ _id: request.userId });
  
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'required',  // Ensure billing address is collected
        shipping_address_collection: {           // Collect shipping address
          allowed_countries: ['IN'],             // Restrict to specific countries if needed
        },
        shipping_options: [
          {
            shipping_rate: 'shr_1PNuuDSGYRNWiy1yO7KBjegr', // Your shipping rate ID
          }
        ],
        customer_email: user.email,
        metadata: {
          userId: request.userId,
        },
        line_items: cartItems.map((item) => ({
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        })),
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      };
  
      const session = await stripe.checkout.sessions.create(params);
      response.status(303).json(session);
    } catch (error) {
      response.json({
        message: error?.message || error,
        error: true,
        success: false,
      });
    }
  };
  


  module.exports = paymentController
































// const { request, response } = require('express')
// const stripe =require('../../config/stripe')
// const userModel = require('../../models/userModel')

// const paymentController = async(request,response)=>{
//      try{
//           const { cartItems } =request.body
//       //   console.log("cartItems",cartItems)
//           const user =await userModel.findOne({ _id : request.userId})
//           const params = {
//                         submit_type : 'pay',
//                         mode :  "payment",
//                         payment_method_types : ['card'],
//                         billing_address_collection :'auto',
//                         // shipping_address_collection :'auto',

//                         shipping_options : [
//                            {
//                             // shipping_rate : 'shr_1POe4dSGYRNWiy1yLJUDkPKj'    //usd
//                             shipping_rate : 'shr_1PNuuDSGYRNWiy1yO7KBjegr'
//                            }
//                                            ],
//                                         //    address: {
//                                         //     line1: '510 Townsend St',
//                                         //     postal_code: '98140',
//                                         //     city: 'San Francisco',
//                                         //     state: 'CA',
//                                         //     country: 'US',
//                                         //   },
//                     customer_email : user.email,
//                     metadata : {
//                         userId : request.userId
//                     },
                    
                   
                   
//                     line_items : cartItems.map((item,index)=>{
//                         return{
                           
//                             price_data :{
//                                 currency : "inr",
//                              product_data : {
//                                  name : item.productId.productName,
//                                  images : item.productId.productImage,
//                                  metadata : {
//                                     productId : item.productId._id
//                                             }
//                                                },
//                                 unit_amount : item.productId.sellingPrice * 100
//                             },
//                             // address: {
//                             //     line1: '510 Townsend St',
//                             //     postal_code: '98140',
//                             //     city: 'San Francisco',
//                             //     state: 'CA',
//                             //     country: 'US',
//                             //   },
//                             adjustable_quantity : {
//                                 enabled : true,
//                                 minimum : 1
//                             },
//                             quantity : item. quantity
//                         }
//                     }),
//                     success_url : `${process.env.FRONTEND_URL}/success`,
//                     cancel_url :  `${process.env.FRONTEND_URL}/cancel`,
//                         }
//                         const session = await stripe.checkout.sessions.create(params)
//                                   response.status(303).json(session)
//               } 


//      catch(error){
//         response.json({
//             message : error?.message || error,
//             error : true,
//             success : false,
//         })
 
//      }

// }

// // const paymentIntent = await stripe.paymentIntents.create({
// //     description: 'Software development services',
// //     shipping: {
// //       name: 'Jenny Rosen',
// //       address: {
// //         line1: '510 Townsend St',
// //         postal_code: '98140',
// //         city: 'San Francisco',
// //         state: 'CA',
// //         country: 'US',
// //       }
// //     });


// //new
// // const customer = await stripe.customers.create({
// //     name: 'Jenny Rosen',
// //     address: {
// //       line1: '510 Townsend St',
// //       postal_code: '98140',
// //       city: 'San Francisco',
// //       state: 'CA',
// //       country: 'US',
// //     },
// //   });

// module.exports = paymentController