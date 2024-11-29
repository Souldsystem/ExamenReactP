import React, { useState, useEffect } from "react";
import { firestore } from "./firebaseConfig"; // Asegúrate de importar la configuración de Firestore
import { collection, getDocs } from "firebase/firestore";
import Login from "./components/Login";
import MenuPrincipal from "./components/MenuPrincipal";
import CrudProductos from "./components/CrudProductos";
import Carrito from "./components/Carrito";

const App = () => {
  const [vista, setVista] = useState("login");
  const [productos, setProductos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);

  // Cargar los productos desde Firestore
  const cargarProductos = async () => {
    try {
      const productosSnapshot = await getDocs(collection(firestore, "productos"));
      const productosData = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filtrar productos incompletos
      const productosCompletos = productosData.filter(
        (producto) => producto.nombre && producto.descripcion && producto.precio && producto.imagen
      );
      setProductos(productosCompletos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  // Cargar los productos al entrar en las vistas correspondientes
  useEffect(() => {
    if (vista === "productos" || vista === "carrito") {
      cargarProductos();
    }
  }, [vista]);

  const handleLoginSuccess = () => setVista("menu");
  const handleSeleccionarOpcion = (opcion) => setVista(opcion);

  const handleSetUsuarioId = (id) => {
    setUsuarioId(id);
  };

  return (
    <div>
      {vista === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} onSetUsuarioId={handleSetUsuarioId} />
      )}
      {vista === "menu" && <MenuPrincipal onSeleccionarOpcion={handleSeleccionarOpcion} />}
      {vista === "productos" && (
        <CrudProductos
          onProductoAgregado={cargarProductos} // Refrescar lista de productos tras agregar uno nuevo
          onVolverAlMenu={() => setVista("menu")}
        />
      )}
      {vista === "carrito" && (
        <Carrito
          productos={productos} // Pasar los productos disponibles
          onVolverAlMenu={() => setVista("menu")}
          usuarioId={usuarioId} // Pasar el ID del usuario
        />
      )}
    </div>
  );
};

export default App;
