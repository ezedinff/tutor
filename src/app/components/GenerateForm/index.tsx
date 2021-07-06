import {
  FormControl,
  FormLabel,
  RadioGroup,
  Typography,
  FormControlLabel,
  Radio,
  Container,
  FormGroup,
  Checkbox,
  useTheme,
  Select,
  MenuItem,
  Box,
  InputLabel,
  TextField,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import MultiSelector from '../MultiSelector';
const getElement = (el, theme, values, changes) => {
  switch (el.type) {
    case 'text':
      return (
        <Fragment key={el.name}>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ marginTop: '16px' }}
          >
            {el.label}
          </Typography>
          <TextField variant="outlined" name={el.name} placeholder={el.label} />
        </Fragment>
      );
    case 'radio':
      return (
        <Fragment key={el.name}>
          <FormControl
            component="fieldset"
            style={{ marginTop: '16px', width: '100%' }}
          >
            <FormLabel component="legend">{el.label}</FormLabel>
            <RadioGroup
              aria-label="gender"
              name={el.name}
              value={values[el.name]}
              onChange={event =>
                changes({ ...values, [el.name]: event.target.value })
              }
            >
              {el.options.map(option => {
                return (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio color="primary" />}
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Fragment>
      );
    case 'checkbox':
      return (
        <Fragment key={el.name}>
          <FormControl
            style={{ width: '100%' }}
            key={el.name}
            component="fieldset"
            onChange={event =>
              changes({ ...values, [el.name]: event.target.value })
            }
          >
            <FormLabel>{el.label}</FormLabel>
            <FormGroup>
              {el.options.map(option => {
                return (
                  <FormControlLabel
                    style={{ margin: theme.spacing(1) }}
                    label={option.label}
                    value={option.value}
                    control={
                      <Checkbox
                        style={{ marginRight: theme.spacing(1) }}
                        color="primary"
                        value={values[el.name]}
                      />
                    }
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Fragment>
      );
    case 'multi-select':
      return (
        <Fragment key={el.name}>
          <Typography variant="subtitle2" color="textSecondary">
            {el.label}
          </Typography>
          <MultiSelector
            placeholder={el.placeholder}
            options={el.options}
            maxCount={5}
            values={values[el.name]}
            onChange={event => changes({ ...values, [el.name]: event })}
          />
        </Fragment>
      );
    case 'select':
      return (
        <Fragment key={el.name}>
          <Typography variant="subtitle2" color="textSecondary">
            {el.label}
          </Typography>
          <Select
            value={values[el.name]}
            labelId={el.name}
            defaultValue=""
            variant="outlined"
            displayEmpty
            style={{minWidth: "48%"}}
            onChange={event =>
              changes({ ...values, [el.name]: event.target.value })
            }
          >
            <MenuItem value="">
              <em>{el.label}</em>
            </MenuItem>
            {el.options.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </Fragment>
      );
    default:
      return null;
  }
};
export default function GenerateForm({ elements, values, onChanges }) {
  const theme = useTheme();
  return elements.map(el => getElement(el, theme, values, onChanges));
}
