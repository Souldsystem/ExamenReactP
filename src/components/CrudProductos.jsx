import React, { useState, useEffect } from "react";
import FormularioProducto from "./FormularioProducto";
import ProductoList from "./ProductoList";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const CrudProductos = ({ onProductoAgregado, onVolverAlMenu }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosSnapshot = await getDocs(collection(firestore, "productos"));
        const productosData = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  return (
    <div className="container mt-4">
   <button className="btn btn-secondary mb-4" onClick={onVolverAlMenu}>
  Volver al Menú Principal
</button>

      <h3 className="text-center">Administrar Productos</h3>

      <FormularioProducto
        onProductoAgregado={(producto) => {
          onProductoAgregado(producto);
          setProductos((prev) => [...prev, producto]);
        }}
      />

      {cargando ? (
        <p className="text-center mt-4">Cargando productos...</p>
      ) : (
        <ProductoList productos={productos} setProductos={setProductos} />
      )}
    </div>
  );
};

export default CrudProductos;
