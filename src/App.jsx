import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  // 1. Estados (useState) para guardar lo que el usuario escribe en cada caja
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  // 2. Estados para mostrar el cartel de "Enviando..." o "Éxito"
  const [estadoEnvio, setEstadoEnvio] = useState("");
  const [enviando, setEnviando] = useState(false);

  // 3. Función que se ejecuta al enviar el formulario
  function enviarCorreo(evento) {
    // Evita que la página se recargue sola
    evento.preventDefault();
    setEnviando(true);
    setEstadoEnvio("⏳ Enviando mensaje...");

    // 👇 PEGA AQUÍ TUS 3 CÓDIGOS DE EMAILJS ENTRE LAS COMILLAS:
    const SERVICE_ID = "TU_SERVICE_ID";
    const TEMPLATE_ID = "TU_TEMPLATE_ID";
    const PUBLIC_KEY = "TU_PUBLIC_KEY";

    // Estos nombres (title, name, email, message) coinciden 100% con tu captura de EmailJS
    const parametrosPlantilla = {
      title: "Consulta Web UPATecO", // Rellena {{title}} en el Subject
      name: nombre,                  // Rellena {{name}} en From Name y en el cuerpo
      email: correo,                 // Rellena {{email}} en Reply To
      message: mensaje,              // Rellena {{message}} en el contenido
    };

    // Enviamos el correo usando EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, parametrosPlantilla, PUBLIC_KEY)
      .then(() => {
        setEstadoEnvio("✅ ¡Mensaje enviado con éxito a tu correo!");
        // Vaciamos las cajas del formulario
        setNombre("");
        setCorreo("");
        setMensaje("");
        setEnviando(false);
      })
      .catch((error) => {
        console.error("Error al enviar:", error);
        setEstadoEnvio("❌ Error al enviar. Verifica tus 3 códigos de EmailJS.");
        setEnviando(false);
      });
  }

  return (
    <div className="contenedor-principal">
      <header className="encabezado">
        <h1>Universidad Provincial UPATecO</h1>
        <p>Portal de Contacto e Información de Ubicación - Programación Web II</p>
      </header>

      <main className="seccion-contacto">
        {/* COLUMNA IZQUIERDA: Formulario de Contacto */}
        <div className="columna-formulario">
          <h2>📩 Envíanos tu consulta</h2>
          <form onSubmit={enviarCorreo}>
            <div className="grupo-input">
              <label>Nombre completo:</label>
              <input
                type="text"
                placeholder="Ej: Luis Gallardo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="grupo-input">
              <label>Tu correo electrónico:</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="grupo-input">
              <label>Mensaje:</label>
              <textarea
                placeholder="Escribe tu consulta aquí..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="boton-enviar" disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar Mensaje"}
            </button>

            {estadoEnvio && <p className="mensaje-estado">{estadoEnvio}</p>}
          </form>
        </div>

        {/* COLUMNA DERECHA: Mapa de la Universidad UPATecO */}
        <div className="columna-mapa">
          <h2>📍 Nuestra Ubicación (UPATecO)</h2>
          <iframe
            title="Ubicación Universidad UPATecO"
            className="marco-mapa"
            src="https://www.google.com/maps?q=Universidad+Provincial+de+Administracion+Tecnologia+y+Oficios+UPATecO+Salta&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
    </div>
  );
}

export default App;
