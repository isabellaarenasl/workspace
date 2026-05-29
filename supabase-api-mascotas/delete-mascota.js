import { BASE_URL, headers } from "./config.js";

async function eliminarMascota(id) {
  try {
    console.log("Eliminando mascota...");

    const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers,
    });

    console.log("Código de respuesta:");
    console.log(response.status);
  } catch (error) {
    console.log("Error:");
    console.log(error);
  }
}

eliminarMascota(1);