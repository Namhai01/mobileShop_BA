var slug = require("slug");
const fs = require("fs");
const path = require("path");
const ProductModel = require("../models/Product");
const CommentModel = require("../models/Comment");
const paginate = require("../../common/paginate");

//DS SP nổi bật và còn hàng
const getProducts = async (req, res) => {
  try {
    const { featured } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = page * limit - limit;
    const queryConditions = { is_stock: true };
    if (featured !== undefined) {
      queryConditions.featured = featured;
    }
    const Selecter = {
      thumbnail: 1,
      price: 1,
      name: 1,
      featured: 1,
      is_stock: 1,
    };

    const products = await ProductModel.find(queryConditions, Selecter)
      .limit(limit || 6)
      .skip(skip)
      .sort({ _id: -1 })
      .populate("cat_id")
      .exec();
    res.status(200).json({
      Status: "Success",
      Data: {
        products: products,
        filters: { limit: limit, page: page, selects: Selecter },
      },
      Pages: [],
    });
  } catch (error) {
    console.log(error.message);
  }
};
//Chi tiết sản phẩm
const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = page * limit - limit;
    const total = await CommentModel.countDocuments({ prd_id: id });
    const totalPage = Math.ceil(total / limit);
    const [Comment, Detail] = await Promise.all([
      CommentModel.find({ prd_id: id }).skip(skip).limit(limit).exec(),
      ProductModel.findById({ _id: id }).populate("cat_id").exec(),
    ]);
    res.status(200).json({
      Status: "Success",
      Data: { docs: { product: Detail, Comment: Comment }, filters: {} },
      Pages: paginate(page, totalPage),
    });
  } catch (error) {
    console.log(error.message);
  }
};
//Tìm kiếm theo ?key
const findProduct = async (req, res) => {
  try {
    const key = req.query.key || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = page * limit - limit;
    const total = await ProductModel.countDocuments({
      name: { $regex: new RegExp(key, "i") },
    });
    const totalPage = Math.ceil(total / limit);
    const result = await ProductModel.find({
      name: { $regex: new RegExp(key, "i") },
    })
      .limit(limit || 6)
      .skip(skip)
      .sort({ _id: -1 })
      .populate("cat_id")
      .exec();
    if (result.length > 0) {
      res.status(200).json({
        Status: "Success",
        Data: {
          products: result,
          filters: { limit: limit, page: page, keysearch: key },
        },
        Pages: paginate(page, totalPage),
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//Thêm SP
const addProduct = async (req, res) => {
  const { body, file } = req;
  try {
    if (body) {
      const product = {
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        status: body.status,
        featured: body.featured,
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: true,
        name: body.name,
        slug: slug(body.name),
      };
      if (file) {
        const thumbnail = "products/" + file.originalname;
        fs.renameSync(
          file.path,
          path.resolve("src/public/uploads/images", thumbnail)
        );
        product["thumbnail"] = thumbnail;
        new ProductModel(product).save();
        res.status(201).json({
          message: "Success",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "error" });
    // console.log(error.message);
  }
};
//Xoá SP
const delProduct = async (req, res) => {
  const id = req.params.id;
  const del = await ProductModel.findByIdAndDelete({ _id: id });
  if (!del) {
    return res.status(404).json({ message: "False!" });
  }
  res.status(200).json({ message: "Success!" });
};
//Sửa SP
const updateProduct = async (req, res) => {};

module.exports = {
  getProducts,
  getById,
  findProduct,
  addProduct,
  delProduct,
  updateProduct,
};
