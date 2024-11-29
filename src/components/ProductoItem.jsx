import React from "react";

const ProductoItem = ({ producto, onDelete }) => {
  return (
    <tr>
      <td>
        {producto.imagen && (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-thumbnail"
            style={{ width: "80px", height: "auto" }}
          />
        )}
      </td>
      <td>{producto.nombre}</td>
      <td>{producto.descripcion}</td>
      <td>${producto.precio}</td>
      <td>{producto.additionalInfo?.title || "Sin título"}</td>
      <td>{producto.additionalInfo?.body || "Sin descripción adicional"}</td>
      <td>
        <button 
          className="btn btn-danger btn-sm" 
          onClick={() => onDelete(producto.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ProductoItem;

