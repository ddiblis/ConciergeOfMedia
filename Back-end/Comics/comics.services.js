const axios = require("axios");
const cheerio = require("cheerio");

const { parsePage, pullPage } = require("../helpers/helper")

// For mangaraw
async function ripRaw(sn, list=[], num=1){
  const seriesName = sn.replace(/-/g, "+")
  const url = `https://mangaraw.org/search?s=${seriesName}&page=${num}`
  const { data } = await axios.get(url)
  const $ = cheerio.load(data);

  if($("div.bsx").text() === ""){
    return list
  }

  list.push(await Promise.all($("div.bsx").map(parsePage)))

  const series = await ripRaw(seriesName, list, num+=1)

  return list.flat()
}

// for manganelo or mangakakalot
async function ripNelo(sn){
  const seriesName = sn.replace(/-/g, "_");
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

  return objs.flat()
}

// For mangafast
async function ripFast(sn){
  const seriesName = sn.replace(/-/g, "+");
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

  return series.flat()
}

// For comicextra
async function ripExtra(sn, list=[], num=1){
  const seriesName = sn.replace(/-/g, '+')
  const url = `https://www.comicextra.com/comic-search?key=${seriesName}&page=${num}`
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  if($('h3').first().text().trim().includes("Not found")){
    return list
  }

  list.push(await Promise.all($("div.col-lg-8 div.cartoon-box").map(parsePage)))

  const series = await ripExtra(seriesName, list, num += 1)

  return list.flat()
}

// For viewcomics
async function ripView(sn, list=[], num=1){
  const seriesName = sn.replace(/-/g, '%20')
  const url = `https://viewcomics.me/search?keyword=${seriesName}&page=${num}`
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  if($("div.eg-list div.eg-box").text() === ""){
    return list
  }
    
  list.push(await Promise.all($("div.eg-box").map(parsePage)))

  const series = await ripView(seriesName, list, num += 1)

  return list.flat()
}

// For webtoons
async function ripToons(sn){
  const seriesName = sn.replace(/-/g, '+')
  let num = 1
  let $
  const list = []

  do{
    const url = `https://www.webtoons.com/en/search?keyword=${seriesName}&searchType=CHALLENGE&page=${num}`
    const { data } = await axios.get(url)
    $ = cheerio.load(data)
    list.push(await Promise.all($("div.challenge_lst li").map(parsePage)))
    num += 1
  } while(!$("div.card_nodata").text())

  return list.flat()
}

module.exports = {
  ripRaw,
  ripNelo,
  ripFast,
  ripExtra,
  ripView,
  ripToons,
}