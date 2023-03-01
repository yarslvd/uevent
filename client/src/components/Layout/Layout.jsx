import { Container } from '@mui/material';

import Header from '../Header/Header';

const Layout = ({ children }) => {
    return(
        <Container maxWidth='xl'>
            <Header />
            <main>{children}</main>
            
        </Container>
    );
};

export default Layout;