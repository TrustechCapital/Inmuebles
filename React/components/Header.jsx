import Head from 'next/head';
import Navbar from './Navbar';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
  <Head>
      <title>FiduciaWEB</title>
    </Head>
  
    <Navbar/>
  </div>
);

export default Header;