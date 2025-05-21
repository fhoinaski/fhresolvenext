// src/models/review.ts
import mongoose, { Schema, models } from 'mongoose';

interface IReview extends mongoose.Document {
  name: string;
  location: string;
  rating?: number;
  text?: string;
  image?: string;
  isApproved: boolean;
  token: string;
  isTokenUsed: boolean;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      maxlength: [100, 'Nome não pode exceder 100 caracteres'],
    },
    location: {
      type: String,
      required: [true, 'Localização é obrigatória'],
      trim: true,
      maxlength: [200, 'Localização não pode exceder 200 caracteres'],
    },
    rating: {
      type: Number,
      min: [1, 'A avaliação deve ser no mínimo 1'],
      max: [5, 'A avaliação deve ser no máximo 5'],
      required: [
        function (this: IReview) {
          return this.isTokenUsed === true;
        },
        'Avaliação é obrigatória quando o token é usado',
      ],
    },
    text: {
      type: String,
      required: [
        function (this: IReview) {
          return this.isTokenUsed === true;
        },
        'Texto da avaliação é obrigatório quando o token é usado',
      ],
      trim: true,
      maxlength: [1000, 'Texto não pode exceder 1000 caracteres'],
    },
    image: {
      type: String,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: { expires: '7d' }, // Token expira em 7 dias
    },
    isTokenUsed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // Índice para consultas por data
    },
  },
  {
    timestamps: { updatedAt: 'updatedAt' }, // Adiciona updatedAt automaticamente
  }
);

const ReviewModel = models.Review || mongoose.model<IReview>('Review', reviewSchema);

export default ReviewModel;