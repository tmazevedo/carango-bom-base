import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab"

function Forms({ fields, mainButton, secondaryButton }) {
  const [fieldStates, setFieldStates] = useState({})
  const typeToFunction = {
    "textfield": makeTextFieldComponent,
    "autocomplete": makeAutocompleteComponent
  }

  useEffect(() => {
    const entries = {};
    for (const field of fields) {
      entries[field.name] = ""
    }
    setFieldStates({ ...entries })
  }, [fields])

  function changeFieldState(id, newValue) {
    const entryChanged = {}
    entryChanged[id] = newValue
    setFieldStates({ ...fieldStates, ...entryChanged })
  }

  function makeTextFieldComponent(field) {
    return (
      <TextField
        name={field.name}
        key={field.name}
        label={field.label}
        required={field.required || false}
        type={field.type || "text"}
        value={fieldStates[field.name]}
        variant="outlined"
        margin="normal"
        onChange={event => changeFieldState(field.name, event.target.value)}
        fullWidth
      />
    )
  }

  function makeAutocompleteComponent(field) {
    return (
      <Autocomplete
        name={field.name}
        key={field.name}
        options={field.options}
        onChange={event => changeFieldState(field.name, event.target.value)}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label={field.label} variant="outlined" />}
      />
    )
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mainButton.onSubmit(fieldStates);
      }}
    >
      {
        fields.map(field => {
          field.componentType = field.componentType || "textfield"
          return typeToFunction[field.componentType](field)
        })
      }
      <div className="action-itens">
        {secondaryButton &&
          <Button
            variant="outlined"
            className="action-item"
            color="primary"
            onClick={secondaryButton.onSubmit}>
            {secondaryButton.text}
          </Button>
        }
        <Button
          type="submit"
          variant="contained"
          className="action-item"
          color="primary"
        >
          {mainButton.text}
        </Button>
      </div>
    </form>
  );
}

export default Forms;
