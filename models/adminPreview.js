const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminPreviewSchema = new Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        unique: true
    },
    //adminComment: "Looks good, thanks for sharing!", // admin's comment for the video (null if no comment)
    adminComment: {
        type: String,
        required: false
    },
    //adminDecision: "true", // admin's decision for the video
    adminDecision: {
        type: Boolean,
        default: false,
        required: true
    },

});
const AdminPreview = mongoose.model('AdminPreview', adminPreviewSchema);
module.exports = AdminPreview 