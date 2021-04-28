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
  const [genre, setGenre] = useState("")
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
    setGenre(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    getRaw(seriesName).then(setMangaraw);

    getNelo(seriesName).then(setManganelo);

    getFast(seriesName).then(setMangafast);

    getExtra(seriesName).then(setComicsextra);

    getView(seriesName).then(setViewcomics);

    //   getToons(seriesName)
    //     .then(setWebtoons)
  }

  const websites = [
    { list: mangaraw, name: "Manga Raw", value: checks.raw, genre: "Eastern" },
    { list: manganelo, name: "Manga Kakalot", value: checks.nelo, genre: "Eastern" },
    { list: mangafast, name: "Manga Fast", value: checks.fast, genre: "Eastern" },
    { list: comicextra, name: "Comic Extra", value: checks.extra, genre: "Western" },
    { list: viewcomics, name: "View Comics", value: checks.view, genre: "Western" },
  ];

  if(genre !== "") {
    websites.sort(a => a.genre === genre ? -1 : 1)
  }

  console.log(websites)

  return (
    <>
      <Bar handleChange={handleChange} handleSubmit={handleSubmit} />

      <div className={"App-body"}>
        <DropDown handleCheckbox={handleCheckbox} checks={checks} handleRadio={handleRadio} genre={genre} />

        {websites.map((site) =>
          site.value ? (
            <GenerateGrid mangaList={site.list} websiteName={site.name} />
          ) : null
        )}

      </div>
    </>
  );
}
