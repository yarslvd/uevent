import React from 'react'
import { Select, FormControl, OutlinedInput, MenuItem, Slider, Button } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';

import styles from './Filters.module.scss';
import { useTranslation } from 'react-i18next';

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
  'Science',
  'Entertainment'
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

const Filters = ({setFilters}) => {
  const [theme, setTheme] = React.useState([]);
  const [format, setFormat] = React.useState([]);
  const [value, setValue] = React.useState([0, 1000]);
  const [dateFrom, setDateFrom] = React.useState(null);
  const [dateTo, setDateTo] = React.useState(null);

  const {t} = useTranslation();

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

  const handleApply = () => {
    let filters = Object.assign({},
      theme.length > 0 ? {theme: theme.toString()} : {},
      format.length > 0 ? {format: format.toString()} : {},
      dateFrom ? {'date_between[from]': dateFrom.toISOString()} : {},
      dateTo ?   {'date_between[to]': dateTo.toISOString()} : {},
      {'price_between[from]': value[0], 'price_between[to]': value[1]}
    )
    
    setFilters(filters);
  }

  const handleClear = () => {
    setTheme([]);
    setFormat([]);
    setValue([0, 1000]);
    setDateFrom(null);
    setDateTo(null);
    setFilters({});
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('filters.title')}</h3>
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
              return <em>{t('filters.chooseTheme')}</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{t('filters.chooseTheme')}</em>
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
              return <em>{t('filters.chooseFormat')}</em>;
            }
  
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{t('filters.chooseFormat')}</em>
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
          <h2 className={styles.section_heading}>{t('filters.dateInterval.title')}</h2>
          <div className={styles.input_container}>
            <DatePicker
              label={t('filters.dateInterval.fromLabel')}
              value={dateFrom}
              onChange={(e) => setDateFrom(e)}
            />
            <DatePicker
              label={t('filters.dateInterval.toLabel')}
              value={dateTo}
              onChange={(e) => setDateTo((e))}
            />
          </div>
        </div>
      </LocalizationProvider>

      <div className={styles.price_container}>
        <h2 className={styles.section_heading}>{t('filters.priceRange.title')}</h2>
        <Slider
          getAriaLabel={() => t('filters.priceRange.ariaLabel')}
          value={value}
          onChange={handleChangePrice}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={1000}
          sx={{ color: '#1F1F1F'}}
        />
      </div>

      <Button variant='contained' className={styles.apply_btn} onClick={handleApply}>{t('filters.applyBtn')}</Button>
      <Button variant='outlined' className={styles.clear_btn} onClick={handleClear}>{t('filters.clearBtn')}</Button>
      </div>
    </div>
  )
}

export default Filters