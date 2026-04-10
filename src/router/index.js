const listRouter = require('./list')
const formRouter = require('./form')
const routerInit = (app)=> {
    app.use('/form', formRouter)
    app.use('/list', listRouter)
    app.use('/', listRouter)

}

module.exports = routerInit

