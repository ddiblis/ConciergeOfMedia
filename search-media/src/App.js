import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { getSeries } from "./utils/api";
import "./App.css";

function App() {
  const [site1, setSite1] = useState([]);
  const [form, setForm] = useState({
    seriesName: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setForm({
      ...form,
      [event.target.name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    getSeries(form.seriesName).then(setSite1);
  }

  console.log(site1)
  return (
    <>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="series Name"
          variant="outlined"
          name="seriesName"
          value={form.seriesName}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained"> Submit </Button>
      </form>
      {JSON.stringify(site1)}
    </>
  );
}

export default App;
