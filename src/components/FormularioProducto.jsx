import React, { useState } from "react";
import { storage, firestore } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

const FormularioProducto = ({ onProductoAgregado }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "", 
    imagen: null,
  });
  const [validator] = useState(new SimpleReactValidator());
  const [error, setError] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
    validator.showMessageFor(name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProducto((prev) => ({ ...prev, imagen: file }));
    setImagenPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validator.allValid()) {
      setError("Por favor, complete todos los campos correctamente.");
      return;
    }

    setError(null);

    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        const additionalData = response.data; 
        
      const storageRef = ref(storage, `imagenes/${producto.imagen.name}`);
      const uploadTask = uploadBytesResumable(storageRef, producto.imagen);

      uploadTask.on(
        "state_changed",
        null,
        (err) => setError(err.message),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);

          const nuevoProducto = { ...producto, imagen: url, additionalInfo: additionalData, };
          const docRef = await addDoc(collection(firestore, "productos"), nuevoProducto);

          onProductoAgregado({ id: docRef.id, ...nuevoProducto });
          setProducto({ nombre: "", descripcion: "", precio: "", imagen: null });
          setImagenPreview(null);
        }
      );
    } catch (error) {
      setError("Error al agregar el producto. Intente de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Nombre del Producto</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          className="form-control"
        />
        {validator.message("nombre", producto.nombre, "required|alpha_num_space")}
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          className="form-control"
        ></textarea>
        {validator.message("descripcion", producto.descripcion, "required|min:10|max:100")}
      </div>

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          className="form-control"
        />
        {validator.message("precio", producto.precio, "required|numeric")}
      </div>

      <div className="mb-3">
        <label className="form-label">Imagen del Producto</label>
        <input type="file" onChange={handleFileChange} className="form-control" />
        {imagenPreview && <img src={imagenPreview} alt="Preview" className="img-thumbnail mt-3" />}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Agregar Producto
      </button>
    </form>
  );
};

export default FormularioProducto;
