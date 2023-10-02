import { couponModel } from '../../../../database/models/coupon.model.js'
import { handleAsyncError } from '../../../utils/handleAsyncError.js';
import { AppError } from '../../../utils/AppError.js';
import { deleteOne, getAll, getSpecific } from '../../../utils/helpers/refactor.js';
import QRCode from 'qrcode';
const addCoupon = handleAsyncError(async (req, res, next) => {

    const Coupon = new couponModel(req.body)
    await Coupon.save()
    const url = await QRCode.toDataURL(Coupon.code)
    res.status(201).json({ message: "success", Coupon, url });
});


const getAllCoupons = getAll(couponModel, 'coupons')


const getSpecificCoupon = getSpecific(couponModel, 'coupon')

const updateCoupon = handleAsyncError(async (req, res, next) => {

    //NOTE - coupon id
    const { id } = req.params
    const updatedCoupon = await couponModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
    !updatedCoupon && next(new AppError('coupon  Not Found Or You Are Not Authorized.', 404));
    updatedCoupon && res.status(201).json({ message: "success", updatedCoupon });

});



const deleteCoupon = deleteOne(couponModel, 'coupon');


export {
    addCoupon,
    getAllCoupons,
    updateCoupon,
    getSpecificCoupon,
    deleteCoupon
}