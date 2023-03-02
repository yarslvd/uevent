import { Button } from '@mui/material';
import './WideCard.scss';

const WideCard = ({ image_url, title, location, time, date }) => {
    return(
        <div className="containerCards">
            <div className='image' style={{backgroundImage: `url(${image_url})`}}></div>
            <div className="info">
                <div className="left">
                    <h3>{title}</h3>
                    <div className='details'>
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
                        <Button variant="outlined">Більше</Button>
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
        </div>
    );
}

export default WideCard;