const mongoose = require('../db');

const booksSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true, trim: true },
    author:  { type: String, required: true, trim: true },
    price:   { type: Number, required: true, min: 0, default: 0 },
    inStock: { type: Boolean, default: true },
    tags:    { type: [String], default: [] }
  },
  { timestamps: true } // createdAt, updatedAt
);

const Books = mongoose.model('Books', booksSchema);
module.exports = Books;
