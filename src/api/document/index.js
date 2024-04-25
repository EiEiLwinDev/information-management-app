import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@/utils/axios'

export const get = createAsyncThunk(
    "document/get",
    async(id, { rejectWithValue }) => {
        try{
            const response = await axiosInstance.get("/api/documents/" + id)
            return response.data
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)

export const post = createAsyncThunk(
  "document/post",
  async(data, { rejectWithValue }) => {
      try{
          const response = await axiosInstance.post("/api/documents", data)
          return response.data
      }catch(error){
          return rejectWithValue(error.response.data);
      }
  }
)

export const patch = createAsyncThunk(
  "document/patch",
  async({id, data}, { rejectWithValue }) => {
      try{
          const response = await axiosInstance.get("/api/documents/" + id, data)
          return response.data
      }catch(error){
          return rejectWithValue(error.response.data);
      }
  }
)

export const remove = createAsyncThunk(
  "document/delete",
  async(id, { rejectWithValue }) => {
      try{
          const response = await axiosInstance.get("/api/documents/" + id)
          return response.data
      }catch(error){
          return rejectWithValue(error.response.data);
      }
  }
)

export const find = createAsyncThunk(
  "document/find",
  async(params, { rejectWithValue }) => {
      try{
          const response = await axiosInstance.get("/api/documents")
          return response.data
      }catch(error){
          return rejectWithValue(error.response.data);
      }
  }
)