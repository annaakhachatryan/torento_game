import React from 'react'
import { Link } from 'react-router-dom'
import './GamesLink.css'
export const GamesLink = () => {
    return (
        <div>
            <div className='gamesLink' style={{display:'flex', flexDirection:'column'}}>
                        <Link to='/newGames' className='NavLink'>Новые игры 🔥 | Все игры</Link>
                        <Link to='/games-2023' className='NavLink' style={{color:'#fff27c'}}>Релизы июня 2023 ⏳</Link>
                        <Link to='/russian' className='NavLink'>Русская озвучка (Rus)</Link>
                        <Link to='/zhdem-vyhoda' className='NavLink'>Ждем выхода (Waiting)</Link> 
                        <h3 style={{textAlign:'center', color:'gray'}}>Категории</h3>
                        <Link to='/top10' className='NavLink' style={{backgroundColor:'rgb(14, 172, 221)'}}>Игры с онлайном</Link>                     
                        <Link to='/igry-po-seti' className='NavLink'>Игры по сети</Link>                     
                        <Link to='/repack' className='NavLink'>Репаки от Игрухи</Link>                     
                        <Link to='/repack-otxataba' className='NavLink'>Репаки от Хатаба</Link>                     
                        <Link to='/repack-ot-mechanics' className='NavLink'>Репаки от Механиков</Link>                     
                        <Link to='/games-2023' className='NavLink'>Игры 2023 года</Link>                     
                        <Link to='/games-2022' className='NavLink'>Игры 2022 года</Link>                     
                        <Link to='/games-2021' className='NavLink'>Игры 2021 года</Link>                     
                        <Link to='/games-2020' className='NavLink'>Игры 2020 года</Link>                     
                        <Link to='/games-2019' className='NavLink'>Игры 2019 года</Link>                     
                        <Link to='/games-2018' className='NavLink'>Игры 2018 года</Link>                    
                    </div> 
        </div>
    )
}
