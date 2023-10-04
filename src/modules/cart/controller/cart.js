import { cartModel } from '../../../../database/models/cart.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';
import { productModel } from '../../../../database/models/product.model.js'
import { couponModel } from '../../../../database/models/coupon.model.js';


function calcTotalPrice(cart) {
    let totalPrice = 0
    cart.cartItems.forEach(product => {
        totalPrice += product.quantity * product.price
    })
    cart.totalPrice = totalPrice
}
const addProductToCart = handleAsyncError(async (req, res, next) => {

    //NOTE - Check if product is not exist 
    const product = await productModel.findById(req.body.product).select('price')
    if (!product) return next(new AppError('Product is Not Exist.', 404))

    //NOTE - calc product price
    req.body.price = product.price

    //NOTE - Check if user have cart or not
    let existCart = await cartModel.findOne({ user: req.user._id })
    if (!existCart) {
        const Cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body]
        })
        calcTotalPrice(Cart)
        await Cart.save()
        return res.status(201).json({ message: "success", Cart });

    }

    //NOTE - if exist cart and add same product to it 
    const item = existCart.cartItems.find(item => item.product == req.body.product)
    if (item) item.quantity += req.body.quantity || 1
    else {
        existCart.cartItems.push(req.body)
    }

    calcTotalPrice(existCart)

    //NOTE - if coupon is applied and try to add new product 
    if (existCart.discount) {
        existCart.totalPriceAfterDiscount = existCart.totalPrice - (existCart.totalPrice * existCart.discount) / 100 //NOTE - 100-(100*50)/100

    }

    await existCart.save()
    return res.status(201).json({ message: "add to cart", existCart });

});



const removeProductFromCart = handleAsyncError(async (req, res, next) => {
    const DeletedProduct = await cartModel.findOneAndUpdate({ user: req.user._id }, {
        $pull: {
            cartItems: { _id: req.params.id }
        }
    }, { new: true })

    !DeletedProduct && next(new AppError('item Not Found', 404));
    calcTotalPrice(DeletedProduct)
    //NOTE - if coupon is applied and try to add new product 
    if (DeletedProduct.discount) {
        DeletedProduct.totalPriceAfterDiscount = DeletedProduct.totalPrice - (DeletedProduct.totalPrice * DeletedProduct.discount) / 100 //NOTE - 100-(100*50)/100
    }
    if (DeletedProduct.cartItems.length == 0) {
        DeletedProduct.discount = 0
        DeletedProduct.save()
    }
    DeletedProduct && res.status(201).json({ message: "success", DeletedProduct });

})

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




const applyCoupon = handleAsyncError(async (req, res, next) => {


    const { code } = req.body
    const coupon = await couponModel.findOne({ code, expires: { $gt: Date.now() } })
    console.log(coupon);
    if (coupon) {
        const cart = await cartModel.findOne({ user: req.user._id })
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100 //NOTE - 100-(100*50)/100
        cart.discount = coupon.discount
        await cart.save()
        return res.status(201).json({ message: "success", cart })
    }
    return res.status(404).json({ message: "coupon is expired" })


});

export {
    addProductToCart,
    getAllCarts,
    updateCart,
    getSpecificCart,
    deleteCart,
    removeProductFromCart,
    applyCoupon
}