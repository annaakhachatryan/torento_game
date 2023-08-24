import React, { useState } from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice';

export const Filter = () => {
    const {gameItem} = useSelector(selectGameDataSlice)
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <div className='newSite'>
            <p className='positionText'>Сортировать</p>
            <div className='position'>
                <p onClick={toggleModal} className='positionModalText'>
                    <p>По дате</p>
                    <div><ArrowDropDownOutlinedIcon className='icon' /></div>
                </p>
                {
                    isModalOpen &&
                    <div className='positionModal'>
                        <Link to='/newGames'>По дате</Link> <hr />
                        <Link to='/top100'>По популярности</Link> <hr />
                        <Link to='/Visits'>По посещаемости </Link> <hr />
                        <Link to='/CommentsPage'>По комментариям </Link> <hr />
                        <Link to='/newGames'>По алфавиту</Link>
                    </div>
                }
            </div>
        </div>
    )
}
