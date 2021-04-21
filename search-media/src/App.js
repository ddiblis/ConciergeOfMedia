import { useState } from "react";
import {
  getFast,
  getNelo,
  getRaw,
  getExtra,
  getView,
  getToons,
} from "./utils/api";
import "./App.css";
import GenerateGrid from "./GenerateGrid";
import Bar from "./Bar";

export default function App() {
  const [mangaraw, setMangaraw] = useState([]);
  const [manganelo, setManganelo] = useState([]);
  const [mangafast, setMangafast] = useState([]);
  const [comicextra, setComicsextra] = useState([]);
  const [viewcomics, setViewcomics] = useState([]);
  // const [webtoons, setWebtoons] = useState([])
  const [seriesName, setSeriesName] = useState("");

  const handleChange = (event) => {
    setSeriesName(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    getRaw(seriesName).then(setMangaraw);

    getNelo(seriesName).then(setManganelo);

    getFast(seriesName).then(setMangafast);

    getExtra(seriesName).then(setComicsextra);

    getView(seriesName).then(setViewcomics);

    // getToons(seriesName)
    //   .then(setWebtoons)
  }

  return (
    <>
      <Bar handleChange={handleChange} handleSubmit={handleSubmit} />

      <div className={"App-body"}>
        <GenerateGrid mangaList={mangaraw} websiteName={"Manga Raw"} />

        <GenerateGrid mangaList={manganelo} websiteName={"Manga Kakalot"} />

        <GenerateGrid mangaList={mangafast} websiteName={"Manga Fast"} />

        <GenerateGrid mangaList={comicextra} websiteName={"Comic Extra"} />

        <GenerateGrid mangaList={viewcomics} websiteName={"View Comics"} />

        {/* <GenerateGrid mangaList={webtoons} websiteName={"Web Toons"} /> */}
      </div>
    </>
  );
}

