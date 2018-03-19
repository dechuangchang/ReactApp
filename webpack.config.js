// console.log( encodeURIComponent(process.env.order) )
const webpackServer =  require("./webpack_config/webpackServer.js")
const webpackDev =  require("./webpack_config/webpackDev.js")

if(encodeURIComponent(process.env.order)=='server'){
    module.exports = webpackServer
}

if(encodeURIComponent(process.env.order)=='dev'){
    module.exports = webpackDev
}