export async function obtenerDatosPokemon(nombre) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function obtenerTiposPokemon(tipo = "") {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
