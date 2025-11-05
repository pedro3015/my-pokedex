export function numberId(data) {
  let dataID = data.toString();
  return dataID.padStart(3, "0");
}

export function capitalizador(data) {
  let nombre = data.toString();
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
}

export function mayus(data) {
  return data.toUpperCase();
}
