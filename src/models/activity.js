const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 25,
  },
  id_user: {
    type: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  detail_text: {
    type: String,
    required: true,
    max: 250,
  },
  detail_audio: {
    type: String,
    required: true,
    max: 200,
  },
});

module.exports = mongoose.model('Activity', ActivitySchema);
