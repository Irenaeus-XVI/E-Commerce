import { orderModel } from '../../../../database/models/order.model.js'
import { cartModel } from '../../../../database/models/cart.model.js'
import { productModel } from '../../../../database/models/product.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';




const createCashOrder = handleAsyncError(async (req, res, next) => {

    //NOTE - get cart (cartId)
    const cart = await cartModel.findById(req.params.id)

    !cart && next(new AppError('cart is empty ', 404))
    //NOTE - calc total price 
    const totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    //NOTE - create order
    const order = new orderModel({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice: totalPrice,
        shippingAddress: req.body.shippingAddress
    })
    await order.save()

    //NOTE - increase sold product && decrease quantity
    if (order) {
        const options = cart.cartItems.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: {
                    $inc: {
                        stock: -item.quantity,
                        sold: item.quantity
                    }
                }
            }
        }))
        await productModel.bulkWrite(options)
        //NOTE - clear user cart
        await cartModel.findByIdAndDelete(req.params.id)

        return res.status(201).json({ message: 'success', order })

    } else {
        return next(new AppError('no cart to order', 404))

    }


});

export {
    createCashOrder
}


