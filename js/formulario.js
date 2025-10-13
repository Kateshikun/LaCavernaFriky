// Para que aparesca un mensaje de confirmación al enviar el formulario

function comprobarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let sugerencia = document.getElementById("sugerencia").value;

    if (nombre === "" || apellido === "" || correo === "" || sugerencia === "") {
        alert("Por favor, completa todos los campos obligatorios.");
        return false; // Evita el envío del formulario
    }

    return true; // Permite el envío del formulario
}

document.getElementById("botonSugerencia").addEventListener("click", confirmarEnvio);
    
function confirmarEnvio(e) {
    e.preventDefault();
    if (comprobarFormulario()) {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    alert ("¡Gracias por tu sugerencia " + nombre + " " + apellido + "!\nNos pondremos en contacto contigo a través de tu correo: " + correo);
    }
};

