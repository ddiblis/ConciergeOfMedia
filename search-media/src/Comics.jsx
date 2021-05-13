import { useState } from "react";
import {
  getFast,
  getNelo,
  getRaw,
  getExtra,
  getView,
  // getToons,
} from "./utils/api";
import "./App.css";
import GenerateGrid from "./GenerateGrid";
import Bar from "./Bar";
import DropDown from "./DropDown";

export default function Comics() {
  const [mangaraw, setMangaraw] = useState([]);
  const [manganelo, setManganelo] = useState([]);
  const [mangafast, setMangafast] = useState([]);
  const [comicextra, setComicsextra] = useState([]);
  const [viewcomics, setViewcomics] = useState([]);
  const [seriesName, setSeriesName] = useState("");
  const [genre, setGenre] = useState("");
  const [checks, setChecks] = useState({
    raw: true,
    nelo: true,
    fast: true,
    extra: true,
    view: true,
  });
  // const [webtoons, setWebtoons] = useState([])

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

    checks.raw && getRaw(seriesName).then(setMangaraw);

    checks.nelo && getNelo(seriesName).then(setManganelo);

    checks.fast && getFast(seriesName).then(setMangafast);

    checks.extra && getExtra(seriesName).then(setComicsextra);

    checks.view && getView(seriesName).then(setViewcomics);

    //   getToons(seriesName)
    //     .then(setWebtoons)
  }

  const websites = [
    { list: mangaraw, name: "Manga Raw", genre: "Eastern" },
    { list: manganelo, name: "Manga Kakalot", genre: "Eastern" },
    { list: mangafast, name: "Manga Fast", genre: "Eastern" },
    { list: comicextra, name: "Comic Extra", genre: "Western" },
    { list: viewcomics, name: "View Comics", genre: "Western" },
  ];

  if (genre !== "") {
    websites.sort((a) => (a.genre === genre ? -1 : 1));
  }

  return (
    <>
      <Bar handleChange={handleChange} handleSubmit={handleSubmit} />

      <div className={"App-body"}>
        <DropDown
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
