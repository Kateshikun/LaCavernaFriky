document.getElementById("formFactura").addEventListener("submit", function(e) {
    e.preventDefault();

    // -------------------------
    // Generar datos de la factura
    // -------------------------
    let id = Math.floor(Math.random() * 1000000);
    let fecha = new Date().toLocaleString();
    document.getElementById("idCompra").textContent = id;
    document.getElementById("fechaHora").textContent = fecha;
    document.getElementById("clienteNombre").textContent = document.getElementById("nombre").value;
    document.getElementById("clienteTelefono").textContent = document.getElementById("telefono").value;
    document.getElementById("clienteDireccion").textContent = document.getElementById("direccion").value;

    let listaFactura = document.getElementById("facturaProductos");
    listaFactura.innerHTML = "";
    carrito.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
        listaFactura.appendChild(li);
    });

    let total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    document.getElementById("facturaTotal").textContent = total.toFixed(2);
    document.getElementById("facturaGenerada").style.display = "block";

    // -------------------------
    // Generar PDF estilizado
    // -------------------------
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Encabezado azul
    doc.setFillColor(52, 152, 219);
    doc.rect(0, 0, 210, 30, 'F'); 
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("Factura de Compra", 105, 20, { align: "center" });

    // Datos del cliente
    doc.setFontSize(12);
    doc.setTextColor(0,0,0);
    let y = 40;
    doc.text(`ID de compra: ${id}`, 20, y);
    doc.text(`Fecha y hora: ${fecha}`, 140, y, { align: "right" });

    y += 10;
    doc.text(`Cliente: ${document.getElementById("nombre").value}`, 20, y);
    y += 7;
    doc.text(`Teléfono: ${document.getElementById("telefono").value}`, 20, y);
    y += 7;
    doc.text(`Dirección: ${document.getElementById("direccion").value}`, 20, y);

    // Tabla de productos
    y += 15;
    doc.setFillColor(236, 240, 241);
    doc.rect(20, y-5, 170, 8, 'F'); 
    doc.setFontSize(12);
    doc.setTextColor(0,0,0);
    doc.text("Producto", 25, y);
    doc.text("Cantidad", 130, y);
    doc.text("Precio", 180, y, { align: "right" });

    y += 5;
    carrito.forEach(item => {
        y += 10;
        doc.text(item.nombre, 25, y);
        doc.text(`${item.cantidad}`, 130, y);
        doc.text(`$${(item.precio*item.cantidad).toFixed(2)}`, 180, y, { align: "right" });
    });

    // Total final con fondo gris
    y += 15;
    doc.setFillColor(236, 240, 241);
    doc.rect(20, y-5, 170, 10, 'F');
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${total.toFixed(2)}`, 180, y, { align: "right" });

    // Guardar PDF
    doc.save(`Factura_${id}.pdf`);

    // -------------------------
    // Limpiar carrito
    // -------------------------
    carrito = []; // Vaciar array
    document.getElementById("listaCarrito").innerHTML = ""; // Limpiar visual
    document.getElementById("contadorCarrito").textContent = "0"; // Reiniciar contador
    document.getElementById("totalCompra").textContent = "$0.00"; // Reiniciar total
});
