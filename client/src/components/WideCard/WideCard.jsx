import { Link } from 'react-router-dom';
import './WideCard.scss';

const WideCard = ({ image_url, title, location, time, date, price }) => {
    return(
        <div className="containerWideCard">
            <div className='image' style={{backgroundImage: `url(${image_url})`}}></div>
            <div className="info">
                <div className="left">
                    <div className='details'>
                        <h3>{title}</h3>
                        <div className='location'>
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocationOnIcon">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                            </svg>
                            <span>{location}</span>
                        </div>
                        <div className='time'>
                            <img src="/assets/clock_icon.png" alt="Time" />
                            <span>{time}</span>
                        </div>
                    </div>
                    <Link to={'/event'}>Більше</Link>
                </div>
                <div className="right">
                    <div className="date">
                        {date}&nbsp;
                    </div>
                    <div className="price">
                        <b>Від {price} грн.</b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WideCard;