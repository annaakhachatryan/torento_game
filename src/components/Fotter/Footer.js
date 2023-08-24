import React from 'react';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

import './Footer.css';

export const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className='footerDivDirection' onClick={handleScrollToTop}>
                <p>Подняться наверх <ArrowCircleUpOutlinedIcon /></p>
            </div>
            <div className='footer'>
                <p>Copyright © 2014-2023</p>
                <p>Официальный сайт Торрент-Игруха</p>
                <p>| Контакты | Карта сайта</p>
            </div>
        </div>
    );
};
