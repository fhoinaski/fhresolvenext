import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const quoteSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  phone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
  },
  message: {
    type: String,
    required: [true, 'Mensagem é obrigatória'],
  },
  status: {
    type: String,
    enum: ['novo', 'em_contato', 'convertido', 'encerrado'],
    default: 'novo',
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const QuoteModel = models.Quote || mongoose.model('Quote', quoteSchema);

export default QuoteModel;