import Footer from './Footer';
import Header from './Header';

const WebPageOutlet = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default WebPageOutlet;
