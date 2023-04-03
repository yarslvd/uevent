import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Footer.scss';

const Footer = () => {
    const { t } = useTranslation();
    const events = t('footer.events.events', { returnObjects: true });
    const services = t('footer.services.services', { returnObjects: true });
    const about = t('footer.about.about', { returnObjects: true });

    return(
        <Container maxWidth='xl'>
            <div className='footer'>
                <div className="upper">
                    <Link to={'/'} className='logo'>
                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40 20.0385C40 31.1055 31.0457 40.0771 20 40.0771C8.9543 40.0771 0 31.1055 0 20.0385C0 14.9985 1.85709 10.3931 4.92308 6.87176C7.41833 4.00589 10.7143 1.85803 14.4615 0.778275C16.2203 0.271491 18.0785 0 20 0C21.4789 0 22.9203 0.160822 24.3077 0.465964C27.9618 1.26962 31.2416 3.07434 33.8462 5.57864C37.639 9.22544 40 14.3557 40 20.0385Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.4615 0.778275V12.3622C14.4615 13.9448 14.8205 15.1676 15.5385 16.0308C16.2564 16.894 17.3128 17.3256 18.7077 17.3256C19.7538 17.3256 20.7282 17.1098 21.6308 16.6782C22.5538 16.2466 23.4462 15.6403 24.3077 14.8593V0.465964C27.9618 1.26962 31.2416 3.07434 33.8462 5.57864V24.0462H27.9385C26.7487 24.0462 25.9692 23.5119 25.6 22.4432L25.0154 20.5934C24.4 21.1895 23.7641 21.7341 23.1077 22.2274C22.4513 22.7001 21.7436 23.1111 20.9846 23.4605C20.2462 23.7893 19.4462 24.0462 18.5846 24.2312C17.7231 24.4367 16.7795 24.5395 15.7538 24.5395C14.0103 24.5395 12.4615 24.2415 11.1077 23.6455C9.77436 23.0289 8.64615 22.176 7.72308 21.0867C6.8 19.9974 6.10256 18.7129 5.63077 17.2331C5.15897 15.7534 4.92308 14.1297 4.92308 12.3622V6.87176C7.41833 4.00589 10.7143 1.85803 14.4615 0.778275Z" fill="#1F1F1F"/>
                        </svg>
                        <h1>uevent</h1>
                    </Link>
                    <div className='links'>
                        <div className='column'>
                            <h4>{t('footer.events.title')}</h4>
                            <ul>
                                {events.map((el, index) => (
                                    <li key={index}><Link to={el.url}>{el.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className='column'>
                            <h4>{t('footer.services.title')}</h4>
                            <ul>
                                {services.map((el, index) => (
                                    <li key={index}><Link to={el.url}>{el.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className='column'>
                            <h4>{t('footer.about.title')}</h4>
                            <ul>
                                {about.map((el, index) => (
                                    <li key={index}><Link to={el.url}>{el.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className='column'>
                            <h4>{t('footer.contacts.title')}</h4>
                            <ul>
                                <li>
                                    <img src="/assets/phone_icon.png" alt="Phone" />
                                    <a href="tel:+380050673382">+380050673382</a>
                                </li>
                                <li>
                                    <img src="/assets/email_icon.png" alt="Email" />
                                    <a href="mailto:info@uevent.com">info@uevent.com</a>
                                </li>
                                <li>
                                    <img src="/assets/location_icon.png" alt="Location" />
                                    <a href="https://goo.gl/maps/EEiuaRPuVTBtnF85A" target='_blank' rel="noreferrer">Kharkiv, Pushkins’ka 79/1</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="down">
                    <div className='left'>
                        <small>Copyright © 2010-2023. All rights reserved.</small>
                    </div>
                    <div className='right'>
                        <a href="/"><img src="/assets/instagram_icon.png" alt="Instagram" /></a>
                        <a href="/"><img src="/assets/telegram_icon.png" alt="Telegram" /></a>
                        <a href="/"><img src="/assets/facebook_icon.png" alt="Facebook" /></a>
                        <a href="/"><img src="/assets/twitter_icon.png" alt="Twitter" /></a>
                        <a href="/"><img src="/assets/youtube_icon.png" alt="Youtube" /></a>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Footer;