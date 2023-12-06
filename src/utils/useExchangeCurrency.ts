import { ChangeEvent, useEffect, useState } from 'react';
import { DataCurrency } from '@/src/types';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

export const useExchangeCurrency = () => {
  const [firstSelectValue, setFirstSelectValue] = useState<string>('USD');
  const [secondSelectValue, setSecondSelectValue] = useState<string>('UAH');
  const [currenciesData, setCurrenciesData] = useState<DataCurrency>();
  const [firstValue, setFirstValue] = useState<string | number>(0);
  const [secondValue, setSecondValue] = useState<string | number>(0);

  const handleCurrencyApiCall = async (currencyCode: string) => {
    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/824b069b73a7b8595e407983/latest/${currencyCode}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    setCurrenciesData(data);
  };

  const handleChangeSelectFirst = async ({ target }: SelectChangeEvent) => {
    setFirstSelectValue(target.value);
    await handleCurrencyApiCall(target.value);
    if (secondSelectValue) {
      setSecondValue(calculateCurrency(Number(firstValue), secondSelectValue));
    }
  };

  const handleChangeSelectSecond = ({ target }: SelectChangeEvent) => {
    setSecondSelectValue(target.value);
    const result = calculateCurrency(Number(firstValue), target.value);
    setSecondValue(result);
  };

  const handleFirstInputCurrency = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      (/^\d*\.?\d*$/.test(event.target.value) || event.target.value === '') &&
      event.target.value.length < 17
    ) {
      const value = parseFloat(event.target.value);
      setFirstValue(value || '0');
      if (secondSelectValue) {
        const result = calculateCurrency(value || 0, secondSelectValue);
        setSecondValue(result);
      }
    }
  };

  const handleSecondInputCurrency = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (
      (/^\d*\.?\d*$/.test(target.value) || target.value === '') &&
      target.value.length < 17
    ) {
      const value = parseFloat(target.value) || 0;
      setSecondValue(value);
      if (!secondSelectValue) return;
      const currencyItemValue =
        currenciesData?.conversion_rates[secondSelectValue];
      if (!currencyItemValue) return;

      const result = value / currencyItemValue;
      setFirstValue(result);
    }
  };

  const calculateCurrency = (value: number, currencyCode: string) => {
    if (!currenciesData) {
      throw new Error('Missing data');
    }

    const currencyItemValue = currenciesData?.conversion_rates[currencyCode];

    if (!currencyItemValue) {
      throw new Error('Selected currency not found');
    }

    return currencyItemValue * value;
  };

  const handleReverseCurrency = () => {
    handleCurrencyApiCall(secondSelectValue);
    setSecondSelectValue(firstSelectValue);
    setFirstSelectValue(secondSelectValue);

    setFirstValue(secondValue);
    setSecondValue(firstValue);
  };

  useEffect(() => {
    handleCurrencyApiCall('USD');
  }, []);

  return {
    firstValue,
    secondValue,
    firstSelectValue,
    secondSelectValue,
    currenciesData,
    handleChangeSelectFirst,
    handleChangeSelectSecond,
    handleFirstInputCurrency,
    handleSecondInputCurrency,
    handleReverseCurrency,
  };
};
