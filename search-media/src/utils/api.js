import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append(
  "User-Agent",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36"
);

export async function getRaw(seriesName, signal) {
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/comics/mangaraw?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getNelo(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/comics/manganelo?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getFast(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/comics/mangafast?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getExtra(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/comics/comicextra?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getView(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/comics/viewcomics?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getToons(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/comics/webtoons?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getSolar(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/tv/solarmovie?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function get123(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/tv/movies123?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getKiss(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/tv/kissanime?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getHeaven(seriesName, signal){
  seriesName = seriesName.replace(/ /g, "-")
  const url = `${API_BASE_URL}/tv/animeheaven?sn=${seriesName}&download=false`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}