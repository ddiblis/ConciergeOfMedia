import { useState } from "react";
import {
  getSolar,
  get123,
  getKiss,
  getHeaven,
} from "./utils/api";
import "./App.css";
import GenerateGrid from "./GenerateGrid";
import Bar from "./Bar";
import TvDropDown from "./TvDropDown";

export default function Comics() {
  const [solarmovie, setSolarmovie] = useState([]);
  const [movies123, setMovies123] = useState([]);
  const [kissanime, setKissanime] = useState([]);
  const [animeheaven, setAnimeheaven] = useState([]);
  const [seriesName, setSeriesName] = useState("");
  const [genre, setGenre] = useState("");
  const [checks, setChecks] = useState({
    solar: true,
    onetwothree: true,
    kiss: true,
    heaven: true,
  });

  const handleChange = (event) => {
    setSeriesName(event.target.value);
  };

  const handleCheckbox = (event) => {
    console.log(checks);
    setChecks({ ...checks, [event.target.name]: event.target.checked });
  };

  const handleRadio = (event) => {
    setGenre(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    checks.solar && getSolar(seriesName).then(setSolarmovie);

    checks.onetwothree && get123(seriesName).then(setMovies123);

    checks.kiss && getKiss(seriesName).then(setKissanime);

    checks.heaven && getHeaven(seriesName).then(setAnimeheaven);
  }

  const websites = [
    { list: solarmovie, name: "Solar Movie", genre: "western" },
    { list: movies123, name: "Movies123", genre: "western" },
    { list: kissanime, name: "Kiss Anime", genre: "Eastern" },
    { list: animeheaven, name: "Anime Heaven", genre: "Eastern" },
  ];

  if (genre !== "") {
    websites.sort((a) => (a.genre === genre ? -1 : 1));
  }

  return (
    <>
      <Bar handleChange={handleChange} handleSubmit={handleSubmit} />

      <div className={"App-body"}>
        <TvDropDown
          handleCheckbox={handleCheckbox}
          checks={checks}
          handleRadio={handleRadio}
          genre={genre}
        />

        {websites.map((site, i) => (
          <GenerateGrid key={i} mangaList={site.list} websiteName={site.name} />
        ))}
      </div>
    </>
  );
}
