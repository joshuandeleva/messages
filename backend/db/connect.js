const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://iamndeleva:Mwag9836@chatapp.jbxefww.mongodb.net/?retryWrites=true&w=majority")
    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}
module.exports = connectDB