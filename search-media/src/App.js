import { useState } from "react";
import { getFast, getNelo, getRaw } from "./utils/api";
import "./App.css";
import GenerateGrid from "./GenerateGrid";
import Bar from "./Bar"

function App() {
  const [mangaraw, setMangaraw] = useState([]);
  const [manganelo, setManganelo] = useState([]);
  const [mangafast, setMangafast] = useState([]);
  const [seriesName, setSeriesName] = useState("");
  
  const handleChange = (event) => {
    setSeriesName(event.target.value)
  };

  function handleSubmit(event) {
    event.preventDefault();

    getRaw(seriesName)
    .then(setMangaraw)

    getNelo(seriesName)
    .then(setManganelo)

    getFast(seriesName)
    .then(setMangafast)
  }

  return (
    <>
      <Bar handleChange={handleChange} handleSubmit={handleSubmit}/>
      
      <div className={"App-body"}>

      <GenerateGrid mangaList={mangaraw} websiteName={"Manga Raw"} />

      <GenerateGrid mangaList={manganelo} websiteName={"Manga Kakalot"} />

      <GenerateGrid mangaList={mangafast} websiteName={"Manga Fast"} />

      </div>
    </>
  );
}

export default App;
