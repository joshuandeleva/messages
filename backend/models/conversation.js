const mongoose = require('mongoose')
const conversationSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages'
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Conversations', conversationSchema)