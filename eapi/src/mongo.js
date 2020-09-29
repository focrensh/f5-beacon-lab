const mongoose = require('mongoose')


mongoose.connect('mongodb://root:mySecretPW@mongo:27017/beacon?authSource=admin', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const Bacon = mongoose.model('bacon', {
    Name: {
        type: String,
        required: true,
        trim: true
    }
}, 'bacon')




const getBacon = async () => {

    try {
        const allbacon = await Bacon.find({})
        // console.log(allbacon)
        return allbacon
    } catch (e) {
        console.log(e, 'nooooo')
    }
}

module.exports = { Bacon, getBacon }