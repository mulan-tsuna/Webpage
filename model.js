const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1/db18', {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch(err => console.log(err))

const userSchema = new mongoose.Schema({
    Date: { type: Date, default: new Date() },
    title: { type: String, required: true },
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Nation: { type: String, required: true },
    Phone: { type: String, required: true },
    Email: { type: String, required: true },
    Gentle: {type: String},
    Username: { type: String, required: true },
    Password: { type: String, required: true },
})
module.exports = mongoose.model('User', userSchema)


