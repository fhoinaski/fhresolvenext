import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const videoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
  },
  driveId: {
    type: String,
    required: [true, 'ID do Google Drive é obrigatório'],
  },
  thumbnail: {
    url: String,
    driveId: String,
  },
  isBeforeAfter: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const VideoModel = models.Video || mongoose.model('Video', videoSchema);

export default VideoModel;