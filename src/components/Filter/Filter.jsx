import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { setFilter } from 'reduxState/filterSlice';
import { selectFilter } from 'reduxState/selectors';
export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const handleInput = e => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <input
      value={filter.toUpperCase()}
      onChange={handleInput}
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
    />
  );
};
