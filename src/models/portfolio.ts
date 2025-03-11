import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const portfolioSchema = new Schema({
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
    enum: ['elétrica', 'hidráulica', 'montagem', 'pintura', 'geral'],
  },
  location: {
    type: String,
    required: [true, 'Localização é obrigatória'],
  },
  date: {
    type: Date,
    required: [true, 'Data é obrigatória'],
  },
  details: {
    type: String,
  },
  images: [{
    url: String,
    driveId: String,
    caption: String,
  }],
  isPublished: {
    type: Boolean,
    default: true,
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

const PortfolioModel = models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

export default PortfolioModel;
