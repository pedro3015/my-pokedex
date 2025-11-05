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
      cardCreator(data);
    }
    return;
  }

  const data = await obtenerDatosPokemon(buscadorNombre);
  pokemonCard.innerHTML = "";
  console.log(data);
  cardCreator(data);
});

async function mostrarPokemon() {
  for (let index = 1; index < 12 + 1; index++) {
    const pokedata = await obtenerDatosPokemon(index);
    cardCreator(pokedata);
  }
}

mostrarPokemon();
