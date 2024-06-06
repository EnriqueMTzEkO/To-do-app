const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
