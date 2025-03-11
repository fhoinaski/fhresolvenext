import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
  },
  slug: {
    type: String,
    required: [true, 'Slug é obrigatório'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
  },
  excerpt: {
    type: String,
    required: [true, 'Resumo é obrigatório'],
  },
  coverImage: {
    url: String,
    driveId: String,
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
  },
  tags: [{
    type: String,
  }],
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const BlogModel = models.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;