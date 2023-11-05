import axios from 'axios';
import { store } from '../../App'
import { View, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, Image, Text, TouchableOpacity, SafeAreaView, FlatList, } from 'react-native';

const instance = axios.create({
  // baseURL: 'http://10.0.2.2:8886/',
  baseURL: 'https://be.vfundvietnam.vn/creditfund/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 30000,
});

instance.interceptors.request.use(function (config) {
  const state = store.getState();
  const token = state?.auth?.token
  return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    console.tron.log('401', error.response)
  }
  if (error.response.data.message === "Bạn đã đổi user name") {
    Alert.alert('Không thể đổi tài khoản mật khẩu');
  }
  if (error.response.data.error === 'Bad credentials') {
    Alert.alert('Tài khoản mật khẩu không đúng');
  }
  return Promise.reject(error);
});

export const getTodo = () => {
  return instance.get('/todos/1')
}

export const createTodo = (params) => {
  return instance.post('/posts', params)
}

export const updateTodo = (id, params) => {
  return instance.put(`/posts/${id}`, params)
}

export const deleteTodo = (id) => {
  return instance.delete(`/posts/${id}`)
}

export const login = (params) => {
  return instance.post('auth/login', params)
}

export const insFCMYtoken = (params) => {
  return instance.post('api/notification/insert', params)
}

export const getInfoUser = () => {
  return instance.get('api/user/getInfoUser')
}

export const getDeposits = () => {
  return instance.get('api/deposits/get/user')
}

export const getLoans = () => {
  return instance.get('api/loan/get/user')
}

export const updateUser = (params) => {
  return instance.post(`api/user/update/user?username=${params?.username}&password=${params?.password}`)
}

export const findInfoUser = (creditFundId, query) => {
  return instance.get(`api/user/get/user?creditFundId=${creditFundId}&query=${query}`)
}