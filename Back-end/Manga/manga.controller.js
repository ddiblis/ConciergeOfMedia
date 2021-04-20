const axios = require("axios");
const cheerio = require("cheerio");

function hasSeriesName(req, res, next) {
  const error = { status: 402, message: "Series name 'sn' required in query" };
  const { sn } = req.query;
  if (!sn) next(error);
  next();
}

const parsePage = (_, a) => {
  const $ = cheerio.load(a);
  const img = $("img");

  return {
    series_name: img.attr("alt"),
    image_url: img.attr("src"),
    series_url: $("a").attr("href"),
  };
};

const pullPage = async (url, pageNum) => {
  const pageURL = url + `?page=${pageNum}`;
  const { data } = await axios.get(pageURL);
  const $ = cheerio.load(data);

  return await Promise.all($("div.story_item").map(parsePage));
};

async function getMangaRaw(req, res) {
  const { sn } = req.query;
  const seriesName = sn.replace("-", "+");
  const url = `https://mangaraw.org/search?s=${seriesName}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const series = await Promise.all($("div.bsx").map(parsePage));
  res.json({ data: series });
}

async function getManganelo(req, res) {
  const { sn } = req.query;
  const seriesName = sn.replace("-", "_");
  const url = `https://mangakakalot.com/search/story/${seriesName}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  let last = $("a.page_last").attr("href");
  let pages;
  let objs;

  last
    ? ((last = new URL(last).searchParams.get("page")),
      (pages = [...new Array(Number(last)).keys()].map((i) => i + 1)),
      (objs = await Promise.all(pages.map((num) => pullPage(url, num)))))
    : (objs = await Promise.all($("div.story_item").map(parsePage)));

  res.json({ data: objs.flat() });
}

async function getMangaFast(req, res) {
  const { sn } = req.query;
  const seriesName = sn.replace("-", "+");
  let num = 1;
  let $;
  const series = [];

  do {
    const url = `https://mangafast.net/page/${num}/?s=${seriesName}`;
    const { data } = await axios.get(url);
    $ = cheerio.load(data);
    series.push(await Promise.all($("div.ls4v").map(parsePage)));
    num += 1;
  } while ($("div.d-inline-block").text().trim() !== "None");

  res.json({ data: series.flat() });
}

module.exports = {
  getRaw: [hasSeriesName, getMangaRaw],
  getNelo: [hasSeriesName, getManganelo],
  getFast: [hasSeriesName, getMangaFast],
};
