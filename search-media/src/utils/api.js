import axios from "axios";
import cheerio from "cheerio";

const headers = new Headers();
headers.append(
  "User-Agent",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36"
);

export async function getSeries(seriesName, signal) {
  const url = `https://mangaraw.org/search?s=${seriesName}`;
  headers.append("Referer", "https://mangaraw.org/");
  headers.append("Access-Control-Allow-Origin", "https://mangaraw.org/")
  const options = {
    headers, 
    signal,
    mode: "cors",
  }
  const info = [];
  const { data } = await axios.get(url, options, []);
  const $ = await cheerio.load(data);
  $("div.bsx").each(async (i, a) => {
    const $$ = await cheerio.load(a);
    const img = $$("img");
    info.push({
      Series: $$("a").attr("href"),
      ImgLink: img.attr("src"),
      SeriesName: img.attr("alt"),
    });
  });
  return info;
}

// export function
