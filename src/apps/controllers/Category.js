const CategoryModel = require("../models/Category");
const ProductModel = require("../models/Product");
const paginate = require("../../common/paginate");
const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).json({
      Status: "Success",
      Data: {
        categories: category,
        filters: {},
      },
      Pages: [],
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = page * limit - limit;
    const total = await ProductModel.countDocuments({ cat_id: id }).exec();
    const totalPage = Math.ceil(total / limit);
    const Selecter = {
      thumbnail: 1,
      price: 1,
      name: 1,
    };

    const [products, title] = await Promise.all([
      ProductModel.find({ cat_id: id }, Selecter)
        .limit(limit)
        .skip(skip)
        .exec(),

      CategoryModel.findById(id),
    ]);
    res.status(200).json({
      Status: "Success",
      Data: {
        products: products,
        filters: {
          Selecter: {
            thumbnail: 1,
            price: 1,
            name: 1,
          },
          Total: total,
          Title: title.title,
        },
      },
      Pages: paginate(page, totalPage),
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const Selecter = {
      title: 1,
    };
    const category = await CategoryModel.findById(id, Selecter);
    res.status(200).json({
      Status: "Success",
      Data: {
        category: category,
        filters: {
          Selecter: { name: 1 },
        },
      },
      Pages: [],
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getCategory,
  getCategoryProducts,
  getCategoryById,
};
