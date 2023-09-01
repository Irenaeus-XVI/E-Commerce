import categoryRoutes from '../src/modules/category/category.routes.js'
import { AppError } from './utils/AppError.js'


export const bootstrap = (app) => {
    app.use('/api/v1/categories', categoryRoutes)
    app.get('/', (req, res) => res.send('Hello World!'))

    app.all('*', (req, res, next) => {
        // res.status(404).json('Invalid Path.')
        next(new AppError('Invalid Path', 404))
    })



    //NOTE - Global Error Handling 
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({ err: err.message })
    })
} 