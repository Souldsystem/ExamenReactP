/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteProducto = onRequest(async (req, res) => {
  const productoId = req.body.productoId;

  if (!productoId) {
    res.status(400).send({ error: "productoId es requerido" });
    return;
  }

  try {
    await admin.firestore().collection("productos").doc(productoId).delete();
    res.status(200).send({ success: true, message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
