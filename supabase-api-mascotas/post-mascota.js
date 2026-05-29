import { BASE_URL, headers } from "./config.js";

async function crearMascota() {
  try {
    console.log("Creando mascota...");

    const nuevaMascota = {
      nombre: "Toby",
      tipo: "Perro",
      edad: 4,
      duenio: "Mariana",
      vacunado: true,
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify(nuevaMascota),
    });

    const data = await response.json();

    console.log("Mascota creada:");
    console.table(data);
  } catch (error) {
    console.log("Error:");
    console.log(error);
  }
}

crearMascota();