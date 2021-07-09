import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Select, InputLabel, FormControl, CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';

function Form({
  fields, mainButton, secondaryButton, defaultValues,
}) {
  const [fieldStates, setFieldStates] = useState(null);
  const [loadingDefaults, setLoadingDefaults] = useState(true);

  function changeFieldState(id, newValue) {
    const entryChanged = {};
    entryChanged[id] = newValue;
    setFieldStates({ ...fieldStates, ...entryChanged });
  }

  useEffect(() => {
    let entries = {};
    fields.forEach((field) => {
      entries[field.name] = '';
    });
    entries = { ...entries, ...defaultValues };
    setFieldStates({ ...entries });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fieldStates) {
      setLoadingDefaults(false);
    }
  }, [fieldStates]);

  function makeTextFieldComponent(field) {
    return (
      <TextField
        name={field.name}
        key={field.name}
        defaultValue={fieldStates[field.name] ? fieldStates[field.name] : ''}
        label={field.label}
        required={field.required || false}
        type={field.type || 'text'}
        InputLabelProps={{ id: field.name }}
        inputProps={{ 'aria-labelledby': field.name }}
        variant="outlined"
        margin="normal"
        onChange={(event) => {
          changeFieldState(field.name, event.target.value);
        }}
        fullWidth
      />
    );
  }

  function makeSelectComponent(field) {
    return (
      <FormControl key={`${field.name}-form-control`} variant="outlined">
        <InputLabel
          key={`${field.name}-label}`}
          id={`${field.name}-label}`}
        >
          {field.label}
        </InputLabel>
        <Select
          key={field.name}
          labelId={`${field.name}-label`}
          aria-labelledby={`${field.name}-label}`}
          onChange={(event) => {
            changeFieldState(field.name, event.target.value);
          }}
          defaultValue={fieldStates[field.name] ? fieldStates[field.name] : ''}
          fullWidth
        >
          {field.options.map(
            (fieldOption) => (
              <option
                key={`${fieldOption.id || fieldOption.name}-option`}
                aria-labelledby={field.name}
                value={fieldOption.id || fieldOption.name}
              >
                {fieldOption.name}
              </option>
            ),
          )}
        </Select>
      </FormControl>
    );
  }

  const typeToFunction = {
    textfield: makeTextFieldComponent,
    select: makeSelectComponent,
  };

  if (!loadingDefaults) {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mainButton.onSubmit(fieldStates);
        }}
      >
        {
          fields.map((field) => {
            const componentType = field.componentType || 'textfield';
            return typeToFunction[componentType](field);
          })
        }
        <div data-testid="form-actions" className="action-itens">
          {secondaryButton
            && (
              <Button
                variant="outlined"
                className="action-item"
                color="primary"
                onClick={secondaryButton.onSubmit}
              >
                {secondaryButton.text}
              </Button>
            )}
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
  return (
    <CircularProgress />
  );
}

Form.defaultProps = {
  secondaryButton: null,
  defaultValues: {},
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      componentType: PropTypes.oneOf(['textfield', 'select']),
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number,
      })),
      required: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  mainButton: PropTypes.exact({
    text: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
  }).isRequired,
  secondaryButton: PropTypes.exact({
    text: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
  }),
  defaultValues: PropTypes.shape({}),
};

export default Form;
