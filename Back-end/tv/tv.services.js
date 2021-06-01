const axios = require("axios");
const cheerio = require("cheerio");

async function ripSolar(seriesName, list=[], num=1) {
  seriesName = seriesName.replace(/-/g, "%20")
  const url = `https://ww1.solarmovie.cr/search/${seriesName}/${num}`
  const { data } = await axios.get(url)
  let $ = cheerio.load(data)

  if($("div.movies-list-full").text().trim() === "No results"){
    return list
  }

  list.push(await Promise.all($("div.ml-item").map((_, a) => {
    $ = cheerio.load(a)
    const img = $("img")
    return {
      "series_name": img.attr("alt"),
      "image_url": `https://ww1.solarmovie.cr${img.attr("src")}`,
      "series_url": `https://ww1.solarmovie.cr${$("a").attr("href")}`,
    }
  })))

  const series = await ripSolar(seriesName, list, num+=1)

  return list.flat()
}

async function rip123(seriesName, list=[], num=1) {
  seriesName = seriesName.replace(/-/g, "%2b")
  const url = `https://movies123.yoga/search/${seriesName}/${num}`
  const { data } = await axios.get(url)
  let $ = cheerio.load(data)

  if($("div.not-found").text().trim() === ":(Look like we found nothing. :(BACK TO HOME"){
    return list
  }

  list.push(await Promise.all($("div.ml-item").map((_, a) => {
    $ = cheerio.load(a)
    const img = $("img")
    return {
      "series_name": img.attr("alt"),
      "image_url": img.attr("data-original"),
      "series_url": `https://movies123.yoga${$("a").attr("href")}`,
    }
  })))

  const series = await rip123(seriesName, list, num+=1)

  return list.flat()
}

async function ripKiss(seriesName, list=[], num=1) {
  seriesName = seriesName.replace(/-/g, "%20")
  const url = `https://kissanime.com.ru/Search/?s=${seriesName}&page=${num}`
  const { data } = await axios.get(url)
  let $ = cheerio.load(data)


  if($("a.thumb_in_cat").length === 0){
    return list
  }

  list.push(await Promise.all($("a.thumb_in_cat").map((_, a) => {
    $ = cheerio.load(a)
    const img = $("img")
    return {
      "series_name": img.attr("alt").replace(/(?:<em>|<\/em>)/g, ""),
      "image_url": img.attr("src"),
      "series_url": a.attribs.href
      }
  })))

  const series = await ripKiss(seriesName, list, num+=1)

  return list.flat()
}

async function ripHeaven(seriesName, list=[], num=1) {
  seriesName = seriesName.replace(/-/g, "+")
  const url = `https://animeheaven.ru/search?q=${seriesName}&page=${num}`
  const { data } = await axios.get(url)
  let $ = cheerio.load(data)

  if($("div.iep").length === 0) return list

  list.push(await Promise.all($("div.iep").map((_, a) => {
    $ = cheerio.load(a)
    const img = $("img")
    return {
      "series_name": img.attr("alt").replace(/(?:<em>|<\/em>)/g, ""),
      "image_url": img.attr("src"),
      "series_url": $("a").attr("href"),
    }
  })))
  
  const series = await ripHeaven(seriesName, list, num+=1)

  return list.flat()
}


module.exports = {
  ripSolar,
  rip123,
  ripKiss,
  ripHeaven,
}