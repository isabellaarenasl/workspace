import { useState } from "react";

function App() {

  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState("");

  // =====================================
  // FUNCIONES
  // =====================================

  function sumar(a, b) {
    return a + b;
  }

  function restar(a, b) {
    return a - b;
  }

  function multiplicar(a, b) {
    return a * b;
  }

  function dividir(a, b) {
    return a / b;
  }

  // =====================================
  // EVENTOS
  // =====================================

  function handleSuma() {
    setResultado(sumar(Number(numero1), Number(numero2)));
  }

  function handleResta() {
    setResultado(restar(Number(numero1), Number(numero2)));
  }

  function handleMultiplicacion() {
    setResultado(multiplicar(Number(numero1), Number(numero2)));
  }

  function handleDivision() {
    setResultado(dividir(Number(numero1), Number(numero2)));
  }

  function handleLimpiar() {
    setNumero1("");
    setNumero2("");
    setResultado("");
  }

  // =====================================
  // ESTILOS
  // =====================================

  const containerStyle = {
    padding: "40px",
    width: "350px",
    margin: "50px auto",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    border: "2px solid #ccc",
    textAlign: "center",
  };

  const inputStyle = {
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid gray",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#3498db",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
  };

  return (
    <div style={containerStyle}>
      <h1>Calculadora React</h1>

      <input
        type="number"
        placeholder="Número 1"
        value={numero1}
        onChange={(e) => setNumero1(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Número 2"
        value={numero2}
        onChange={(e) => setNumero2(e.target.value)}
        style={inputStyle}
      />

      <br />

      <button
        style={buttonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
        onClick={handleSuma}
      >
        Sumar
      </button>

      <button
        style={buttonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
        onClick={handleResta}
      >
        Restar
      </button>

      <button
        style={buttonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
        onClick={handleMultiplicacion}
      >
        Multiplicar
      </button>

      <button
        style={buttonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
        onClick={handleDivision}
      >
        Dividir
      </button>

      <button
        style={buttonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = "#e74c3c"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
        onClick={handleLimpiar}
      >
        Limpiar
      </button>

      <h2>Resultado: {resultado}</h2>
    </div>
  );
}

export default App;