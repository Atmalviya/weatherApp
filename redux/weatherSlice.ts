import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  localityId: string;
  city: string;
  weatherData: any;
}

const initialState: WeatherState = {
  localityId: '',
  city : '',
  weatherData: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<any>) => {
      state.weatherData = action.payload;
    },
    setLocalityId: (state, action: PayloadAction<string>) => {
      state.localityId = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { setWeatherData, setLocalityId, setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
