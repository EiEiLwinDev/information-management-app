import { createSlice } from '@reduxjs/toolkit'
import { get, post, patch, remove, find } from '@/api/customer'

export const customerSlice = createSlice({
    name: "customer",
    initialState: {
        loading: {
            get: false,
            post: false,
            patch: false,
            delete: false
        },
        currentRequestId: {
            get: undefined,
            post: undefined,
            patch: undefined,
            delete: undefined
        },
        errors: null,
        current: null,
        items: [],
        totalItems: 0     
    },
    reducers: {},
    extraReducers: (builder) => {
        //get
        builder.addCase(get.pending, (state, action) => {
            if(!state.loading.get){
                state.loading.get = true
                state.currentRequestId.get = action.meta.requestId
            }
        }),
        builder.addCase(get.fulfilled, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.get && state.currentRequestId.get === requestId){
                state.loading.get = false
                state.current = action.payload
                state.errors = null
                state.currentRequestId.get = undefined
            }
        }),

        builder.addCase(get.rejected, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.get && state.currentRequestId.get === requestId){
                state.loading.get = false
                state.errors = action.payload
                state.currentRequestId.get = undefined
            }
        }),
        // post
        builder.addCase(post.pending, (state, action) => {
            if(!state.loading.post){
                state.loading.post = true
                state.currentRequestId.post = action.meta.requestId
            }
        }),
        builder.addCase(post.fulfilled, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.post && state.currentRequestId.post === requestId){
                state.loading.post = false
                state.errors = null
                state.currentRequestId.post = undefined
            }
        }),

        builder.addCase(post.rejected, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.post && state.currentRequestId.post === requestId){
                state.loading.post = false
                state.errors = action.payload['hydra:description']
                state.currentRequestId.post = undefined
            }
        }) ,
        // patch
        builder.addCase(patch.pending, (state, action) => {
            if(!state.loading.patch){
                state.loading.patch = true
                state.currentRequestId.patch = action.meta.requestId
            }
        }),
        builder.addCase(patch.fulfilled, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.patch && state.currentRequestId.patch === requestId){
                state.loading.patch = false
                state.errors = null
                state.currentRequestId.patch = undefined
            }
        }),

        builder.addCase(patch.rejected, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.patch && state.currentRequestId.patch === requestId){
                state.loading.patch = false
                state.errors = action.payload['hydra:description']
                state.currentRequestId.patch = undefined
            }
        }),
        // remove
        builder.addCase(remove.pending, (state, action) => {
            if(!state.loading.remove){
                state.loading.remove = true
                state.currentRequestId.remove = action.meta.requestId
            }
        }),
        builder.addCase(remove.fulfilled, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.remove && state.currentRequestId.remove === requestId){
                state.loading.remove = false
                state.errors = null
                state.currentRequestId.remove = undefined
            }
        }),

        builder.addCase(remove.rejected, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.remove && state.currentRequestId.remove === requestId){
                state.loading.remove = false
                state.errors = action.payload['hydra:description']
                state.currentRequestId.remove = undefined
            }
        }),

        //find
        builder.addCase(find.pending, (state, action) => {
            if(!state.loading.get){
                state.loading.get = true
                state.currentRequestId.get = action.meta.requestId
            }
        }),
        builder.addCase(find.fulfilled, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.get && state.currentRequestId.get === requestId){
                state.loading.get = false
                state.items = action.payload.data
                state.totalItems = action.payload['hydra:totalItems']
                state.errors = null
                state.currentRequestId.get = undefined
            }
        }),

        builder.addCase(find.rejected, (state, action) => {
            const { requestId } = action.meta
            if(state.loading.get && state.currentRequestId.get === requestId){
                state.loading.get = false
                state.errors = action.payload
                state.currentRequestId.get = undefined
            }
        })    
    }
})

export default customerSlice.reducer