document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".ranking");

    fetch("json/Ranking.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // Colores según posición
                let color = "#804d00"; // default
                if(item.posicion === 1) color = "#ffc107";
                else if(item.posicion === 2) color = "#c0c0c0";
                else if(item.posicion === 3) color = "#ab6004";
                else if(item.posicion >= 9) color = "#9e0c0c";

                const div = document.createElement("div");
                div.classList.add("item");
                div.innerHTML = `
                    <div class="position" style="background-color: ${color};">#${item.posicion}</div>
                    <img class="cover" src="${item.img}" alt="${item.title}">
                    <div class="info">
                        <div class="title">${item.title}</div>
                        <div class="author">${item.autor}</div>
                    </div>
                    <div class="popularity">${item.popularidad}</div>
                `;
                contenedor.appendChild(div);
            });
        })
        .catch(error => console.error("Error cargando ranking:", error));
});
