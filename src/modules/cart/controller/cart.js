import { cartModel } from '../../../../database/models/cart.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';
import { productModel } from '../../../../database/models/product.model.js'

const addProductToCart = handleAsyncError(async (req, res, next) => {

    //NOTE - Check if user have cart or not

    let existCart = await cartModel.findOne({ user: req.user._id })
    if (!existCart) {
        const Cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body]
        })
        await Cart.save()
        return res.status(201).json({ message: "success", Cart });

    }

    return res.status(201).json({ message: "add to cart" });

});


const getAllCarts = getAll(cartModel, 'Carts')


const getSpecificCart = getSpecific(cartModel, 'Cart')

const updateCart = handleAsyncError(async (req, res, next) => {
    //NOTE - Take userId from token 
    //NOTE - req.body.user = req.user._id
    //NOTE - Cart id
    const { id } = req.params
    const updatedCart = await cartModel.findOneAndUpdate({ user: req.user._id, _id: id }, req.body, { new: true })
    !updatedCart && next(new AppError('Cart  Not Found Or You Are Not Authorized.', 404));
    updatedCart && res.status(201).json({ message: "success", updatedCart });

});



const deleteCart = deleteOne(cartModel, 'Cart');


export {
    addProductToCart,
    getAllCarts,
    updateCart,
    getSpecificCart,
    deleteCart
}