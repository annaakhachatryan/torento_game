import { createSlice } from "@reduxjs/toolkit";
import { fetchComments, fetchGame, fetchGameComments, fetchGameData, fetchGameUser, fetchUSer, postFetchComments, postFetchUser } from "./gameSliceAPI";

const gameDataSlice = createSlice({
    name: 'gamesData',
    initialState: {
        gameItem: [],
        game: {},
        commentsItem: [],
        comments: {},
        usersItem: [],
        user: {},
        currentUser:null,
        isUserAuth: false,
        text:''
    },
    reducers: {
        incrementLikes(state) {
            state.game.likes++;
        },
        decrementLikes(state) {
            if (state.game.likes > 0) {
                state.game.likes--;
            }
        },
        getCurrentUser(state, {payload}) {
            state.currentUser = payload
        },
        isAuthUser(state, {payload}) {
            state.isUserAuth = payload
        },
        resetText(state, {payload}){
            state.text = '';
        }
    },
    extraReducers: {
        [fetchGameData.fulfilled]: (state, { payload }) => {
            state.gameItem = payload;
        },
        [fetchGame.fulfilled]: (state, { payload }) => {
            state.game = payload;
        },
        [fetchGameComments.fulfilled]: (state, { payload }) => {
            state.commentsItem = payload;
        },
        [fetchComments.fulfilled]: (state, { payload }) => {
            state.comments = payload;
        },
        [fetchGameUser.fulfilled]: (state, { payload }) => {
            state.usersItem = payload;
        },
        [fetchUSer.fulfilled]: (state, { payload }) => {
            state.user = payload;
        },
        [postFetchUser.fulfilled] : (state, {payload}) => {
            state.usersItem =  [
                ...state.usersItem,
                {
                    id: payload.id,
                    login: payload.login,
                    email:payload.email,
                    password: payload.password,
                    confirmPassword:payload.confirmPassword,
                    status: false,
                }
            ]
        },
        [postFetchComments.fulfilled] : (state, {payload}) => {
            state.commentsItem =  [
                ...state.commentsItem,
                {
                    id: payload.id,
                    userID: payload.userID,
                    gameID: payload.gameID,
                    comment: payload.comment,
                    date: payload.date,
                    likes: payload.likes,
                }
            ]
        },
    }
});

export const selectGameDataSlice = state => state.gamesData;

export const { incrementLikes, decrementLikes, getCurrentUser,isAuthUser, resetText } = gameDataSlice.actions;
export const gameDataReducer = gameDataSlice.reducer;
