import mongoose from 'mongoose';

const { Schema, models } = mongoose;

// Schema para itens de orçamento detalhado
const estimateItemSchema = new Schema({
  description: {
    type: String,
    required: function(this: any) {
      // Somente requer descrição se o tipo de orçamento for "detailed"
      return this.parent().estimateType === 'detailed';
    },
  },
  quantity: {
    type: Number,
    required: function(this: any) {
      return this.parent().estimateType === 'detailed';
    },
    min: [0.01, 'Quantidade deve ser maior que 0'],
  },
  unit: {
    type: String,
    default: 'un',
  },
  unitPrice: {
    type: Number,
    required: function(this: any) {
      return this.parent().estimateType === 'detailed';
    },
    min: [0, 'Preço unitário não pode ser negativo'],
  },
});

// Schema para materiais
const materialItemSchema = new Schema({
  description: {
    type: String,
    required: function(this: any) {
      return this.parent().estimateType === 'materials';
    },
  },
  quantity: {
    type: Number,
    required: function(this: any) {
      return this.parent().estimateType === 'materials';
    },
    min: [0.01, 'Quantidade deve ser maior que 0'],
  },
  unit: {
    type: String,
    default: 'un',
  },
  unitPrice: {
    type: Number,
    required: function(this: any) {
      return this.parent().estimateType === 'materials';
    },
    min: [0, 'Preço unitário não pode ser negativo'],
  },
});

// Schema para serviços
const serviceItemSchema = new Schema({
  description: {
    type: String,
    required: function(this: any) {
      return this.parent().estimateType === 'simple' || this.parent().estimateType === 'materials';
    },
  },
  value: {
    type: Number,
    required: function(this: any) {
      return this.parent().estimateType === 'simple' || this.parent().estimateType === 'materials';
    },
    min: [0, 'Valor não pode ser negativo'],
  },
});

const estimateSchema = new Schema({
  estimateType: {
    type: String,
    enum: ['detailed', 'materials', 'simple'],
    default: 'detailed',
    required: [true, 'Tipo de orçamento é obrigatório'],
  },
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
  items: {
    type: [estimateItemSchema],
    validate: [
      {
        validator: function(this: any, items: any[]) {
          // Somente valida se o tipo for "detailed"
          if (this.estimateType === 'detailed') {
            return items && items.length > 0;
          }
          return true;
        },
        message: 'Orçamento detalhado requer pelo menos um item'
      }
    ],
    default: undefined
  },
  materials: {
    type: [materialItemSchema],
    validate: [
      {
        validator: function(this: any, materials: any[]) {
          // Somente valida se o tipo for "materials"
          if (this.estimateType === 'materials') {
            return materials && materials.length > 0;
          }
          return true;
        },
        message: 'Orçamento de materiais requer pelo menos um material'
      }
    ],
    default: undefined
  },
  services: {
    type: [serviceItemSchema],
    validate: [
      {
        validator: function(this: any, services: any[]) {
          // Valida se o tipo for "simple" ou "materials"
          if (this.estimateType === 'simple' || this.estimateType === 'materials') {
            return services && services.length > 0;
          }
          return true;
        },
        message: 'Orçamento requer pelo menos um serviço'
      }
    ],
    default: undefined
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Desconto não pode ser negativo'],
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Taxa não pode ser negativa'],
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

// Pré-save para calcular valores com base no tipo de orçamento
estimateSchema.pre('save', function(this: any, next) {
  let subtotal = 0;

  if (this.estimateType === 'detailed' && this.items && this.items.length > 0) {
    subtotal = this.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0);
  } else if (this.estimateType === 'materials') {
    const materialTotal = this.materials && this.materials.length > 0 
      ? this.materials.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0)
      : 0;
    const serviceTotal = this.services && this.services.length > 0
      ? this.services.reduce((sum: number, service: any) => sum + service.value, 0)
      : 0;
    subtotal = materialTotal + serviceTotal;
  } else if (this.estimateType === 'simple' && this.services && this.services.length > 0) {
    subtotal = this.services.reduce((sum: number, service: any) => sum + service.value, 0);
  }

  this.subtotal = subtotal;
  let total = this.subtotal;
  if (this.discount) total -= this.discount;
  if (this.tax) total += this.tax;
  this.total = total;

  this.updatedAt = new Date();
  next();
});

const EstimateModel = models.Estimate || mongoose.model('Estimate', estimateSchema);

export default EstimateModel;