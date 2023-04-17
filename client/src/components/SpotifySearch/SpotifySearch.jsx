import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SpotifySearch.module.scss';

const SpotifySearch = ({ register, setValue, id, editRadio }) => {
    const [query, setQuery] = useState('');
    const [artist, setArtist] = useState([]);
    const [token, setToken] = useState(null);
    const [radio, setRadio] = useState('');
    const {t} = useTranslation();
    
    useEffect(() => {
        setValue('spotify_id', radio);
    },[radio, setValue]);
    
    useEffect(() => {
        if(editRadio) {
            setRadio(editRadio);
            setValue('spotify_id', editRadio);
        }
    }, [editRadio])

    useEffect(() => {
        (async () => {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET)
            },
            body: 'grant_type=client_credentials'
          });

          const data = await response.json();
          setToken(data.access_token);
        })();
    }, []);

    useEffect(() => {
        if(id && token !== null) {
            console.log(token);
            (async () => {
                fetch(`https://api.spotify.com/v1/artists/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => response.json())
                .then(data => console.log("spotify",data));
            })();
        }
    }, [id, token])

    const fetchDefault = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists?ids=1Xyo4u8uXC1ZmMpatF05PJ,5SFA8vO07EK8SGJVdr9mX6,6KImCVD70vtIoJWnq6nGn3,5RqIkHQnXRZlm1ozfSS1IO,5cj0lLjcoR7YOSnhnX0Po5`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            const data = await response.json();
            const artistData = data.artists;

            return artistData;
        }
        catch(err) {
            return err;
        }
    };

    const fetchSearch = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            const data = await response.json();
            const artistData = data.artists.items;

            return artistData;
        }
        catch(err) {
            return err;
        }
    }

    useEffect(() => {
        (async () => {
            let artistData;
            if(query === '') {
                artistData = await fetchDefault();
            }
            else {
                artistData = await fetchSearch();
            }

            setArtist(artistData.map(el => {
                return {
                    name: el.name,
                    image: el.images[0]?.url,
                    url: el.external_urls.spotify,
                    id: el.id
                }
            }));
        })();
    }, [token, query]);

    const handleRadio = (e) => {
        if(e.target.value === radio) {
            setRadio('');
        }
        else {
            setRadio(e.target.value);
        }
    }

    return (
        <div>
            <h3 className={styles.heading}>{t('createEvent.previewArtist.heading')}</h3>
            <div className={styles.container}>
                <input type="text" onChange={(e) => setQuery(e.target.value)} className={styles.search} placeholder='Search for artist...'/>
                <div className={styles.artistContainer}>
                    {artist && artist.map((el, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name='artist'
                                id={el.id}
                                value={el.id}
                                checked={radio === el.id}
                                onClick={handleRadio}
                                onChange={handleRadio}
                                {...register('spotify_id')}
                            />
                            <label htmlFor={el.id} className={styles.artistCard}>
                                <div className={styles.container}>
                                    <div className={styles.left}>
                                        {el.image ? <img src={el.image} alt={el.name} /> : <img src='/assets/user_black_icon.png' alt={el.name} />}
                                        <span>{el.name}</span>
                                    </div>

                                    <a href={el.url} target='_blank' rel="noreferrer">
                                        <svg aria-hidden="true" viewBox="0 0 24 24" data-testid="LaunchIcon">
                                            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
                {radio ? 
                    <iframe
                        title='spotify-preview'
                        src={`https://open.spotify.com/embed/artist/${radio}`}
                        width="100%"
                        height="380"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe> :
                    <div className={styles.iframe}>
                        <span>{t('createEvent.previewArtist.choosePerformer')}</span>
                    </div>
                }
            </div>
        </div>
    )
};

export default SpotifySearch;