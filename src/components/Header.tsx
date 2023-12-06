import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
  const [usd, setUsd] = useState<number>();
  const [eur, setEur] = useState<number>();
  const handeUSDCurrency = async () => {
    const res = await axios.get(
      'https://v6.exchangerate-api.com/v6/824b069b73a7b8595e407983/latest/UAH',
    );
    setUsd(1 / res.data.conversion_rates['USD']);
    setEur(1 / res.data.conversion_rates['EUR']);
  };

  useEffect(() => {
    handeUSDCurrency();
  }, []);

  return (
    <header
      className={
        'flex py-10 bg-violet-500 w-full items-center justify-between px-20'
      }
    >
      <p className={'text-[40px]'}>Conversion</p>
      <div className={'flex flex-col text-2xl'}>
        <p>USD {usd && usd.toFixed(2)}</p>
        <p>EUR {eur && eur.toFixed(2)}</p>
      </div>
    </header>
  );
};
export default Header;
