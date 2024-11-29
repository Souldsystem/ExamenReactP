import React from "react";

const MenuPrincipal = ({ onSeleccionarOpcion }) => (
  <div className="container mt-4">
    <h3>Menú Principal</h3>
    <button
      className="btn btn-primary w-100 mb-2"
      onClick={() => onSeleccionarOpcion("productos")}
    >
      Admin Productos
    </button>
    <button
      className="btn btn-success w-100"
      onClick={() => onSeleccionarOpcion("carrito")}
    >
      Carrito
    </button>
  </div>
);

export default MenuPrincipal;
