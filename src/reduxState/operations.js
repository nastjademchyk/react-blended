import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency, latestRates } from 'service/exchangeAPI';
import { getUserInfo } from 'service/opencagedataApi';

export const fetchCurrency = createAsyncThunk(
  'currency/fetchBase',
  async (coords, thunkApi) => {
    const state = thunkApi.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return baseCurrency;
    }
    try {
      const response = await getUserInfo(coords);
      return response.results[0].annotations.currency.iso_code;
    } catch (_) {
      return thunkApi.rejectWithValue('USD');
    }
  },
);
export const fetchExchangeCurrency = createAsyncThunk(
  'currency/fetchExchangeCurrency',
  async (currency, thunkApi) => {
    try {
      const response = await exchangeCurrency(currency);
      return response;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  },
);
export const fetchRates = createAsyncThunk(
  'fetchRates',
  async (baseCurrency, thunkApi) => {
    try {
      const data = await latestRates(baseCurrency);
      return data;

    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
      
    }
  }
 )