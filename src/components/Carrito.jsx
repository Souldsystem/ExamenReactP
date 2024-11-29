import React, { useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

const Carrito = ({ productos, onVolverAlMenu, usuarioId }) => {
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const carritoRef = collection(firestore, "carrito");
        const q = query(carritoRef, where("usuarioId", "==", usuarioId));
        const querySnapshot = await getDocs(q);

        const carritoProductos = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setCarrito(carritoProductos);
      } catch (error) {
        setError("Error al cargar el carrito: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrito();
  }, [usuarioId]);

 
  const agregarAlCarrito = async (producto) => {
    try {
      const carritoRef = collection(firestore, "carrito");

      const nuevoProducto = {
        productoId: producto.id, 
        usuarioId, 
        cantidad: 1, 
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.imagen,
      };

      const docRef = await addDoc(carritoRef, nuevoProducto);

      setCarrito((prev) => [
        ...prev,
        { id: docRef.id, ...nuevoProducto }, 
      ]);
    } catch (error) {
      setError("Error al agregar el producto al carrito: " + error.message);
    }
  };

  
  const eliminarDelCarrito = async (idUnico) => {
    try {
      const docRef = doc(firestore, "carrito", idUnico); 
      await deleteDoc(docRef);

      setCarrito((prev) => prev.filter((item) => item.id !== idUnico));
    } catch (error) {
      setError("Error al eliminar el producto del carrito: " + error.message);
    }
  };


  const total = carrito.reduce((acc, producto) => {
    const precio = parseFloat(producto.precio) || 0;
    return acc + precio * (producto.cantidad || 1);
  }, 0);

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={onVolverAlMenu}>
        Volver al Menú Principal
      </button>

      <h3 className="text-center">Carrito</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          <div className="col-12">
            <h4>Productos Disponibles</h4>
            <ul className="list-group mb-4">
              {productos.map((producto) => (
                <li
                  key={producto.id} 
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="img-thumbnail"
                      style={{ width: "50px" }}
                    />
                    <strong>{producto.nombre}</strong> - ${producto.precio}
                    <p>{producto.descripcion}</p>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Añadir al Carrito
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12">
            <h4>Productos en el Carrito</h4>
            <ul className="list-group">
              {carrito.length === 0 ? (
                <li className="list-group-item">El carrito está vacío</li>
              ) : (
                carrito.map((producto) => (
                  <li
                    key={producto.id} 
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-thumbnail"
                        style={{ width: "50px" }}
                      />
                      {producto.nombre} - ${producto.precio}
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarDelCarrito(producto.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))
              )}
            </ul>
            <h4 className="mt-4">Total: ${total}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
