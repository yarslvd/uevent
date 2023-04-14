import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination, Button, useMediaQuery } from '@mui/material';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import parse from 'html-react-parser';

import Layout from '../../components/Layout/Layout';
import EventInfo from '../../components/EventInfo/EventInfo';
import Comment from '../../components/Comment/Comment';
import Card from '../../components/Card/Card';
import { selectIsAuthMe } from '../../redux/slices/authSlice';
import { useGetEventInfoQuery } from '../../redux/api/fetchEventsApi';
import {
  useGetEventCommentsQuery,
  useAddEventCommentMutation,
  useUpdateEventCommentMutation, useDeleteEventCommentMutation
} from '../../redux/api/fetchCommentsApi';
import { useGetTicketsQuery } from '../../redux/api/fetchTicketsApi';
import { useGetEventsQuery } from '../../redux/api/fetchEventsApi';

import styles from './EventPage.module.scss';
import { useLazyCheckPaymentQuery, useCheckPaymentUnauthMutation } from '../../redux/api/fetchPaymentApi';
import { useEffect } from 'react';
import {useUpdateUserMutation} from "../../redux/api/fetchAuthApi";

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
  const [searchParams] = useSearchParams();
  const [checkPayment] = useLazyCheckPaymentQuery();
  const [checkPaymentUnauth] = useCheckPaymentUnauthMutation();
  
  const [addEventComment] = useAddEventCommentMutation();

  const [page, setPage] = useState(0);
  const [commentInput, setCommentInput] = useState('');

  const [editing, setEditing] = useState(null)
  const [updateComment] = useUpdateEventCommentMutation();
  const [deleteComment] = useDeleteEventCommentMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      content: ''
    },
    mode: 'onChange'
  });

  const { isLoading: isLoadingInfo, data: dataInfo, error: errorInfo } = useGetEventInfoQuery(id);
  const { isLoading: isLoadingComments, data: dataComments, error: errorComments, refetch } = useGetEventCommentsQuery({id, page});
  const { isLoading: isLoadingEvents, data: dataEvents, error: errorEvents } = useGetEventsQuery({ limit: 4, page: 0, organizers: dataInfo?.event.organizer_id });

  const deleteCommentFunction = async (commentId) => {
    await deleteComment({id: commentId});
    refetch();

  }

  const onSubmit = async (values) => {
    if (editing) {
      console.log(editing)
      await updateComment({id: editing.id, comment: editing.content});
      setCommentInput('');
      setEditing(null);
      refetch();
      return
    }

    setCommentInput('');
    setPage(dataComments?.comments.pages - 1);
    addEventComment({ comment: values.content, event_id: +id })
    .unwrap()
    .then(() => {
      refetch();
    })
    .catch(err => {
      console.log(err);
    });
  }

  const handlePaginationChange = (e, p) => {
    setPage(p - 1);
  }

  const checkEventPayment = async (orderId) => {
    let data;
    
    if (!orderId){
      data = await checkPayment(id).unwrap()
    }
    else {
      console.log(orderId);
      data = await checkPaymentUnauth({id, orderId}).unwrap();
    }
    console.log(data);
  }

  const setEditingText = (text) => {
    setEditing({
      id:editing.id,
      content:text
    })
  }

  useEffect(() => {
    if (!!searchParams.get('check-payment')) {
      let orderId = searchParams.get('orderId');
      window.history.replaceState({}, 'uevent', window.location.href.split("?")[0]);

      checkEventPayment(orderId);
    }
  }, [])

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
          <EventInfo {...dataInfo?.event} event_id={dataInfo?.id} isLoading={isLoadingInfo} error={errorInfo} />
        </div>
        <div className={styles.content}>
          <div className={styles.description}>
            <h2>Про подію</h2>
            <div className={styles.text}>
              {!isLoadingInfo && !errorInfo && parse(dataInfo.event?.description)}
            </div>
          </div>
          <div className={styles.embed}>
            { !isLoadingInfo && !errorInfo && dataInfo.event.spotify_id &&
              <iframe
              title="spotify"
              src={`https://open.spotify.com/embed/artist/${dataInfo.event.spotify_id}?utm_source=generator`}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              ></iframe>
            }

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
              {!isLoadingComments && !errorComments && dataComments?.comments.rows !== 0 ? <>
                {dataComments?.comments.rows.map((el, index) => (
                  <Comment {...el} setEditing={setEditing} deleteComment={deleteCommentFunction} key={index} />
                ))}
                {dataComments?.comments.pages > 1 && <Pagination count={dataComments?.comments.pages} size={matches ? 'small' : 'large'} onChange={handlePaginationChange}/>}
              </> :
                <span>Поки що немає коментарів</span>
              }
            </div>
            {
              isAuth &&
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.textarea}>
                  <textarea
                    name="comment"
                    id="comment"
                    rows="7"
                    placeholder='Твій коментар...'
                    {...register('content', {
                      required: true,
                      minLength: 5
                    })}
                    onChange={(e) => editing ? setEditingText(e.target.value): setCommentInput(e.target.value)}
                    value={editing ? editing.content : commentInput}
                  ></textarea>
                  <Button variant='contained' type='submit'>Опубліковати</Button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
      {!isLoadingEvents && !errorEvents && dataEvents?.events.rows &&
        <>
          <h2 className={styles.heading}>Афіші подій організатора</h2>
          <div className={styles.events}>
            {dataEvents.events.rows.map((el, index) => (
              <Card {...el} key={index}/>
            ))}
          </div>
          <Link to={`/organizer`} className={styles.more_link}>Більше</Link>
        </>
      }
    </Layout>
  );
};

export default EventPage;