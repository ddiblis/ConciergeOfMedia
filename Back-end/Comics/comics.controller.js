const { ripExtra, ripView, ripNelo, ripRaw, ripFast, ripToons  } = require("./comics.services");

// Error handlers
function hasSeriesName(req, res, next) {
  const error = { status: 402, message: "Series name 'sn' required in query" };
  const { sn } = req.query;
  if (!sn) next(error);
  next();
}

// Get requests
async function getMangaRaw(req, res) {
  const { sn, download } = req.query;
  let data

  download ? data = await ripRaw(sn) : res.send("download page")
  
  res.json({ data });
}

async function getManganelo(req, res) {
  const { sn } = req.query;
  const data = await ripNelo(sn)

  res.json({ data });
}

async function getMangaFast(req, res) {
  const { sn } = req.query;
  const data = await ripFast(sn)

  res.json({ data });
}

async function getComicExtra(req, res){
  const { sn } = req.query;
  const data = await ripExtra(sn)

  res.json({ data });
}

async function getViewComics(req, res){
  const { sn } = req.query;
  const data = await ripView(sn)

  res.json({ data });
}

async function getWebToons(req, res){
  const { sn } = req.query;
  const data = await ripToons(sn)

  res.json({ data });
}

module.exports = {
  getRaw: [hasSeriesName, getMangaRaw],
  // downloadRaw: [hasSeriesName, downRaw],
  getNelo: [hasSeriesName, getManganelo],
  getFast: [hasSeriesName, getMangaFast],
  getExtra: [hasSeriesName, getComicExtra],
  getView: [hasSeriesName, getViewComics],
  getToons: [hasSeriesName, getWebToons],

}