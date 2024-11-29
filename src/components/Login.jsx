import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import AlertBox from "./AlertBox";

const Login = ({ onLoginSuccess , onSetUsuarioId}) => {
  const [currentForm, setCurrentForm] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setAlert({ type: "danger", message: "Por favor, ingrese todos los campos." });
      return;
    }

    if (!validateEmail(email)) {
      setAlert({ type: "danger", message: "Por favor, ingresa un correo válido." });
      return;
    }

    setLoading(true);
    try {
        const userCredential =  await signInWithEmailAndPassword(auth, email, password);
      const usuarioId = userCredential.user.uid; 
      resetForm();
      onSetUsuarioId(usuarioId); 
      onLoginSuccess();
    } catch (err) {
      setAlert({ type: "danger", message: "Correo o contraseña incorrectos." });
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setAlert({ type: "danger", message: "Por favor, ingresa todos los campos." });
      return;
    }

    if (!validateEmail(email)) {
      setAlert({ type: "danger", message: "Por favor, ingresa un correo válido." });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Las contraseñas no coinciden." });
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAlert({ type: "success", message: "Usuario registrado con éxito." });
      resetForm();
    } catch (err) {
      setAlert({ type: "danger", message: err.message });
    }
    setLoading(false);
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setAlert({ type: "danger", message: "Por favor ingresa un correo válido." });
      return;
    }

    if (!validateEmail(email)) {
      setAlert({ type: "danger", message: "Por favor, ingresa un correo válido." });
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setAlert({
        type: "success",
        message: "Correo de recuperación enviado. Revisa tu bandeja de entrada.",
      });
      resetForm();
    } catch (err) {
      setAlert({ type: "danger", message: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        {alert && (
          <AlertBox
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        {currentForm === "login" && (
          <div>
            <h3 className="text-center">Iniciar Sesión</h3>
            <div className="mb-3">
              <label>Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loading}>
              {loading ? "Cargando..." : "Entrar"}
            </button>
            <p className="mt-3 text-center">
              ¿No tienes cuenta?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setCurrentForm("register")}
              >
                Regístrate aquí
              </button>
            </p>
            <p className="text-center">
              <button
                className="btn btn-link p-0"
                onClick={() => setCurrentForm("passwordReset")}
              >
                Recuperar contraseña
              </button>
            </p>
          </div>
        )}
        {currentForm === "register" && (
          <div>
            <h3 className="text-center">Registrar Cuenta</h3>
            <div className="mb-3">
              <label>Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleRegister} disabled={loading}>
              {loading ? "Cargando..." : "Registrar"}
            </button>
            <p className="mt-3 text-center">
              ¿Ya tienes cuenta?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setCurrentForm("login")}
              >
                Inicia sesión
              </button>
            </p>
          </div>
        )}
        {currentForm === "passwordReset" && (
          <div>
            <h3 className="text-center">Recuperar Contraseña</h3>
            <div className="mb-3">
              <label>Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-warning w-100" onClick={handlePasswordReset} disabled={loading}>
              {loading ? "Cargando..." : "Enviar Correo"}
            </button>
            <p className="mt-3 text-center">
              <button
                className="btn btn-link p-0"
                onClick={() => setCurrentForm("login")}
              >
                Volver al inicio
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
