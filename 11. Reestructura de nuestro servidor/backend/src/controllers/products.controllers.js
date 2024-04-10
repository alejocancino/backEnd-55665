import {
  findProducts,
  findProductById,
  paginateProducts,
  insertProduct,
  updateProduct,
  deleteProduct
} from '../services/products.services.js';

// Controlador para obtener todos los productos
export async function getAllProducts(req, res) {
  try {
    const products = await findProducts();
   return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Controlador para obtener un producto por su ID
export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await findProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para paginar productos
export async function getPaginatedProducts(req, res) {
  const { limit, page, sort } = req.query;
  try {
    const paginatedProducts = await paginateProducts({ limit, page, sort });
    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para crear un nuevo producto
export async function createProduct(req, res) {
  const productData = req.body;
  try {
    const newProduct = await insertProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para actualizar un producto existente
export async function updateProductById(req, res) {
  const { id } = req.params;
  const productData = req.body;
  try {
    const updatedProduct = await updateProduct(id, productData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para eliminar un producto
export async function deleteProductById(req, res) {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
