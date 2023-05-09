import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    minlength: 4,
    maxlength: 24,
  },

  address: {
    type: String,
    required: [true, 'Please provide address'],
    minlength: 6,
    maxlength: 20,
  },

  status: {
    type: String,
    enum: ['open', 'pending', 'close'],
    default: 'open',
  },

  role: {
    type: String,
    enum: ['customer', 'business', 'admin'],
    default: 'customer',
  },

  sum: {
    type: Number,
    default: 1
  }
});

export default mongoose.model('Task', TaskSchema);
