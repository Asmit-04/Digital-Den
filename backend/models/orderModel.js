
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productDetails: {
    type: Array,
    default: [],
  },
  email: {
    type: String,
    default: "",
  },
  name: {
    type: String,  // Store customer name
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
  paymentDetails: {
    paymentId: {
      type: String,
      default: "",
    },
    payment_method_type: [],
    payment_status: {
      type: String,
      default: "",
    },
  },
  shipping_address: {  // Store shipping address
    type: Object,
    default: {},
  },
  billing_address: {  // Store billing address
    type: Object,
    default: {},
  },
  shipping_options: [],
  totalAmount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;





















// const mongoose = require('mongoose')

// const orderSchema = new mongoose.Schema({

//     productDetails : {
//         type : Array,
//         default : []
//     },
//     email : {
//         type : String,
//         default: ""
//     },
//     userId : {
//         type : String,
//         default :""
//     },
//     paymentDetails : {
//         paymentId :{
//             type : String,
//             default : ""
//         },
//         payment_method_type :[],
//         payment_status : {
//             type : String,
//             default: "" 
//         }

//     },

//     shipping_options : [],
//     totalAmount : {
//         type : Number,
//             default : 0
//     }
// },{
//     timestamps :true
// })

// const orderModel = mongoose.model('order',orderSchema)

// module.exports = orderModel