const cheerio = require("cheerio")
const axios = require("axios")

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

module.exports = {
  parsePage,
  pullPage,
}