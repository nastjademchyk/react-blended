import Select from 'react-select';

import symbols from './symbols.json';

import styles from './SelectRates.module.css';

import './ReactSelect.css';
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from 'reduxState/currencySlice';

export const SelectRates = ({ baseCurrency }) => {
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setBaseCurrency(e.value));
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        onChange={handleChange}
        options={symbols}
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        className={styles.select}
        classNamePrefix="react-select"
        isSearchable
      />
    </div>
  );
};
