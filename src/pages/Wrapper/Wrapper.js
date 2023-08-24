import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import Sunny from '../../Utils/img/sunny.img'
import Moon from '../../Utils/img/moon.img'
import Avatar from '../../Utils/img/noavatar.img'
import KeyIcon from '@mui/icons-material/Key';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import './Wrapper.css'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { Footer } from '../../components/Fotter/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGameUser } from '../../store/slices/gameSlice/gameSliceAPI'
import { getCurrentUser, resetText, selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice'
export const Wrapper = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [form, setForm] = useState(false)
    const loginRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { usersItem, currentUser } = useSelector(selectGameDataSlice);
    console.log(currentUser);
    useEffect(() => {
        dispatch(fetchGameUser());
    }, [dispatch]);
    const handleLogout = () => {
        dispatch(getCurrentUser(null))
        navigate('/')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const [{ value: login }, { value: password }] = loginRef.current;
        const user = usersItem.find((user) => user.login === login && user.password === password);
        if (login === '' || password === '') {
            alert('Please fill in both login and password fields.');
            return;
        }

        if (user) {
            dispatch(getCurrentUser(user));
            navigate('/');
            setForm(false);
            loginRef.current[0].value = '';
            loginRef.current[1].value = '';
            return ;
        }else{
            alert('Something is wrong!')
        }
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }
    function statusChange() {
        form ? setForm(false) : setForm(true)
    }
    if (darkMode) {
        document.body.style.backgroundColor = '#313843';
        document.body.style.color = '#fff';
    } else {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#313843';
    }
    return (
        <div className='Wrapper'>
            <header className='wrapperLink'>
                <div style={{ padding: '13px' }}>
                    <Link to='/'>Главная</Link>
                    <Link to='/newGames'>Новые игры</Link>
                    <Link to='/games-2022'>2022</Link>
                    <Link to='/games-2023'>2023</Link>
                    <Link to='/repack-by-igruha'>Репаки от Игрухи</Link>
                    <Link to='/igry-po-seti/'>По сети</Link>
                </div>
                <div className='avatar'>
                    <div className='darkMode' onClick={toggleDarkMode}>
                        {darkMode ? (<img className='light' src={Moon} alt='' />) : (<img src={Sunny} className='light' alt='' />)}
                    </div>
                    <div>
                        <p className='darkModeP'>
                            {
                                currentUser ?
                                <span>{currentUser.login}</span>
                                :
                                <span onClick={statusChange}>Войти</span>
                            }
                            {
                                currentUser ?
                                <span onClick={handleLogout}>Выйти</span>
                                :
                                <span onClick={()=>{navigate('/registration')}}>Регистрация</span>
                            }
                        </p>
                    </div>
                    <div className='avatar'>
                        <img src={Avatar} alt='' onClick={statusChange} />
                        <div>
                            <form ref={loginRef} onSubmit={handleSubmit} className='WrapForm' style={{ left: form ? '-33vh' : '1000px' }}>
                                <p>Логин:</p>
                                <input type="text" />
                                <p>Пароль:</p>
                                <input type="password" />
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0' }}>
                                        <input type='checkbox' /> <p style={{ fontSize: '12px' }}>Не запоминать</p>
                                    </div>
                                    <button>Войти</button>
                                </div>
                                <hr />
                                <div className='regLinks'>
                                <Link className='reg'><KeyIcon />Напомнить пароль?</Link>
                                <Link to='/registration' className='reg'><PersonAddAltRoundedIcon />Регистрация</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            <nav className='conatiner'>
                <div className='flexCont'>
                    <div className='left'>
                        <Link to={'/'}>
                            <div className='Link'>
                                <p className='org'>ORG</p>
                                <p className='TorrentIgruha'>Торрент <span className='igruha'>Игруха</span></p>
                                <p className='site'>Официальный сайт | Качай сколько влезет ;)</p>
                            </div>
                        </Link>
                    </div>
                    <div className='right'>
                        <Link to={'/top10'} className='NavLink'>
                            Топ 10 Онлайн игр
                        </Link>
                        <Link to={'/top100'} className='NavLink'>
                            Топ 100 игр
                        </Link>
                        <Link to={'/russian'} className='NavLink' >
                            С русcкой озвучкой
                        </Link>
                        <Link style={{backgroundColor:'rgb(14, 172, 221)'}} to={'/repack'} className='NavLink'>
                            Репаки от Игрухи
                        </Link>
                    </div>
                </div>
            </nav>
            <SearchBar />
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </div>
    )
}













