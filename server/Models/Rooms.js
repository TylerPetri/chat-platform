const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    room: {
        type: String
    }
})

module.exports = mongoose.model('Rooms', roomSchema)