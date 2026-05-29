import { BASE_URL, headers } from "./config.js";

async function obtenerMascotas() {
  try {
    console.log("Consultando mascotas...");

    const response = await fetch(BASE_URL, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    console.log("Respuesta de la API:");
    console.table(data);
  } catch (error) {
    console.log("Error:");
    console.log(error);
  }
}

obtenerMascotas();