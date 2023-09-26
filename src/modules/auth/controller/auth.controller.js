import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { userModel } from '../../../../database/models/user.model.js';
import { AppError } from '../../../utils/AppError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const signUp = handleAsyncError(async (req, res, next) => {

    const existUser = await userModel.findOne({ email: req.body.email })
    if (existUser) return next(new AppError('User Already Exist', 409))
    const user = new userModel(req.body)
    await user.save()
    const token = jwt.sign({ email: user.email, name: user.name, id: user._id, role: user.role }, process.env.SECRET_KEY_TOKEN)
    res.status(201).json({ message: "success", token });
});


const signIn = handleAsyncError(async (req, res, next) => {

    const user = await userModel.findOne({ email: req.body.email })
    console.log(user);
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) return next(new AppError("Email Is Incorrect or Password"), 409)

    const token = jwt.sign({ email: user.email, name: user.name, id: user._id, role: user.role }, process.env.SECRET_KEY_TOKEN)
    res.status(201).json({ message: "success", token });




});



const protectedRoutes = handleAsyncError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) return next(new AppError('Token Not provided', 404))
    const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN)
    const user = await userModel.findById(decoded.id)
    if (!user) return next(new AppError('Invalid Token'), 401)
    const changedPasswordAt = parseInt(user.changeUserPasswordAt.getTime() / 1000)
    if (changedPasswordAt > decoded.iat) return next(new AppError('Invalid Token'), 401)
    req.user = user
    next()
})


const allowTo = (...roles) => {
    return handleAsyncError(async (req, res, next) => {
        console.log();

        if (!roles.includes(req.user.role)) return next(new AppError('You Are Not Allowed', 403))
        next()
    })
}
export {
    signUp,
    signIn,
    protectedRoutes,
    allowTo
}