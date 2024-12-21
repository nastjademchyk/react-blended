import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrency, fetchExchangeCurrency, fetchRates } from './operations';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
    rates: [],
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(fetchExchangeCurrency.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchExchangeCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchangeInfo = action.payload;
      })
      .addCase(fetchExchangeCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.exchangeInfo = null;
      })
      .addCase(fetchRates.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
       state.isLoading = false;
        state.rates = action.payload;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.rates = [];
    })
    
  },
});

export const currencyReducer = currencySlice.reducer;
export const { setBaseCurrency } = currencySlice.actions;
