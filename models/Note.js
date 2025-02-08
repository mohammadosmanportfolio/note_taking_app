import mongoose from "mongoose";

const Schema = mongoose.Schema;


const NoteSchema = new Schema({
    // user field is used to create a relationship between a note and a user. The ObjectID will be used to identify
    // the user that this note belongs to
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

//const Note = mongoose.model('Note', NoteSchema);
const Note = mongoose.model('Note', NoteSchema);
export default Note;
//module.exports = Note;