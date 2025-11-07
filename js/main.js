import { obtenerDatosPokemon, obtenerTiposPokemon } from "./apiHandler.js";
import { cardCreator } from "./cardCreator.js";

const buscador = document.getElementById("buscadorNombre");
const buscadorTipo = document.getElementById("buscadorTipo");
const pokemonCard = document.querySelector(".pokedex");

buscador.addEventListener("input", async (e) => {
  let buscadorNombre = e.target.value;
  let criterioActual = buscadorTipo.value;

  if (buscadorNombre === "") {
    pokemonCard.innerHTML = "";
    mostrarPokemon();
    return;
  }

  if (criterioActual == "tipo") {
    pokemonCard.innerHTML = "";
    const dataTipo = await obtenerTiposPokemon(buscadorNombre);
    let pokeNombres = [];
    dataTipo.pokemon.forEach((nombre) => {
      pokeNombres.push(nombre.pokemon.name);
    });
    for (const nombre of pokeNombres) {
      const data = await obtenerDatosPokemon(nombre);
      const cardElement = cardCreator(data);
      pokemonCard.appendChild(cardElement);
    }
    return;
  }

  const data = await obtenerDatosPokemon(buscadorNombre);
  pokemonCard.innerHTML = "";
  const cardElement = cardCreator(data);
  pokemonCard.appendChild(cardElement);
});

async function mostrarPokemon() {
  const fetchPromises = [];
  for (let index = 1; index <= 12; index++) {
    fetchPromises.push(obtenerDatosPokemon(index));
  }

  try {
    const allPokedata = await Promise.all(fetchPromises);

    allPokedata.forEach((pokedata, index) => {
      if (pokedata) {
        // Si el índice es 0 (el primer Pokémon), es el LCP
        const isLCP = "high";

        // Pasamos el nuevo argumento a cardCreator
        const cardElement = cardCreator(pokedata, isLCP);

        pokemonCard.appendChild(cardElement);
      }
    });
  } catch (error) {
    console.error("Error al cargar la lista inicial de Pokémon:", error);
  }
}

mostrarPokemon();
