import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDownloadLink, setGame } from "./gameSlice";

export const fetchGameData = createAsyncThunk(
    'gamesData/fetchGameData',
    async () => {
        const response = await fetch('http://localhost:3001/games');
        const data = await response.json();
        return data;
});

export const fetchGame = createAsyncThunk(
    'gamesData/fetchGame',
    async (id) => {
        const response = await fetch(`http://localhost:3001/games/${id}`);
        const data = await response.json();
        return data;
});

export const fetchGameComments = createAsyncThunk(
    'gamesData/fetchGameComments',
    async () => {
        const response = await fetch('http://localhost:3001/comments');
        const data = await response.json();
        return data;
});

export const fetchComments = createAsyncThunk(
    'gamesData/fetchComments',
    async (id) => {
        const response = await fetch(`http://localhost:3001/comments/${id}`);
        const data = await response.json();
        return data;
});

export const postFetchComments = createAsyncThunk(
    'gamesData/postFetchComments',
    async (data) =>{
        const result = await fetch('http://localhost:3001/comments',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        return result.json()
    }
)

export const fetchGameUser = createAsyncThunk(
    'gamesData/fetchGameUser',
    async () => {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        return data;
});

export const fetchUSer = createAsyncThunk(
    'gamesData/fetchUSer',
    async (id) => {
        const response = await fetch(`http://localhost:3001/users/${id}`);
        const data = await response.json();
        return data;
});


export const postFetchUser = createAsyncThunk(
    'gamesData/postFetchUser',
    async (data) =>{
        const result = await fetch('http://localhost:3001/users',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        return result.json()
    }
)
