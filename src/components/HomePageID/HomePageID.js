import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGame, postFetchComments } from '../../store/slices/gameSlice/gameSliceAPI';
import { decrementLikes, incrementLikes, selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice';
import { useParams, Link } from 'react-router-dom';
import { GamesLink } from '../GamesLink/GamesLink';
import GameImg1 from '../../Utils/img/1680015014_cover.webp';
import ReactPlayer from 'react-player';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import SendIcon from '@mui/icons-material/Send';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import './HomePageID.css';
import { GameComment } from '../GameComment/GameComment';

export const HomePageID = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { game, currentUser, commentsItem } = useSelector(selectGameDataSlice);

    useEffect(() => {
        dispatch(fetchGame(id));
    }, [id]);

    const commentsRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const commentInput = commentsRef.current.value;

        if (!commentInput) {
            return;
        }

        const newComment = {
            id: new Date().getTime().toString(),
            userID: currentUser.id,
            gameID: id,
            comment: commentInput,
            date: new Date(),
            likes: 0,
        };

        dispatch(postFetchComments(newComment));
        commentsRef.current.value = '';
    };

    const handleIncrementLikes = () => {
        dispatch(incrementLikes(id));
    };

    const handleDecrementLikes = () => {
        dispatch(decrementLikes(id));
    };

    const filteredComments = commentsItem.filter(comment => comment.gameID === id);


    return (
        <div className='ganz'>
            <div className='ganzO'>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='gameName'>
                        <p>{game?.name}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p><span>🕓 Обновлено: </span>{game?.updateDate} / </p>
                            <p>👁️{game?.visits}</p>
                        </div>
                        <div className='gameLIkes'>
                            <ThumbDownOutlinedIcon onClick={handleDecrementLikes} className='icon' style={{ color: 'red' }} />
                            +{game?.likes}
                            <ThumbUpOutlinedIcon onClick={handleIncrementLikes} className='icon' style={{ color: 'blue' }} />
                        </div>
                    </div>
                </div>
                <div className='aboutGameInfo'>
                    <div className='gameInfoImg'>
                        <img src={game?.image} alt='' title={game?.name} />
                        <button>Отписаться от обновлений</button>
                        <p>Подписалось : 303</p>
                    </div>
                    <div>
                        <p>Дата обновления : {game?.updateDate}</p>
                        <p>Жанр : {game?.janre}</p>
                        <p>Разработчик : {game?.developer}</p>
                        <div>
                            <p><span>Издательство в России :</span> {game?.publisher}</p>
                            <p><span>Тип издания :</span> {game?.publishingType}</p>
                            <p><span>Язык интерфейса :</span> <b>{game?.interfaceLanguage}</b></p>
                            <p><span>Язык озвучки :</span> <b>{game?.speechLanguage}</b></p>
                            <p><span>Таблетка :</span> <b>{game?.tablet}</b></p>
                        </div>
                        <div>
                            <h3>Системные требования</h3>
                            <p>Операционная система : {game?.systemDemands?.operatingSystem}</p>
                            <p>Процессор : {game?.systemDemands?.cpu}</p>
                            <p>Оперативная память : {game?.systemDemands?.ram}</p>
                            <p>Видеокарта : {game?.systemDemands?.gpu}</p>
                            <p>Звуковая карта : {game?.systemDemands?.volumeCard}</p>
                            <p>Свободное место на жестком диске : {game?.systemDemands?.storage}</p>
                        </div>
                    </div>
                </div>

                <div className='des as'>
                    <p><b className='gameDes'>Описание игры :</b></p>
                    <p>{game?.description}</p>

                    <div className='as'>
                        {game?.peculiarities && <p><b className='gameDes'>Особенность игры :</b> </p>}
                        {game?.peculiarities?.pec1 && <p> - {game?.peculiarities?.pec1} </p>}
                        {game?.peculiarities?.pec2 && <p> - {game?.peculiarities?.pec2} </p>}
                        {game?.peculiarities?.pec3 && <p> - {game?.peculiarities?.pec3} </p>}
                        {game?.peculiarities?.pec4 && <p> - {game?.peculiarities?.pec4} </p>}
                        {game?.peculiarities?.pec5 && <p> - {game?.peculiarities?.pec5} </p>}
                        {game?.peculiarities?.pec6 && <p> - {game?.peculiarities?.pec6} </p>}
                        {game?.peculiarities?.pec7 && <p> - {game?.peculiarities?.pec7} </p>}
                    </div>

                    <div className='trailer'>
                        <p className='gameplay'><b>Трейлер / Геймплей:</b></p>
                        {game?.trailer && (<ReactPlayer url={game?.trailer} width="90%" height="360px" controls={true} />)}
                    </div>
                    <div className='download'>
                        <p><span>Размер:</span>{game?.systemDemands?.storage} | Актуальная версия</p>
                        {currentUser === null ? <button style={{ display: 'none' }}>Скачать игру</button> : <button>Скачать игру</button>}
                    </div>
                    
                </div>
                <GameComment/>
            </div>

            <div className='center'>
                <p>Уже доступны!</p>
                <img className="gameImg" src={GameImg1} alt="" />
                <GamesLink />
            </div>
        </div>
    );
};
