import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { insFCMYtoken, login } from '../services/ApiConfig'

const initialState = {
  products: [],
  token: null,
  creditFundId: null,
  tokenEmploy: null,
  loading: false
}

export const signInApi = createAsyncThunk('auth/login', async (params, thunkAPI) => {
  const list = await login(params, { token: 'token' });
  return list;
});

export const insFCMYtokenAPI = createAsyncThunk('INSFCM', async (params, thunkAPI) => {
  const list = await insFCMYtoken(params);
  console.log("Save FCM")
  return list;
});


export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    clearState: (state, action) => {
      //console.log('action', action)
      state.token = null
    },
  },
  // handle response data from api
  extraReducers: (builder) => {
    // login
    builder.addCase(signInApi.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(signInApi.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.data.accessToken;
      state.creditFundId = action.payload.data.creditFundId[0];
      state.tokenEmploy = action?.payload?.data?.user?.authorities?.map(i => i.authority)?.toString();
    })
    builder.addCase(signInApi.rejected, (state, action) => {
      state.token = null;
    })
    // [signInApi.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [signInApi.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.token = action.payload.data.accessToken;
    //   state.creditFundId = action.payload.data.creditFundId[0];
    //   state.tokenEmploy = action?.payload?.data?.user?.authorities?.map(i => i.authority)?.toString();

    // },
    // [signInApi.rejected]: (state, action) => {
    //   state.token = null;
    // },
  }
})

// Action creators are generated for each case reducer function
export const { clearState } = authSlice.actions

export default authSlice.reducer