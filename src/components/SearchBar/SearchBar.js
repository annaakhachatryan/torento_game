import { useState } from 'react';
import { LocationOn as LocationOnIcon, ChevronRight, Search } from '@mui/icons-material'
import { Link, NavLink } from 'react-router-dom';
import './SearchBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice';
import { fetchGameData } from '../../store/slices/gameSlice/gameSliceAPI';

export const SearchBar = () => {
    const [search, setSearch] = useState()
    const { gameItem } = useSelector(selectGameDataSlice);
    const dispatch = useDispatch()

    const filter = (e) => {
        dispatch(fetchGameData());
        if (!e.target.value) {
            setSearch('')
        }
        if (e.target.value) {
            setSearch(gameItem.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())))        
        }
    }
    return (
        <div className='search'>
            <div className='searchNav'>
                <div className='route'>
                    <span style={{display:'flex', alignItems:'center'}}>
                        <LocationOnIcon className='icon' style={{color:'#484848',backgroundColor:'white',padding:'4px',borderRadius:'50%'}} />
                        <ChevronRight className='icon' style={{ color: 'white', marginLeft: '5px', marginRight: '5px' }} />
                    </span>
                    <NavLink style={{ background: 'transparent' }} to={'/'}>Главная страница</NavLink>
                </div>
                <div className='inp'>
                    <input type='text' placeholder='Поиск по сайту...' onChange={filter} />
                    <span style={{ position: 'relative' }}>
                        <Search className='icon lupa' style={{ color: 'white', position: 'absolute', left: '-32px', paddingTop:'4px' }} />
                    </span>
                </div>
            </div>
            
            <div className='searchDiv' style={{ display: !search ? 'none' : 'inline-block' }}>
                {
                    search &&
                    search.map((gameItem) => (
                        <div className="gameItem" key={gameItem?.id} >
                            <div className='eachItem searchDiv2'>
                                <Link to={`/${gameItem?.id}`}>
                                    <div style={{ color: '#8bc34a', width: '300px', }}>
                                        {gameItem?.name}
                                        <hr/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}


