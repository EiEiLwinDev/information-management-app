import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@/utils/axios'

export const get = createAsyncThunk(
    "customer/get",
    async(id, { rejectWithValue }) => {
        try{
            const response = await axiosInstance.get("/api/customers/" + id)
            return response.data
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)

export const post = createAsyncThunk(
  "customer/post",
  async(data, { rejectWithValue }) => {
      try{
          const response = await axiosInstance.post("/api/customers", data)
          return response.data
      }catch(error){
          return rejectWithValue(error.response.data);
      }
  }
)

export const patch = createAsyncThunk(
  "customer/patch",
  async({id, data}, { rejectWithValue }) => {
      try{
          const response = await axiosInstance.get("/api/customers/" + id, data)
          return response.data
      }catch(error){
          return rejectWithValue(error.response.data);
      }
  }
)

export const remove = createAsyncThunk(
  "customer/delete",
  async(id, { rejectWithValue }) => {
      try{
          const response = await axiosInstance.get("/api/customers/" + id)
          return response.data
      }catch(error){
          return rejectWithValue(error.response.data);
      }
  }
)

export const find = createAsyncThunk(
  "customer/find",
  async(params, { rejectWithValue }) => {
      try{
          const response = await axiosInstance.get("/api/customers")
          return response.data
      }catch(error){
          return rejectWithValue(error.response.data);
      }
  }
)