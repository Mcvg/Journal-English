const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentarySchema = new Schema({
  id_user:{ type: Schema.Types.ObjectId, ref: 'User' },
  detail: {
    type: String,
    required: true,
    max: 250,
  },
  id_activity:{ type: Schema.Types.ObjectId, ref: 'Activity' }
});

module.exports = mongoose.model('Commentary', CommentarySchema);
