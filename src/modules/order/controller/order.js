import { orderModel } from '../../../../database/models/order.model.js'
import { cartModel } from '../../../../database/models/cart.model.js'
import { productModel } from '../../../../database/models/product.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import Stripe from 'stripe';
import { userModel } from '../../../../database/models/user.model.js';
const stripe = new Stripe('sk_test_51Nxwq9IRG6CDAzu7e4emuVQoDlZYjBmEQQERaO6mHT4SoFWZUS4m7vEqwgu2d0TXUWypWIpZUn37wc0eceMAuQmd00ddJD0yVA');



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



const getAllOrders = handleAsyncError(async (req, res, next) => {

    const orders = await orderModel.find().populate('cartItems.product')
    orders && res.status(200).json({ message: 'success', orders })
    !orders && next(new AppError("no orders found."))
});


const getUserOrders = handleAsyncError(async (req, res, next) => {

    const orders = await orderModel.find({ user: req.user._id }).populate('cartItems.product')
    orders && res.status(200).json({ message: 'success', orders })
    !orders && next(new AppError("no orders found."))
});



const createCheckOutSession = handleAsyncError(async (req, res, next) => {



    //NOTE - get cart (cartId)
    const cart = await cartModel.findById(req.params.id)

    !cart && next(new AppError('cart is empty ', 404))

    //NOTE - calc total price 
    const totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp', //NOTE - currency
                    unit_amount: totalPrice * 100,//NOTE - money that display
                    product_data: {//NOTE - name and images of the products
                        name: req.user.name,
                    }
                }
                ,
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'https://www.google.com/',
        cancel_url: 'https://www.yahoo.com/',
        customer_email: req.user.email,
        client_reference_id: req.params.id,//NOTE - cart id 
        metadata: req.body.shippingAddress
    });
    res.json({ message: 'success', session })
})







const createOnlineOrder = handleAsyncError((request, response) => {
    console.log("asdasdadsasd");
    const sig = request.headers['stripe-signature'].toString();

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.WEB_HOOK_SECRET_KEY);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type == 'checkout.session.completed') {
        handleWebHookEvent(event.data.object, response)
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }


    // Return a 200 response to acknowledge receipt of the event
    response.send();
})





async function handleWebHookEvent(event, res) {
    //NOTE - get cart (cartId)
    const cart = await cartModel.findById(event.client_reference_id)

    const user = await userModel.findOne({ email: event.customer_email })
    //NOTE - create order
    const order = new orderModel({
        user: user._id,
        cartItems: cart.cartItems,
        totalOrderPrice: event.amount_total / 100,
        shippingAddress: event.metadata,
        paymentMethod: 'card',
        isPaid: true,
        paidAt: Date.now()
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
        await cartModel.findByIdAndDelete({ user: user._id })

        return res.status(201).json({ message: 'success', order })

    } else {
        return next(new AppError('no cart to order', 404))

    }
}


export {
    createCashOrder,
    getAllOrders,
    getUserOrders,
    createCheckOutSession,
    createOnlineOrder
}


