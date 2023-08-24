import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice';
import { fetchGameData } from '../../store/slices/gameSlice/gameSliceAPI';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';
import GameImg1 from '../../Utils/img/1680015014_cover.webp';
import './HomePage.css';
import { GamesLink } from '../../components/GamesLink/GamesLink';

export const HomePage = () => {
    const dispatch = useDispatch();
    const { gameItem } = useSelector(selectGameDataSlice);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedItems, setDisplayedItems] = useState([]);

    useEffect(() => {
        dispatch(fetchGameData());
    }, [dispatch]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * 8;
        const endIndex = startIndex + 8;
        setDisplayedItems(gameItem.slice(startIndex, endIndex));
    }, [gameItem, currentPage]);

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <div className="HomePage">
            <div>
                <div className="newSite">
                    <p className="newSiteBorder">Новое на сайте</p>
                    <Link to='/Comments' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 7px' }}>
                        Последние комментарии <ArrowCircleRightOutlinedIcon />
                    </Link>
                </div>
                <div className="homePageContainer">
                    <div>
                        {displayedItems.map((gameItem) => ( // Maps over the `displayedItems` array and renders game items
                            <div className="gameItem" key={gameItem?.id}>
                                <div className='item3'>
                                    <div className="eachItem">
                                        <Link to={`/${gameItem?.id}`}>
                                            <img src={gameItem?.image} title={gameItem?.name} alt="" />
                                            <div style={{ textAlign: 'center' }}>{gameItem?.name}</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className='swiper' style={{ textAlign: 'center', margin: "20px" }}>
                        <Link to="/" onClick={() => handlePageClick(1)}>1</Link>
                        <Link to="#2" onClick={() => handlePageClick(2)}>2</Link>
                        <Link to="#3" onClick={() => handlePageClick(3)}>3</Link>
                        {/* <Link to="#4" onClick={() => handlePageClick(4)}>4</Link> */}
                        {/* <Link to="#5" onClick={() => handlePageClick(5)}>5</Link> */}
                    </div>
                </div>
            </div>

            <div className='center'>
                <p style={{fontSize:'18px'}}>Уже доступны!</p>
                <img className="gameImg" src={GameImg1} alt="" />
                <div><GamesLink /></div>
            </div>
        </div>
    );
};
