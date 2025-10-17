document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("populares-container");

  function crearCard(comic) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <a href="${comic.url}">
        <img src="${comic.imagen}" alt="${comic.titulo}">
      </a>
      <div class="content">
        <div class="tag" style="background-color:${comic.color};">${comic.tipo}</div>
        <div class="title">${comic.titulo}</div>
        <div class="tag">${comic.estado}</div>
        <span style="color: rgb(225, 4, 4);">•</span>
        <div class="meta">${comic.anio}</div>
      </div>
    `;
    return card;
  }

  fetch("comicsPopulares.json")
    .then(res => res.json())
    .then(data => {
      contenedor.innerHTML = "";
      data.forEach(comic => contenedor.appendChild(crearCard(comic)));
    })
    .catch(err => console.error("Error cargando cómics:", err));
});
