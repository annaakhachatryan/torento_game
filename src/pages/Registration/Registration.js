import React, { useEffect, useRef, useState } from 'react';
import { GamesLink } from '../../components/GamesLink/GamesLink';
import './Registration.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameDataSlice } from '../../store/slices/gameSlice/gameSlice';
import { fetchGameUser, postFetchUser } from '../../store/slices/gameSlice/gameSliceAPI';
import { addText, changeStatus, selectPinData } from '../../store/slices/gameSlice/pinSlice';

export const Registration = () => {
    const { usersItem } = useSelector(selectGameDataSlice);
    const dispatch = useDispatch();
    const [random3, setRandom] = useState('')
    useEffect(() => {
        setRandom(Math.floor(Math.random() * 9) + 1 + '' + Math.floor(Math.random() * 9 + 1) +
            Math.floor(Math.random() * 9 + 1) + Math.floor(Math.random() * 9 + 1))
        dispatch(fetchGameUser());
    }, []);

    const loginRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { status, textt } = useSelector(selectPinData)
    const confirmPasswordRef = useRef(null);
    const handlerSubmit = (e) => {
        e.preventDefault();
        const login = loginRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const uniqUser = usersItem.find((user) => user.login === login || user.email === email);
        if (uniqUser) {
            return;
        }
        if (password !== confirmPassword) {
            alert('Your password is wrong!');
        }
        dispatch(
            postFetchUser({
                id: new Date().getTime().toString(),
                login,
                email,
                password,
                confirmPassword,
                status: false,
            })
        );
        alert('You have registered!')

        loginRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
    };

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const random = arr.sort(() => Math.random() - 0.5)
    const random2 = random3
    const res = random2.toString().split('')
    const checkNumber = (num) => {
        dispatch(addText(num))
        for (let i = 0; i < 4; i++) {
            if (res[i] === num.toString()) {
                if (textt.length === 3) {
                    if ('' + textt.join('').toString() + num === random2.toString()) {
                        dispatch(changeStatus())
                        console.log(status);
                    }
                }
                break
            }
        }
    }

    return (
        <div className='HomePage'>
            <form className='registration' onSubmit={handlerSubmit}>
                <h2>Быстрая регистрация:</h2>
                <p>
                    Регистрация на нашем сайте позволит Вам быть его полноценным участником. Вы сможете оставлять свои
                    комментарии, выставлять рейтинг и многое другое.
                </p>
                <span>Логин: *</span>
                <br />
                <input style={{ width: '380px' }} type='text' className='inpReg' ref={loginRef} />
                <button className='regName'>Проверить имя</button>
                <br />
                <span>Ваш E-Mail: *</span>
                <br />
                <input type='text' className='inpReg' ref={emailRef} />
                <br />
                <span>Пароль: *</span>
                <br />
                <input type='password' className='inpReg' ref={passwordRef} />
                <br />
                <span>Повторите пароль: *</span>
                <br />
                <input type='password' className='inpReg' ref={confirmPasswordRef} />
                <br />
                <div
                    style={{
                        display: 'grid',
                        gridColumn: '3',
                        gridRow: '3',
                        padding: '15px 10px 15px 130px',
                        height: '100',
                        width: '210',
                        margin: '10px',
                        font: 'bold 36px/100px Tahoma',
                        color: '#666',
                        position: 'relative',
                    }}
                >
                    <ul
                        className='pinbot-input'
                    >
                        <li onClick={() => checkNumber(random[0])}>{random[0]}</li>
                        <li onClick={() => checkNumber(random[1])}>{random[1]}</li>
                        <li onClick={() => checkNumber(random[2])}>{random[2]}</li>
                        <li onClick={() => checkNumber(random[3])}>{random[3]}</li>
                        <li onClick={() => checkNumber(random[4])}>{random[4]}</li>
                        <li onClick={() => checkNumber(random[5])}>{random[5]}</li>
                        <li onClick={() => checkNumber(random[6])}>{random[6]}</li>
                        <li onClick={() => checkNumber(random[7])}>{random[7]}</li>
                        <li onClick={() => checkNumber(random[8])}>{random[8]}</li>
                    </ul>
                    <a href='' style={{ marginLeft: '110px', position: 'relative', top: '10px' }}>Change Number</a>
                    <h3 style={{ marginLeft: '110px', position: 'relative', bottom: '80px' }}>your pin:{textt}</h3>
                    <h2 style={{ position: 'relative', bottom: '200px', marginLeft: '98px', fontSize: '45px', color: status && 'green' }}>
                        PIN:{random2}
                    </h2>
                </div>
                <button className='RegBtn'>Отправить</button>
            </form>

            <div className='center'>
                <p>Уже доступны!</p>
                <img
                    className='gameImg'
                    src='https://itorrents-igruha.org/uploads/posts/2023-02/1677002741_cover2.jpg'
                    alt=''
                />
                <GamesLink />
            </div>
        </div>
    );
};
