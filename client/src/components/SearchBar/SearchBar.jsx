import { useState } from 'react';
import { motion } from 'framer-motion';

import './SearchBar.scss';

const variants = {
    open: { width: '300px', opacity: 1, transition: { duration: 0.5 }},
    close: { width: '0px', opacity: 0.1, transition: { duration: 0.5}}
};

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenSearch = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    return(
        <motion.div className='container' onClick={handleOpenSearch}>
            <div className="bg" >
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SearchIcon">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
            </div>
            <motion.input 
                className='bar'
                style={isOpen ? { display: 'block' } : { display: 'none' }}
                placeholder={'Search...'}
                variants={variants}
                animate={isOpen ? 'open' : 'close'}
            />
        </motion.div>
    );
};

export default SearchBar;