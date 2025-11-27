async function cargarEpisodios() {
    let pagina = 1;
    const url = "https://thesimpsonsapi.com/api/episodes?page=";

    let temporadasPorAño = {};
    let episodiosPorAño = {};

    while (pagina <= 39) { 
        let response = await fetch(url + pagina);
        let data = await response.json();

        data.results.forEach(ep => {
            if (!ep.airdate) return;
            let año = ep.airdate.split("-")[0];
            let season = ep.season;           
            if (!temporadasPorAño[año]) temporadasPorAño[año] = new Set();
            temporadasPorAño[año].add(season);

            if (!episodiosPorAño[año]) episodiosPorAño[año] = 0;
            episodiosPorAño[año]++;
        });

        pagina++;
    }

    construirYMostrarTabla(temporadasPorAño, episodiosPorAño);
}

function construirYMostrarTabla(temporadasPorAño, episodiosPorAño) {
    let datosTabla = Object.keys(episodiosPorAño).map(año => ({
        año: año,
        temporadas: temporadasPorAño[año].size,
        episodios: episodiosPorAño[año]
    }));

    datosTabla.sort((a, b) => b.episodios - a.episodios);

    mostrarTabla(datosTabla);
}

function mostrarTabla(datos) {
    const tbody = document.querySelector("#tabla tbody");
    tbody.innerHTML = "";

    datos.forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${d.año}</td>
            <td>${d.temporadas}</td>
            <td>${d.episodios}</td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById("btnInicio").addEventListener("click", () => {
    window.location.href = "../index.html";
});

cargarEpisodios();