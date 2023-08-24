import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice';
import { fetchGameData } from '../../store/slices/gameSlice/gameSliceAPI';
import { Link } from 'react-router-dom';
import '../../pages/Page2022/Page2022'
import { GamesLink } from '../../components/GamesLink/GamesLink';
import { Filter } from '../../components/Filter/Filter';

export const ReparkOxataba = () => {
    const dispatch = useDispatch();
    const { gameItem } = useSelector(selectGameDataSlice);

    useEffect(() => {
        dispatch(fetchGameData());
    }, [dispatch]);

    const filteredGameItems = gameItem.filter(
        (gameItem) => gameItem.repack === 'хатаб'
    );
    return (
        <div className='HomePage'>
            <div>
                <Filter/>
                <div className="homePageContainer">
                    <div>
                        {filteredGameItems.map((gameItem) => (
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
            </div>

            <div className='center'>
                <p>Уже доступна!</p>
                <img className='gameImg' src='https://itorrents-igruha.org/uploads/posts/2023-02/1677002741_cover2.jpg' alt="" />
                <GamesLink />
            </div>
        </div>
    );
}
