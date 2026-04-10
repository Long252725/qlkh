const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000;
import { engine } from 'express-handlebars';
import routerInit from './router'
const jwt = require('jsonwebtoken')
const db = require('./config/db/index')

// Import function exported by newly installed node modules.
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

app.use(express.static(path.join(__dirname, 'public')))
app.use('/bill',express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

//get Data from Casso

// setInterval(()=> {
//     fetch("https://oauth.casso.vn/v2/transactions", {
//         headers: {
//             Authorization: `Apikey ${process.env.VIETTIN_KEY}`,
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         const dataBank = data.data.records
//         dataBank.forEach(e => {
//             if(!isNaN(Number(e.description.substr(51, 7)))) {
//                 Bills.updateMany({
//                     content: Number(e.description.substr(51, 7)),
//                     money: e.amount,
//                     status: "Đang chờ"
//                 }, {
//                     status: "Thành công"
//                 })
//                 .then(check => {})
//             }
//         })
//     })

// }, 1000)


// template
app.engine('handlebars', engine({
    defaultLayout: 'main',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

//connect
db.connect()
routerInit(app)

app.listen(PORT, ()=> {
    console.log("PORT: ", PORT)
})