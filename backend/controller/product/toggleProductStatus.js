const uploadProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel');

async function toggleProductStatusController(req, res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        const { id } = req.params;
        const { isActive } = req.body;

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { isActive },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            throw new Error("Product not found");
        }

        res.json({
            message: "Product status updated successfully",
            data: updatedProduct,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}


module.exports = toggleProductStatusController
