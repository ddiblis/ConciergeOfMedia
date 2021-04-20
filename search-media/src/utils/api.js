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
  seriesName = seriesName.replace(" ", "-")
  const url = `${API_BASE_URL}/manga/mangaraw?sn=${seriesName}`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getNelo(seriesName, signal){
  seriesName = seriesName.replace(" ", "-")
  const url = `${API_BASE_URL}/manga/manganelo?sn=${seriesName}`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

export async function getFast(seriesName, signal){
  seriesName = seriesName.replace(" ", "-")
  const url = `${API_BASE_URL}/manga/mangafast?sn=${seriesName}`
  const options = {
    headers,
    signal,
    mode: "cors",
  }
  return await (await axios.get(url, options)).data.data
}

// export function
