import { useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import { Theme } from '../../contexts/Theme';
import lazyLoad from '../../utils/lazy-load-image';
import AuthModal, { modalTitles } from '../Modals/AuthModal';
import NavBar from '../Nav/NavBar';
import HeroMain from '../Hero/HeroMain';
import HeroDesign from '../Hero/HeroDesign';
import Features from '../Features/Features';
import HeroSimple from '../Hero/HeroSimple';
import Workflows from '../Workflows/Workflows';
import HeroEnd from '../Hero/HeroEnd';
import Footer from '../Footer/Footer';

import 'aos/dist/aos.css';

const Home = () => {
  const [theme, setTheme] = useContext(Theme);
  const [modalTitle, setModalTitle] = useState(modalTitles[0]);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    AOS.init({ mirror: true, once: true });
    lazyLoad(AOS.refresh);
  }, []);

  const toggleTheme = (e) => setTheme(!theme);

  const toggleModal = (e) => {
    if (!showModal) {
      toggleToLogin(e);
    }
    setShowModal(!showModal);
  };

  const toggleToLogin = (e) => {
    setModalTitle(modalTitles[0]);
    setShowLogin(true);
  };

  const toggleToSignup = (e) => {
    setModalTitle(modalTitles[1]);
    setShowLogin(false);
  };

  return (
    <div className="mx-auto md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-14 overflow-clip">
      <NavBar toggleTheme={toggleTheme} showLogin={toggleModal} />
      <HeroMain />
      <HeroDesign />
      <Features />
      <HeroSimple
        title="Workflow that is super easy"
        description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum semper quis lectus nulla
          at volutpat diam ut venenatis."
      />
      <Workflows />
      <HeroEnd title="Don't think, just start!" />
      <Footer />
      <AuthModal
        title={modalTitle}
        show={showModal}
        login={showLogin}
        toggleToLogin={toggleToLogin}
        toggleToSignup={toggleToSignup}
        onHide={toggleModal}
      />
    </div>
  );
};

export default Home;
