import { ProductModel } from "../models/index.js";

export const findProducts = async () => {
  try {
    return await ProductModel.find();
  } catch (error) {
    throw new Error(error);
  }
};

export const findProductById = async (productId) => {
  try {
    return await ProductModel.findById(productId);
  } catch (error) {
    throw new Error(error);
  }
};

export const paginateProducts = async ({ limit = 10, page = 1, sort }) => {
  try {
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    };

    return await ProductModel.paginate({}, options);
  } catch (error) {
    throw new Error(error);
  }
};

export const insertProduct = async (productData) => {
  try {
    const newProduct = new ProductModel(productData);
    return await newProduct.save();
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    return await ProductModel.findByIdAndUpdate(productId, productData, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    return await ProductModel.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error(error);
  }
};
