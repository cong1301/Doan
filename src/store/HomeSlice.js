import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Alert, View } from 'react-native';
import { getTodo, updateTodo, getCategory, getInfoUser, getDeposits, getLoans, updateUser, findInfoUser } from '../services/ApiConfig'
import Images from '../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const initialState = {
  products: [],
  todo: [],
  categories: [],
  dataInfoUser: [],
  updateDataInfoUser: [],
  dataListDeposits: [],
  dataListLoans: [],
  findDataInfoUser: [],
  loading: false
}

export const getListTodo = createAsyncThunk('todo/getListTodoKey', async (params, thunkAPI) => {
  // thunkAPI.dispatch(...)
  const list = await getTodo();
  // console.log('list', list);
  return list;
});
export const updateListTodo = createAsyncThunk('todo/updateListTodoKey', async (params, thunkAPI) => {
  const list = await updateTodo(params.id, params.data);
  return list;
});

export const getInfoUserList = createAsyncThunk('todo/infoUser', async (params, thunkAPI) => {
  const list = await getInfoUser();
  return list;
});

export const getDepositsList = createAsyncThunk('todo/deposits', async (params, thunkAPI) => {
  const list = await getDeposits();
  return list;
});

export const getLoansList = createAsyncThunk('todo/loans', async (params, thunkAPI) => {
  const list = await getLoans();
  return list;
});


export const updateListUser = createAsyncThunk('todo/updateInfoUser', async (params, meta, thunkAPI) => {
  const response = await updateUser(params);
  console.log("response", response?.data.success)
  if (response?.data.success === true) {
    Alert.alert("Thành công");
  }
  return response;
});

export const findInfoUserList = createAsyncThunk('todo/findinfoUser', async (creditFundId, query, thunkAPI) => {
  const list = await findInfoUser(creditFundId, query);
  return list;
});

export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // console.log('action', action)
      state.products.push(action.payload)
      // return ({
      //   ...state,
      //   products: [...state.products, action.payload]
      // })
    },
    removeProduct: (state, action) => {
      // console.log('action', action)
      // state.products.push(action.payload)
      // return ({
      //   ...state,
      //   products: [...state.products, action.payload]
      // })
    },
  },
  // handle response data from api
  extraReducers: {
    // get list todo
    // [getListTodo.pending]: (state, action) => {
    //   state.loading = true;
    // },
    [getListTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.todo = action.payload.data;
    },
    // [getListTodo.rejected]: (state, action) => {
    //   state.todo = [];
    // },

    // update list todo
    [updateListTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.todo = action.payload.data;
    },

    // Update user
    // [updateListUser.fulfilled]: (state, action) => {
    //   state.check = true
    //   console.log("mk thanh cong")
    //   state.loading = false;
    //   // state.updateDataInfoUser = true;
    // },

    // [updateListUser.rejected]: (state, action) => {
    //   state.check = false
    //   console.log("that bai")
    //   state.loading = false;
    //   // state.updateDataInfoUser = true;
    // },

    // get category
    [getInfoUserList.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataInfoUser = action?.payload?.data?.data;
    },

    [findInfoUserList.fulfilled]: (state, action) => {

      state.loading = false;
      state.findDataInfoUser = action?.payload?.data?.data;
    },

    [getDepositsList.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataListDeposits = action?.payload?.data?.data;
    },

    [getLoansList.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataListLoans = action?.payload?.data?.data;
    },
  }
})

// Action creators are generated for each case reducer function
export const { addProduct } = productSlice.actions

export default productSlice.reducer