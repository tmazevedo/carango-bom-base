import React, { useEffect, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  actionsToolbar: {
    float: "right",
  },
  actions: {
    top: "10px",
    marginLeft: "10px",
  },
}));

function Forms(props) {
  const [fild1, setFild1] = useState("");
  const [fild2, setFild2] = useState("");
  const [fild3, setFild3] = useState("");
  const [erros, setErros] = useState({ error: { valido: true, text: "" } });
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (props.id) {
      // TO-DO make request to find selected user, and set values (Field1 , Field 2 and Field 3)
    }
  });

  function cancel() {
    history.goBack();
  }

  return (
    <form
      onSubmit={(event) => {
        history.goBack();
        props.onSubmit({ fild1, fild2, fild3 });
      }}
    >
      <TextField
        id={props.labelField1}
        label={props.labelField1}
        required
        variant="outlined"
        fullWidth
        margin="normal"
        value={fild1}
        onChange={(event) => {
          setFild1(event.target.value);
        }}
      />
      <TextField
        id={props.labelField2}
        label={props.labelField2}
        required
        fullWidth
        variant="outlined"
        margin="normal"
        value={fild2}
        onChange={(event) => {
          setFild2(event.target.value);
        }}
        type={props.type}
      />
      <TextField
        id={props.labelField3}
        label={props.labelField3}
        required
        fullWidth
        variant="outlined"
        margin="normal"
        value={fild3}
        error={!erros.error.valido}
        helperText={erros.error.text}
        onBlur={(event) => {
          setErros({ error: props.validation(fild2, event.target.value) });
        }}
        type={props.type}
        onChange={(event) => {
          setFild3(event.target.value);
        }}
      />
      <div className={classes.actionsToolbar}>
        <Button
          type="submit"
          variant="contained"
          className={classes.actions}
          color="primary"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}

export default Forms;
