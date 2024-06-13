const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  content: [
    {
        subtitle: {
            type: String,
            required: true
        },
        textBody:[{
            text: {
                type: String,
                required: false
            },
            checked: {
                type: Boolean,
                default: false
            }
        }] 
    }
    ],
  ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  sharedWith: [
      {
          userId: {
              type: Schema.Types.ObjectId,
              ref: 'User'
          },
          permissions: {
              type: String,
              enum: ['read', 'write'],
              required: true
          }
      }
  ],
  createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
});

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

module.exports = Note;