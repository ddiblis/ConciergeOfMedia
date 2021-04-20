import React from "react";
import {
  makeStyles,
  GridList,
  GridListTileBar,
  GridListTile,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function GenerateGrid(props) {
  const { mangaList, websiteName } = props;
  const classes = useStyles();

  return (mangaList.length !== 0 ? (
    <>
      <h1> {websiteName}: </h1>
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={7}>
          {mangaList.map((series) => (
            <GridListTile key={series.series_url}>
              <img src={series.image_url} alt={series.series_name} />
              <a href={series.series_url} rel="noreferrer" target="_blank">
                <GridListTileBar
                  title={series.series_name}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </a>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </>
  ): null
  );
}
