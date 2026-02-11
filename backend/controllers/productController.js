// backend/controllers/productController.js
export const getProducts = (req, res) => {
    res.json([{ nombre: "Burrito de picadillo" }, { nombre: "Queso rallado 500g" }]);
};

export const createProduct = (req, res) => {
    res.json({ message: "Producto creado (ejemplo)" });
};

export const updateProduct = (req, res) => {
    res.json({ message: "Producto actualizado (ejemplo)" });
};

export const deleteProduct = (req, res) => {
    res.json({ message: "Producto eliminado (ejemplo)" });
};

