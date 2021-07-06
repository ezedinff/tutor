import React, { useState } from 'react';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordInput = (props: TextFieldProps) => {
  type InputTypes = 'password' | 'text';

  const [type, setType] = useState<InputTypes>('password');

  const toogleInputType = () => {
    const changeTo = type === 'password' ? 'text' : 'password';
    setType(changeTo);
  };

  return (
    <TextField
      {...props}
      type={type}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="show password" onClick={toogleInputType}>
              {type === 'text' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
