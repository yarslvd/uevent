import { motion } from 'framer-motion';
import './Main.scss';

import Layout from '../../components/Layout/Layout';
import Carousel from '../../components/Carousel/Carousel';

const slides = [
    { title: 'Jome', url: 'https://static.tumblr.com/wvzujvn/oF3r5yppc/lot2022.jpg' },
    { title: 'Case', url: 'https://storage.concert.ua/JEC/4/Cr/63b56a0bc62b9/6301.png:31-eventpage-main_banner-desktop' },
    { title: 'Jese', url: 'https://www.mancity.com/meta/media/cnnp0xms/wknd.png?width=1620' },
    { title: 'Lola', url: 'https://storage.concert.ua/JWd/16/RN/6282001ee74da/752f.jpg:31-eventpage-main_banner-desktop' },
];

const Main = () => {
    return (
        <Layout>
            <div className='carousel-container'>
                <Carousel slides={slides} />
            </div>
        </Layout>
    );
}

export default Main;