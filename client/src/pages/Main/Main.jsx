import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import Carousel from '../../components/Carousel/Carousel';
import WideCard from '../../components/WideCard/WideCard';
import Card from '../../components/Card/Card';

import './Main.scss';

const slides = [
    { title: 'Jome', url: 'https://static.tumblr.com/wvzujvn/oF3r5yppc/lot2022.jpg' },
    { title: 'Case', url: 'https://storage.concert.ua/JEC/4/Cr/63b56a0bc62b9/6301.png:31-eventpage-main_banner-desktop' },
    { title: 'Jese', url: 'https://www.mancity.com/meta/media/cnnp0xms/wknd.png?width=1620' },
    { title: 'Lola', url: 'https://storage.concert.ua/JWd/16/RN/6282001ee74da/752f.jpg:31-eventpage-main_banner-desktop' },
];

const popularEvents = [
    { title: 'Harry Styles', location: 'Палац студентів НТУ “ХПІ”', time: '16:00', date: '28 КВІ 2023', price: 400 ,image_url: 'https://media.architecturaldigest.com/photos/623e05e0b06d6c32457e4358/master/pass/FINAL%20%20PFHH-notextwlogo.jpg' },
    { title: 'The Weeknd', location: 'Палац студентів НТУ “ХПІ”', time: '18:00', date: '29 БЕР 2023', price: 400 ,image_url: 'https://www.livenationentertainment.com/wp-content/uploads/2022/03/TR_NationalAsset_TheWeeknd_SG_1200x628.jpg' },
    { title: 'Океан Ельзи. Світовий тур 2023', location: 'Стадіон Металіст', time: '18:00', date: '17 ЧЕР 2023', price: 550 ,image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
];

const newEvents = [
    { title: 'Harry Styles', location: 'Палац студентів НТУ “ХПІ”', time: '16:00', date: '28 КВІ 2023', price: 400 ,image_url: 'https://media.architecturaldigest.com/photos/623e05e0b06d6c32457e4358/master/pass/FINAL%20%20PFHH-notextwlogo.jpg' },
    { title: 'The Weeknd', location: 'Палац студентів НТУ “ХПІ”', time: '18:00', date: '29 БЕР 2023', price: 400 ,image_url: 'https://www.livenationentertainment.com/wp-content/uploads/2022/03/TR_NationalAsset_TheWeeknd_SG_1200x628.jpg' },
    { title: 'Океан Ельзи. Світовий тур 2023', location: 'Стадіон Металіст', time: '18:00', date: '17 ЧЕР 2023', price: 550 ,image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
    { title: 'Океан Ельзи. Світовий тур 2023', location: 'Стадіон Металіст', time: '18:00', date: '17 ЧЕР 2023', price: 550 ,image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
];

const Main = () => {
    const matches = useMediaQuery('(max-width:800px)');
    const { t } = useTranslation();

    return (
        <Layout>
            <div className='carousel-container'>
                <Carousel slides={slides} />
            </div>
            <div className='popularEvents mainEvents'>
                <div className='title'>
                    <h2>Популярні події</h2>
                    <img src="/assets/popularEvents_illustration.svg" alt="" />
                </div>
                <div className='events'>
                    {popularEvents.map((el, index) => (
                        matches ?
                            <Card {...el} key={index}/> :
                            <WideCard {...el} key={index}/>
                    ))}
                    <a href="/popular" className='more-link'>Більше</a>
                </div>
            </div>
            <div className="nearestEvents mainEvents">
                <div className="title">
                    <h2>Найближчі події</h2>
                    <img src="/assets/upcommingEvents_illustration.svg" alt="" />
                </div>
                <div className="events">
                    {popularEvents.map((el, index) => (
                        matches ?
                            <Card {...el} key={index}/> :
                            <WideCard {...el} key={index}/> 
                    ))}
                    <a href="/closest" className='more-link'>Більше</a>
                </div>
            </div>
            <div className="new">
                <div className="title_new">
                    <h2>Новинки</h2>
                </div>
                <div className="events_new">
                    {newEvents.map((el, index) => (
                        <Card {...el} key={index}/>
                    ))}
                </div>
                <a href="/new" className='more-link'>Більше</a>
            </div>
        </Layout>
    );
}

export default Main;