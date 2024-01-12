import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    code: null,
    email: null,
};

const CodeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        setCodeInfo: (state, action) => {
            const { code, email} = action.payload;
            state.code = code;
            state.email = email;

        },
        setClearCodeInfo: (state, action) => {
            state.code = null;
            state.email = null;
            
        },
    },
});

export const { setCodeInfo, setClearCodeInfo } = CodeSlice.actions;

export default CodeSlice.reducer;
