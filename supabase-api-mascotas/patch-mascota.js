import { BASE_URL, headers } from "./config.js";

async function actualizarMascota(id) {
  try {
    console.log("Actualizando mascota...");

    const cambios = {
      edad: 6,
      vacunado: true,
    };

    const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify(cambios),
    });

    const data = await response.json();

    console.log("Mascota actualizada:");
    console.table(data);
  } catch (error) {
    console.log("Error:");
    console.log(error);
  }
}

actualizarMascota(1);