import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

let uuid = "";
let createUUID = false;

class CreateEntry extends Component {
  constructor(props) {
    super(props);
    if (this.props.uuid === undefined) {
      createUUID = true;
    } else {
      uuid = this.props.uuid;
    }
    this.state = {
      createUUID: createUUID,
      uuid: uuid,
      title: this.props.title,
      body: this.props.body,
    };
    this.SubmisionHandler = this.SubmisionHandler.bind(this);
    this.TitleChangeHandler = this.TitleChangeHandler.bind(this);
    this.BodyChangeHandler = this.BodyChangeHandler.bind(this);
  }

  TitleChangeHandler(event) {
    this.setState({
      title: event.target.value,
      createUUID: createUUID,
    });
  }

  BodyChangeHandler(event) {
    this.setState({
      body: event.target.value,
      createUUID: createUUID,
    });
  }

  SubmisionHandler() {
    let requestOptions;
    if (createUUID) {
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: this.state.body,
          title: this.state.title,
        }),
      };
    } else {
      console.log(uuid);
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: uuid,
          body: this.state.body,
          title: this.state.title,
        }),
      };
      console.log("Outgoing", requestOptions);
    }
    fetch("/api/create-entry", requestOptions).then((response) =>
      response.json().then((data) => console.log(data))
    );
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid
          container
          xs={12}
          spacing={1}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <div style={{ height: "20px" }}></div>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4" fontWeight="fontWeightBold">
              Journal Entry
            </Typography>
            <FormHelperText>
              <div align="center">What's on your mind today?</div>
            </FormHelperText>
          </Grid>
          <div style={{ width: "auto", height: "50px" }}></div>
          <Grid item xs={12} align="center">
            <formControl noValidate autoComplete="off">
              <TextField
                autoFocus
                onChange={this.TitleChangeHandler}
                required={true}
                spellCheck={false}
                id="standard-basic"
                label="Entry Title"
                inputProps={{ min: 1, style: { textAlign: "center" } }}
              />
            </formControl>
          </Grid>
          <Grid container direction="column" align="center" xs={7}>
            <formControl noValidate autoComplete="off">
              <TextField
                onChange={this.BodyChangeHandler}
                xs={8}
                multiline
                fullWidth
                id="outlined-full-width"
                label="Entry Body"
              />
            </formControl>
          </Grid>
          <Grid item xs={12} align="center">
            <div style={{ height: "20px" }}></div>
            <Button onClick={this.SubmisionHandler}>Submit</Button>
          </Grid>
          <Grid item x={12} align="center" to="/" component={Link}>
            <Button size="small">Back</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CreateEntry;
