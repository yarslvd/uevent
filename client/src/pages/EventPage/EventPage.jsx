import { useTranslation } from 'react-i18next';
import { Pagination, Button, useMediaQuery } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import EventInfo from '../../components/EventInfo/EventInfo';
import Comment from '../../components/Comment/Comment';
import Card from '../../components/Card/Card';
import { selectIsAuthMe } from '../../redux/slices/authSlice';
import { useGetEventInfoQuery } from '../../redux/api/fetchEventsApi';
import { useGetEventCommentsQuery } from '../../redux/api/fetchCommentsApi';
import { useGetTicketsQuery } from '../../redux/api/fetchTicketsApi';

import styles from './EventPage.module.scss';

const comments = [
  {fullname: 'Joe Goldberg', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  {fullname: 'Anton Chaika', comment: 'Hello bitcheas'},
  {fullname: 'Yaroslav Doroshenko', comment: 'ONE KISS IS ALL IT TAKES'},
  {fullname: 'Dima Berkut', comment: 'ONE KISS IS ALL IT TAKES'},
  {fullname: 'Jaja ye cocojamba', comment: 'ONE KISS IS ALL IT TAKES'},
];

const newEvents = [
  { title: 'Harry Styles', location: 'Палац студентів НТУ “ХПІ”', time: '16:00', date: '28 КВІ 2023', price: 400 ,image_url: 'https://media.architecturaldigest.com/photos/623e05e0b06d6c32457e4358/master/pass/FINAL%20%20PFHH-notextwlogo.jpg' },
  { title: 'The Weeknd', location: 'Палац студентів НТУ “ХПІ”', time: '18:00', date: '29 БЕР 2023', price: 400 ,image_url: 'https://www.livenationentertainment.com/wp-content/uploads/2022/03/TR_NationalAsset_TheWeeknd_SG_1200x628.jpg' },
  { title: 'Океан Ельзи. Світовий тур 2023', location: 'Стадіон Металіст', time: '18:00', date: '17 ЧЕР 2023', price: 550 ,image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
  { title: 'Океан Ельзи. Світовий тур 2023', location: 'Стадіон Металіст', time: '18:00', date: '17 ЧЕР 2023', price: 550 ,image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
];

const EventPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuthMe);
  const matches = useMediaQuery('(max-width:500px)');

  const { isLoading: isLoadingInfo, data: dataInfo, error: errorInfo } = useGetEventInfoQuery(id);
  const { isLoading: isLoadingComments, data: dataComments, error: errorComments } = useGetEventCommentsQuery(id);
  // const { isLoading: isLoadingTickets, data: dataTickets, error: errorTickets } = useGetTicketsQuery(id);
  console.log('comm', isLoadingInfo, id);

  return (
    <Layout>
      <div className={styles.header}>
        <div
          className={styles.image}
          style={{
            backgroundImage:
              `url(${!isLoadingInfo && !errorInfo && dataInfo.event?.poster})`,
          }}
        ></div>
        <div className={styles.info}>
          <EventInfo {...dataInfo?.event} isLoading={isLoadingInfo} error={errorInfo} />
        </div>
        <div className={styles.content}>
          <div className={styles.description}>
            <h2>Про подію</h2>
            <div className={styles.text}>
              {!isLoadingInfo && !errorInfo && dataInfo.event?.description}
            </div>
          </div>
          <div className={styles.embed}>
            <iframe
              title="spotify"
              src="https://open.spotify.com/embed/artist/5RqIkHQnXRZlm1ozfSS1IO?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>

            <iframe
              title='map'
              style={{ border: 0, borderRadius: '10px', marginTop: '6px' }}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}&q=${!isLoadingInfo && !errorInfo && dataInfo.event?.address}&language=${t('eventPage.lang')}`}
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={styles.comments}>
            <h2>Коментарі</h2>
            <div className={styles.wrapper}>
              {!isLoadingComments && !errorComments && dataComments?.event !== null ? <>
                {dataComments?.event.map((el, index) => (
                  <Comment {...el} key={index} />
                ))}
                <Pagination count={10} size={matches ? 'small' : 'large'} />
              </> :
                <span>Поки що немає коментарів</span>
              }
            </div>
            {
              isAuth &&
              <div className={styles.textarea}>
                <textarea name="comment" id="comment" rows="7" placeholder='Твій коментар...'></textarea>
                <Button variant='contained'>Опубліковати</Button>
              </div>
            }
          </div>
        </div>
      </div>
      <h2 className={styles.heading}>Афіші подій організатора</h2>
      <div className={styles.events}>
        {newEvents.map((el, index) => (
          <Card {...el} key={index}/>
        ))}
      </div>
      <a href="/new" className={styles.more_link}>Більше</a>
    </Layout>
  );
};

export default EventPage;