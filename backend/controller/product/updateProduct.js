
// const uploadProductPermission = require('../../helpers/permission');
// const productModel = require('../../models/productModel');

// // Existing update product controller
// async function updateProductController(req, res) {
//     try {
//         if (!uploadProductPermission(req.userId)) {
//             throw new Error("Permission denied");
//         }

//         const { _id, ...resBody } = req.body;
//         const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

//         res.json({
//             message: "Product updated successfully",
//             data: updateProduct,
//             success: true,
//             error: false
//         });

//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// }

// // New delete product controller
// async function deleteProductController(req, res) {
//     try {
//         if (!uploadProductPermission(req.userId)) {
//             throw new Error("Permission denied");
//         }

//         const { id } = req.params;
//         const deletedProduct = await productModel.findByIdAndDelete(id);

//         if (!deletedProduct) {
//             throw new Error("Product not found");
//         }

//         res.json({
//             message: "Product deleted successfully",
//             data: deletedProduct,
//             success: true,
//             error: false
//         });

//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// }



// async function toggleProductStatusController(req, res) {
//     try {
//         if (!uploadProductPermission(req.userId)) {
//             throw new Error("Permission denied");
//         }

//         const { id } = req.params;
//         const { isActive } = req.body;

//         const updatedProduct = await productModel.findByIdAndUpdate(
//             id,
//             { isActive },
//             { new: true } // Return the updated document
//         );

//         if (!updatedProduct) {
//             throw new Error("Product not found");
//         }

//         res.json({
//             message: "Product status updated successfully",
//             data: updatedProduct,
//             success: true,
//             error: false
//         });

//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// }

// module.exports = {
//     updateProductController,
//     deleteProductController,
//     toggleProductStatusController
// };









const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')

async function updateProductController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
        
        res.json({
            message : "Product update successfully",
            data : updateProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateProductController