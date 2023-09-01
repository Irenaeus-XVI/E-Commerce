import categoryRoutes from '../src/modules/category/category.routes.js'


export const bootstrap = (app) => {
    app.use('/api/v1/categories', categoryRoutes)
    app.get('/', (req, res) => res.send('Hello World!'))

} 