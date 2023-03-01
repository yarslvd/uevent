import { Container } from '@mui/material';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';

const Layout = ({ children }) => {
    return(
        <div className='containerMain'>
            <header>
                <Header />
            </header>
            <Container maxWidth='xl'>
                <main>{children}</main>
            </Container>
            <footer style={{ backgroundColor: '#1F1F1F' }}>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;