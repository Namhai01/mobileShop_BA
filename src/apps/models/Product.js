const mongoose = require("../../common/database");

const productSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
      // required: true,
    },
    promotion: {
      type: String,
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
    accessories: {
      type: String,
      required: true,
    },
    is_stock: {
      type: Boolean,
      default: false,
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema, "products");

module.exports = ProductModel;
