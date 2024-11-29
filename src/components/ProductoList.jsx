import React from "react";
import axios from "axios";
import ProductoItem from "./ProductoItem";

const ProductoList = ({ productos, setProductos }) => {
  const handleEliminarProducto = async (productoId) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/dynamic-radar-443104-u0/us-central1/deleteProducto",
        { productoId }
      );

      if (response.data.success) {
        setProductos((prev) => prev.filter((producto) => producto.id !== productoId));
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="table-responsive">
      {productos.length === 0 ? (
        <p className="text-center text-muted">No hay productos disponibles</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Título adicional</th>
              <th>Descripción adicional</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <ProductoItem 
                key={producto.id} 
                producto={producto} 
                onDelete={handleEliminarProducto} 
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default ProductoList;


