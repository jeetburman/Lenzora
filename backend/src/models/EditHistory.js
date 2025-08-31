// models/EditHistory.js
import mongoose from 'mongoose';

const editHistorySchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  parameters: {
    type: Object,
    default: {}
  },
  previousState: {
    type: Object
  },
  newState: {
    type: Object
  }
}, {
  timestamps: true
});

// Index for better query performance
editHistorySchema.index({ imageId: 1, createdAt: -1 });
editHistorySchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('EditHistory', editHistorySchema);