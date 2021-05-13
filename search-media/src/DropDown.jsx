import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // display: 'flex',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function DetailedAccordion(props) {
  const { handleCheckbox, checks, handleRadio, genre } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Search Bias</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              What type of comic?
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="genre"
                value={genre}
                onChange={handleRadio}
                // defaultValue="top"
              >
                <FormControlLabel
                  value="Eastern"
                  control={<Radio color="primary" />}
                  label="Eastern"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="Western"
                  control={<Radio color="primary" />}
                  label="Western"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checks.raw}
                  onChange={handleCheckbox}
                  name="raw"
                />
              }
              label="Manga Raw"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checks.nelo}
                  onChange={handleCheckbox}
                  name="nelo"
                />
              }
              label="Manga Kakalot"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checks.fast}
                  onChange={handleCheckbox}
                  name="fast"
                />
              }
              label="Manga Fast"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checks.extra}
                  onChange={handleCheckbox}
                  name="extra"
                />
              }
              label="Comic Extra"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checks.view}
                  onChange={handleCheckbox}
                  name="view"
                />
              }
              label="View Comics"
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
