import categoryRoutes from '../src/modules/category/category.routes.js'
import subCategoryRoutes from '../src/modules/subCategory/subCategory.routes.js'
import brandRoutes from '../src/modules/brand/brand.routes.js'
import productRoutes from '../src/modules/product/product.routes.js'
import userRoutes from '../src/modules/user/user.routes.js'
import authRouter from '../src/modules/auth/auth.routes.js'
import reviewRouter from '../src/modules/review/review.routes.js'
import wishListRoutes from '../src/modules/wishList/wishList.routes.js'
import addressesRoutes from '../src/modules/address/address.routes.js'
import couponsRoutes from '../src/modules/coupon/coupon.routes.js'
import { globalErrorHandling } from './middleware/globalErrorHandling.js'
import { AppError } from './utils/AppError.js'


export const bootstrap = (app) => {
    app.use('/api/v1/categories', categoryRoutes)
    app.use('/api/v1/subCategories', subCategoryRoutes)
    app.use('/api/v1/brands', brandRoutes)
    app.use('/api/v1/products', productRoutes)
    app.use('/api/v1/users', userRoutes)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/reviews', reviewRouter)
    app.use('/api/v1/wishList', wishListRoutes)
    app.use('/api/v1/addresses', addressesRoutes)
    app.use('/api/v1/Coupons', couponsRoutes)
    app.get('/', (req, res) => res.send('Hello World!'))

    app.all('*', (req, res, next) => {
        // res.status(404).json('Invalid Path.')
        next(new AppError('Invalid Path', 404))
    })



    //NOTE - Global Error Handling 
    app.use(globalErrorHandling)
} 