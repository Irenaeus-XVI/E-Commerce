import categoryRoutes from '../src/modules/category/category.routes.js'
import subCategoryRoutes from '../src/modules/subCategory/subCategory.routes.js'
import { globalErrorHandling } from './middleware/globalErrorHandling.js'
import { AppError } from './utils/AppError.js'


export const bootstrap = (app) => {
    app.use('/api/v1/categories', categoryRoutes)
    app.use('/api/v1/subCategories', subCategoryRoutes)
    app.get('/', (req, res) => res.send('Hello World!'))

    app.all('*', (req, res, next) => {
        // res.status(404).json('Invalid Path.')
        next(new AppError('Invalid Path', 404))
    })



    //NOTE - Global Error Handling 
    app.use(globalErrorHandling)
} 