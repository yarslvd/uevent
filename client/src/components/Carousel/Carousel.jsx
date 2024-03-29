import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import './Carousel.scss';

const variants = {
    initial: (direction) => {
        return {
            x: direction > 0 ? 50 : -50,
        }
    },
    animate: {
        x: 0,
    },
    exit: (direction) => {
        return {
            x: direction > 0 ? -50 : 50,
        }
    }
}

const Carousel = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    const nextImg = () => {
        setDirection(1);
        slides[currentIndex + 1] ? setCurrentIndex(currentIndex + 1): setCurrentIndex(0);
    };

    const prevImg = () => {
        setDirection(-1);
        slides[currentIndex - 1] ? setCurrentIndex(currentIndex - 1): setCurrentIndex(slides.length - 1);
    };

    const resetTimeout = () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prevState) => slides[prevState + 1] ? prevState + 1 : 0);
        }, 10000)

        return () => resetTimeout();
    }, [currentIndex]);

    return(
        <>
            <div className="carousel">
                <div className='leftArrow' onClick={prevImg}>
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIosNewIcon" fill="#fff">
                        <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
                    </svg>
                </div>
                <div className='rightArrow' onClick={nextImg}>
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon" fill="#fff">
                        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                    </svg>
                </div>
                <motion.div
                    key={currentIndex}
                    className='slide'
                    variants={variants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    style={{backgroundImage: `url(${slides[currentIndex].url})`}}
                    custom={direction}
                    onClick={() => navigate(slides[currentIndex].link)}
                >
                </motion.div>
            </div>
            <div className='dots-container'>
                {slides.map((el, index) => (
                    <div
                        key={index}
                        className='dot'
                        style={index === currentIndex ? { height: '15px', width: '15px', backgroundColor: '#fff' }: {}}
                        onClick={() => setCurrentIndex(index)}
                    >
                    </div>
                ))}
            </div>
        </>
    );
}

export default Carousel;