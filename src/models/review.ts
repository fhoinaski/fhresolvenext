import mongoose from 'mongoose';

const { Schema, models } = mongoose;

const reviewSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  location: {
    type: String,
    required: [true, 'Localização é obrigatória'],
  },
  rating: {
    type: Number,
    min: [1, 'A avaliação deve ser no mínimo 1'],
    max: [5, 'A avaliação deve ser no máximo 5'],
    required: [
      function () {
        return this.isTokenUsed === true;
      },
      'Avaliação é obrigatória quando o token é usado',
    ],
  },
  text: {
    type: String,
    required: [
      function () {
        return this.isTokenUsed === true;
      },
      'Texto da avaliação é obrigatório quando o token é usado',
    ],
  },
  image: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    unique: true,
  },
  isTokenUsed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Limpar cache do modelo, caso já exista
delete mongoose.models.Review;

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;