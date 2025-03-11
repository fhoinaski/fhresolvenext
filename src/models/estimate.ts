import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const estimateItemSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Descrição do item é obrigatória'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantidade é obrigatória'],
    min: [0.01, 'Quantidade deve ser maior que 0'],
  },
  unit: {
    type: String,
    default: 'un',
  },
  unitPrice: {
    type: Number,
    required: [true, 'Preço unitário é obrigatório'],
    min: [0, 'Preço unitário não pode ser negativo'],
  },
});

const estimateSchema = new Schema({
  clientName: {
    type: String,
    required: [true, 'Nome do cliente é obrigatório'],
  },
  clientEmail: {
    type: String,
  },
  clientPhone: {
    type: String,
    required: [true, 'Telefone do cliente é obrigatório'],
  },
  address: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Título do orçamento é obrigatório'],
  },
  description: {
    type: String,
  },
  items: [estimateItemSchema],
  subtotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
  },
  paymentTerms: {
    type: String,
  },
  validUntil: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'accepted', 'rejected', 'expired'],
    default: 'draft',
  },
  token: {
    type: String,
    unique: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

// Pré-save para calcular os valores
estimateSchema.pre('save', function(next) {
  // Calcular subtotal
  this.subtotal = this.items.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice);
  }, 0);
  
  // Calcular total com desconto e taxas
  let total = this.subtotal;
  
  if (this.discount) {
    total -= this.discount;
  }
  
  if (this.tax) {
    total += this.tax;
  }
  
  this.total = total;
  
  // Atualiza a data de modificação
  this.updatedAt = new Date();
  
  next();
});

const EstimateModel = models.Estimate || mongoose.model('Estimate', estimateSchema);

export default EstimateModel;