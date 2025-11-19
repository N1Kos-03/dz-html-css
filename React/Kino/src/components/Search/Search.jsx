import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Search.module.css';
import indexstyles from '../../index.module.css';

function Search({ onSearch }) {
  const [inputData, setInputData] = useState('');

const inputChange = (event) => {
  setInputData(event.target.value);
};

  const handleSearch = () => {
    if (onSearch) onSearch(inputData);
    
  };



  return (
    <div className={styles['search-body']}>
      <h1>Поиск</h1>
      <p className={indexstyles['p-16']}>
        Введите название фильма, сериала или мультфильма для поиска и добавления в избранное.
      </p>
      <div className={styles['search']}>
        <Input
          leftIcon={<img src="./public/search.svg" alt="Поиск" />}
          type="text"
          value={inputData}
          onChange={inputChange}
          placeholder="Введите название"
        />
        <Button onClick={handleSearch} text="Искать" />
      </div>
    </div>
  );
}

export default Search;
