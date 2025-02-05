import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        default: Date.now
      }
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;