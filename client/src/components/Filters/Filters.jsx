import React from 'react'
import { Select, FormControl, OutlinedInput, MenuItem, Slider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';

import styles from './Filters.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function valuetext(value) {
  return `${value}₴`;
}

const themes = [
  'Business',
  'Psychology',
  'Politics',
  'Programming',
  'Sports',
  'Science'
];

const formats = [
  'Conferences',
  'Lectures',
  'Workshops',
  'Fests',
  'Parties',
  'Concerts'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? 500
        : 700,
  };
}

const Filters = () => {
  const [theme, setTheme] = React.useState([]);
  const [format, setFormat] = React.useState([]);
  const [value, setValue] = React.useState([0, 1000]);

  const { register, handleSubmit, formState, control } = useForm({
    mode: 'onChange'
  });
  
  const handleChangePrice = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTheme = (event) => {
    const {
      target: { value },
    } = event;
    setTheme(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeFormat = (event) => {
    const {
      target: { value },
    } = event;
    setFormat(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filters</h3>
      <div className={styles.inputs}>
        <FormControl sx={{width: '100%', maxWidth: '287px'}}>
          <Select
            multiple
            displayEmpty
            value={theme}
            onChange={handleChangeTheme}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Choose Theme</em>;
              }

              return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>Choose Theme</em>
            </MenuItem>
            {themes.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, theme, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{width: '100%', maxWidth: '287px'}}>
          <Select
            multiple
            displayEmpty
            value={format}
            onChange={handleChangeFormat}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Choose Format</em>;
              }

              return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>Choose Format</em>
            </MenuItem>
            {formats.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, theme, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.date_container}>
            <h2 className={styles.section_heading}>Date Interval</h2>
            <div className={styles.input_container}>
              <DatePicker
                label="From"
                onChange={(e) => console.log(e.$d.toISOString())}
              />
              <DatePicker
                label="To"
                onChange={(e) => console.log((e.$d).toISOString())}
              />
            </div>
        </div>
        </LocalizationProvider>

        <div className={styles.price_container}>
          <h2 className={styles.section_heading}>Price Range</h2>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={value}
            onChange={handleChangePrice}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={1000}
            sx={{ color: '#1F1F1F'}}
          />
        </div>
      </div>
    </div>
  )
}

export default Filters