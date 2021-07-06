/**
 *
 * MultiSelector
 *
 */
import React from 'react';
import ReactSelect, { ValueType } from 'react-select';
import { useTheme } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { MultiSelectorOptionType } from './types';

interface Props {
  options: MultiSelectorOptionType[];
  placeholder: String;
  maxCount?: Number;
  error?: boolean;
  values?: {}[];
  onChange: (value: ValueType<any>) => void;
}

function MultiSelector(props: Props) {
  const theme = useTheme();

  const handleValueAdd = value => {
    if (props.maxCount && Array.isArray(value) && props.onChange) {
      if (props.maxCount >= value.length) {
        props.onChange(value);
      }
    } else {
      props.onChange(value);
    }
  };

  return (
    <ReactSelect
      styles={{
        control: base => ({
          ...base,
          height: `56px`,
          fontFamily: theme.typography.fontFamily,
          borderColor: props.error
            ? theme.palette.error.main
            : theme.palette.grey[400],
        }),
        menu: base => ({
          ...base,
          fontFamily: theme.typography.fontFamily,
          zIndex: 100,
        }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
          ...styles,
          backgroundColor: isFocused
            ? 'rgb(232, 232, 232)'
            : styles.backgroundColor,

          cursor: 'pointer',

          ':active': {
            ...styles[':active'],
            backgroundColor: isFocused ? 'rgba(250, 190, 88, 1))' : data.color,
          },
        }),
      }}
      components={{
        DropdownIndicator: () => (
          <ArrowDropDown color="action" style={{ margin: theme.spacing(1) }} />
        ),
      }}
      theme={th => ({
        ...th,
        colors: {
          ...th.colors,
          primary: props.error
            ? theme.palette.error.main
            : theme.palette.primary.main,
        },
      })}
      placeholder={props.placeholder}
      isClearable
      options={props.options}
      isMulti
      closeMenuOnSelect={false}
      menuPlacement="auto"
      value={props.values}
      onChange={handleValueAdd}
    />
  );
}

export default MultiSelector;
