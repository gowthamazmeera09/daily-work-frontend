import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: localStorage.getItem('userId'),
    profilepicture:localStorage.getItem('profilePicture'),
    isAuthenticated:false
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.userId = action.payload.userId;
            state.profilepicture = action.payload.profilepicture;
            state.isAuthenticated = true
        },
        logout:(state)=>{
            state.userId = null;
            state.profilepicture = null;
            state.isAuthenticated = false
        },
    },
});
export const {login, logout} = userSlice.actions;
export default userSlice.reducer;