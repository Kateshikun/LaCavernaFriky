// ===== Cargar carrito desde localStorage o iniciar vacío =====
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Guardar en localStorage
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Cambiar imagen principal
  function cambiarImagen(src) {
    document.getElementById("imagenPrincipal").src = src;
  }

  // Agregar producto
  function agregarAlCarrito(id, nombre, precio) {
    let producto = carrito.find(item => item.id === id);

    if (producto) {
      producto.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarrito();
    alert(nombre + " se agregó al carrito ✅");
  }

  // Eliminar producto
  function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarCarrito();
  }

  // Actualizar contador y lista
  function actualizarCarrito() {
    let totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    // Actualizar contador si existe en la página
    let contador = document.getElementById("contadorCarrito");
    if (contador) contador.textContent = totalProductos;

    // Actualizar lista si existe en la página
    let contenedor = document.getElementById("listaCarrito");
    if (contenedor) {
      contenedor.innerHTML = "";
      carrito.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
          <p><strong>${item.nombre}</strong> - $${item.precio} x ${item.cantidad}</p>
          <button onclick="eliminarDelCarrito(${item.id})">❌ Quitar</button>
        `;
        contenedor.appendChild(div);
      });
    }
  }

  // Ejecutar al cargar la página
  window.onload = actualizarCarrito;