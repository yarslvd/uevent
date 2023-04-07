import { useState } from 'react';
import { useMediaQuery, Pagination } from '@mui/material';

import Layout from '../../components/Layout/Layout';
import Filters from '../../components/Filters/Filters';
import Card from '../../components/Card/Card';
import WideCard from '../../components/WideCard/WideCard';
import { useGetEventsQuery } from '../../redux/api/fetchEventsApi';

import styles from './AllEvents.module.scss';

// const popularEvents = [
//   { title: 'Harry Styles', location: 'Палац студентів НТУ “ХПІ”', time: '16:00', date: '28 КВІ 2023', price: 400 ,image_url: 'https://media.architecturaldigest.com/photos/623e05e0b06d6c32457e4358/master/pass/FINAL%20%20PFHH-notextwlogo.jpg' },
//   { title: 'The Weeknd', location: 'Палац студентів НТУ “ХПІ”', time: '18:00', date: '29 БЕР 2023', price: 400 ,image_url: 'https://www.livenationentertainment.com/wp-content/uploads/2022/03/TR_NationalAsset_TheWeeknd_SG_1200x628.jpg' },
//   { title: 'Океан Ельзи. Світовий тур 2023', location: 'Стадіон Металіст', time: '18:00', date: '17 ЧЕР 2023', price: 550 ,image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
//   { title: 'Harry Styles', location: 'Палац студентів НТУ “ХПІ”', time: '16:00', date: '28 КВІ 2023', price: 400 ,image_url: 'https://media.architecturaldigest.com/photos/623e05e0b06d6c32457e4358/master/pass/FINAL%20%20PFHH-notextwlogo.jpg' },
//   { title: 'The Weeknd', location: 'Палац студентів НТУ “ХПІ”', time: '18:00', date: '29 БЕР 2023', price: 400 ,image_url: 'https://www.livenationentertainment.com/wp-content/uploads/2022/03/TR_NationalAsset_TheWeeknd_SG_1200x628.jpg' },
//   { title: 'Океан Ельзи. Світовий тур 2023', location: 'Стадіон Металіст', time: '18:00', date: '17 ЧЕР 2023', price: 550 ,image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
//   { title: 'The Weeknd', location: 'Палац студентів НТУ “ХПІ”', time: '18:00', date: '29 БЕР 2023', price: 400 ,image_url: 'https://www.livenationentertainment.com/wp-content/uploads/2022/03/TR_NationalAsset_TheWeeknd_SG_1200x628.jpg' },
//   { title: 'Океан Ельзи. Світовий тур 2023', location: 'Стадіон Металіст', time: '18:00', date: '17 ЧЕР 2023', price: 550 ,image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
// ];

const AllEvents = () => {
  const matches = useMediaQuery('(max-width:800px)');

  const [page, setPage] = useState(0);

  const { isLoading, data, error } = useGetEventsQuery({ page });
  console.log(data);

  const handlePageChange = (e, p) => {
    setPage(p - 1);

    const body = document.querySelector('#root');
    body.scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <Layout>
        <div className={styles.container}>
            <Filters />
            <div className={styles.events_container}>
              <div className={styles.events}>
                {!isLoading && !error && data.events.rows.map((el, index) => (
                  matches ?
                    <Card {...el} key={index}/> :
                    <WideCard {...el} key={index}/> 
                ))}
              </div>
              {!isLoading && !error && data.events.pages > 0 && 
                <Pagination count={data.events.pages} size={matches ? 'small' : 'large'} onChange={handlePageChange}/>
              }
            </div>
        </div>
    </Layout>
  )
}

export default AllEvents;