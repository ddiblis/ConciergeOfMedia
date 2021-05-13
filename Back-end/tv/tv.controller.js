const { ripSolar, rip123, ripKiss, ripHeaven } = require("./tv.services")

// Error handlers
function hasSeriesName(req, res, next) {
  const error = { status: 402, message: "Series name 'sn' required in query" };
  const { sn } = req.query;
  if (!sn) next(error);
  next();
}

async function getSolarmovie(req, res){
  const { sn } = req.query
  const data = await ripSolar(sn)
  
  res.json({ data });
}

async function getMovies123(req, res){
  const { sn } = req.query
  const data = await rip123(sn)

  res.json({ data })
}

async function getKissanime(req, res){
  const { sn } = req.query
  const data = await ripKiss(sn)

  res.json({ data })
}

async function getAnimeheaven(req, res){
  const { sn } = req.query
  const data = await ripHeaven(sn)

  res.json({ data })
}

module.exports = {
  getSolar: [hasSeriesName, getSolarmovie],
  get123: [hasSeriesName, getMovies123],
  getKiss: [hasSeriesName, getKissanime],
  getHeaven: [hasSeriesName, getAnimeheaven],
}