import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useExchangeCurrency } from '@/src/utils/useExchangeCurrency';

const ExchangeCurrency = () => {
  const {
    firstSelectValue,
    firstValue,
    secondSelectValue,
    secondValue,
    currenciesData,
    handleChangeSelectFirst,
    handleChangeSelectSecond,
    handleFirstInputCurrency,
    handleSecondInputCurrency,
    handleReverseCurrency,
  } = useExchangeCurrency();

  return (
    <div className={'flex w-full items-center justify-center gap-10'}>
      <div className={'flex flex-col w-[20%]'}>
        <Select
          id="demo-simple-select"
          value={firstSelectValue}
          onChange={handleChangeSelectFirst}
        >
          {Object.keys(currenciesData?.conversion_rates || {}).map(
            (elem, idx) => (
              <MenuItem key={`select-item-${idx}`} value={elem}>
                {elem}
              </MenuItem>
            ),
          )}
        </Select>
        <input
          className={
            'border-solid mt-5 px-[10px] h-[56px] border-[#D5D5D5] border-[1px]'
          }
          onChange={handleFirstInputCurrency}
          value={firstValue}
        />
      </div>
      <button onClick={handleReverseCurrency} type={'submit'}>
        <SyncAltIcon className={'text-black'} />
      </button>
      <div className={'flex flex-col w-[20%]'}>
        <Select
          id="demo-simple-select"
          value={secondSelectValue}
          onChange={handleChangeSelectSecond}
        >
          {Object.keys(currenciesData?.conversion_rates || {}).map(
            (elem, idx) => (
              <MenuItem key={`select-item-${idx}`} value={elem}>
                {elem}
              </MenuItem>
            ),
          )}
        </Select>
        <input
          className={
            'border-solid mt-5 px-[10px] h-[56px]  border-[#D5D5D5] border-[1px]'
          }
          value={secondValue}
          onChange={handleSecondInputCurrency}
        />
      </div>
    </div>
  );
};

export default ExchangeCurrency;
