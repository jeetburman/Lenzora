// models/Image.js
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbUrl: {
    type: String
  },
  metadata: {
    width: Number,
    height: Number,
    format: String
  },
  edits: [{
    action: String,
    parameters: Object,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  isPublic: {
    type: Boolean,
    default: false
  },
  parentImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }
}, {
  timestamps: true
});

// Index for better query performance
imageSchema.index({ userId: 1, createdAt: -1 });
imageSchema.index({ tags: 1 });

export default mongoose.model('Image', imageSchema);