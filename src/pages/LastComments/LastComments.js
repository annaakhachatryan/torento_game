import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice';
import { fetchGameComments, fetchGameData, fetchGameUser, postFetchComments } from '../../store/slices/gameSlice/gameSliceAPI';
import { GamesLink } from '../../components/GamesLink/GamesLink';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Link } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';

import './LastComment.css'

export const LastComments = () => {
    const dispatch = useDispatch();
    const { commentsItem, usersItem, gameItem, currentUser } = useSelector(selectGameDataSlice);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [likedComments, setLikedComments] = useState([]);

    useEffect(() => {
        dispatch(fetchGameUser());
        dispatch(fetchGameComments());
        dispatch(fetchGameData());
    }, [dispatch]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * 6;
        const endIndex = startIndex + 6;
        setDisplayedItems(commentsItem.slice(startIndex, endIndex));
    }, [commentsItem, currentPage]);

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const handleLikeComment = (commentId) => {
        if (likedComments.includes(commentId)) {
            setLikedComments(likedComments.filter((id) => id !== commentId));
        } else {
            setLikedComments((prevState) => [...prevState, commentId]);
        }
    };

    return (
        <div className='LastComments'>
            <div>
                {displayedItems.map((comment) => {
                    const user = usersItem.find((user) => user.id === comment.userID);
                    const gameName = gameItem.find((game) => game.id === comment.gameID);
                    const isLiked = likedComments.includes(comment.id);

                    return (
                        <div className='bigDivComment' key={comment?.id}>
                            <div className='eachCommentItem'>
                                <div className='status'>
                                    <img src='https://itorrents-igruha.org/templates/gamestorgreen/dleimages/noavatar.png' alt='' />
                                    <p className='on' style={currentUser && currentUser.id === comment.userID ? { backgroundColor: '#8bc34a' } : { backgroundColor: '#797979' }}>
                                        {currentUser && currentUser.id === comment.userID ? 'online' : 'offline'}
                                    </p>
                                </div>
                                <div className='comInfo'>
                                    <p style={{ display: 'flex', justifyContent: 'end' }} className='nameDate'>
                                        {user?.login} <span>{comment?.date}</span>
                                    </p>
                                    <Link to={`/${comment?.userID}`}>{gameName?.name}</Link>
                                    <div className='comment'>
                                        <ChevronRightOutlinedIcon />
                                        <p style={{ fontSize: '15px', marginTop: '8px' }}>{comment?.comment}</p>
                                    </div>
                                    {isLiked ? (
                                        <p className='likes' style={{ color: '#98c662' }}>
                                            <FavoriteIcon
                                                style={{ marginTop: '5px', cursor: 'pointer' }}
                                                onClick={() => handleLikeComment(comment.id)}
                                            />
                                            <span>{comment?.likes + (isLiked ? 1 : 0)}</span>
                                        </p>
                                    ) : (
                                        <p className='likes' style={{ color: '#98c662' }}>
                                            <FavoriteBorderOutlinedIcon
                                                style={{ marginTop: '5px', cursor: 'pointer' }}
                                                onClick={() => handleLikeComment(comment.id)}
                                            />
                                            <span>{comment?.likes + (isLiked ? 1 : 0)}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div>
                    <div className='swiper' style={{ textAlign: 'center', margin: '20px' }}>
                        <Link to='#1' onClick={() => handlePageClick(1)}>1</Link>
                        <Link to='#2' onClick={() => handlePageClick(2)}>2</Link>
                        <Link to='#3' onClick={() => handlePageClick(3)}>3</Link>
                        <Link to='#4' onClick={() => handlePageClick(4)}>4</Link>
                        <Link to='#5' onClick={() => handlePageClick(5)}>5</Link>
                        <Link to='#6' onClick={() => handlePageClick(6)}>6</Link>
                    </div>
                </div>
            </div>

            <div className='center'>
                <p style={{ textAlign: 'center' }}>Уже доступна!</p>
                <img className='gameImg' src='https://itorrents-igruha.org/uploads/posts/2023-02/1677002741_cover2.jpg' alt='' />
                <GamesLink />
            </div>
        </div>
    );
};
