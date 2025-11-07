import { numberId, capitalizador, mayus } from "./utilitys.js";

const pokemonCard = document.querySelector(".pokedex");

export function cardCreator(data) {
  let card = document.createElement("article");
  card.className = "card-pokedex";
  card.innerHTML = `
    <header class="card-header">
            <h2 id="nombre-pokemon">${capitalizador(data.name)}</h2>
            <p id="nombre-pokemon">#${numberId(data.id)}</p>
          </header>
          <figure class="card-image">
            <img src="${
              data.sprites.other["official-artwork"].front_default
            }" alt="imagen-de-pokemon" id="imagen-pokemon" loading="lazy" />
          </figure>
  `;

  const cardContent = document.createElement("div");
  cardContent.className = "card-content";

  data.types.forEach((tipo) => {
    let parrafo = document.createElement("p");
    let tipoNombre = tipo.type.name;

    parrafo.textContent = mayus(tipoNombre);
    parrafo.classList.add("type", tipoNombre);

    parrafo.style.backgroundColor = `var(--${tipoNombre})`;
    parrafo.addEventListener("mouseover", function () {
      parrafo.style.backgroundColor = `var(--light-${tipoNombre})`;
    });
    parrafo.addEventListener("mouseout", function () {
      parrafo.style.backgroundColor = `var(--${tipoNombre})`;
    });

    cardContent.appendChild(parrafo);
  });

  card.appendChild(cardContent);

  pokemonCard.appendChild(card);
}
