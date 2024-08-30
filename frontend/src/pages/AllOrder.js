import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const AllOrder = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: 'include'
      });
      const responseData = await response.json();
      setData(responseData.data);
    };
  
    useEffect(() => {
      fetchOrderDetails();
    }, []);
  
    return (
      <div className="p-3 mt-10 w-full max-w-screen-lg mx-auto h-[calc(100vh-190px)] overflow-y-scroll">
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
}

export default AllOrder

