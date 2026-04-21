import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootState } from '../store';



const initialState  = {
  example: null,
};

const exampleSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    showConsole: () => {
      console.log('example');
    },
   
  },
});

const { showConsole } = exampleSlice.actions;

//INSTEAD USE useAppSelector
export const useGetUserState = () =>
  useAppSelector((state: RootState) => state[exampleSlice.name]);

//INSTEAD USE useDispatch
export const useSetUserState = () => {
  const dispatch = useAppDispatch();
  return {
    showConsole: () => {
      dispatch(showConsole());
    },
  };
};
export default exampleSlice;
