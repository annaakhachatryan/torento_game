
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice';
import { fetchGame, fetchGameComments, fetchGameData, fetchGameUser, postFetchComments } from '../../store/slices/gameSlice/gameSliceAPI';
import { GamesLink } from '../../components/GamesLink/GamesLink';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Link, useParams } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';

export const GameComment = () => {
    const dispatch = useDispatch();
    const { commentsItem, usersItem, currentUser, game,comments } = useSelector(selectGameDataSlice);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [likedComments, setLikedComments] = useState([]);
    const { id } = useParams();

    const gameComments  = commentsItem.filter((comm) => comm.gameID === game.id)

    console.log(gameComments);

    useEffect(() => {
        dispatch(fetchGameUser());
        dispatch(fetchGameComments());
        dispatch(fetchGameData());
        dispatch(fetchGame())
    }, [id]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * 6;
        const endIndex = startIndex + 6;
        setDisplayedItems(commentsItem.slice(startIndex, endIndex));
    }, [commentsItem, currentPage]);

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const commentsRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const commentInput = commentsRef.current.value;

        if (!commentInput) {
            return;
        }

        const newComment = {
            id: new Date().getTime().toString(),
            userID: +id,
            gameID: +id,
            comment: commentInput,
            date: new Date(),
            likes: 0,
        };

        dispatch(postFetchComments(newComment));
        commentsRef.current.value = '';
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
                {gameComments.map((comment) => {
                    const user = usersItem.find((user) => user.id === comment.userID);
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className='nameDate'>
                                        <p> {user?.login}</p> 
                                        <p>{comment?.date}</p>
                                    </div>
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
                    </div>
                </div>

                {currentUser ? (
                    <div>
                        <form className='commentsForm' onSubmit={handleSubmit}>
                            <input type='text' ref={commentsRef} />
                            <button type='submit'><SendIcon /></button>
                        </form>
                    </div>
                ) : (
                    <div style={{ display: 'none' }}>
                        <form onSubmit={handleSubmit}>
                            <input type='text' ref={commentsRef} />
                            <button type='submit'><SendIcon /></button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
