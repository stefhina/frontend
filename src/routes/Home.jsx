import { useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import { Theme } from '../contexts/Theme';
import lazyLoad from '../utils/lazy-load-image';
import AuthModal, { modalTitles } from '../components/Modals/AuthModal';
import NavBar from '../components/Nav/NavBar';
import HeroMain from '../components/Hero/HeroMain';
import HeroDesign from '../components/Hero/HeroDesign';
import Features from '../components/Features/Features';
import HeroSimple from '../components/Hero/HeroSimple';
import Workflows from '../components/Workflows/Workflows';
import HeroEnd from '../components/Hero/HeroEnd';
import FooterAnimated from '../components/Footer/FooterAnimated';

import 'aos/dist/aos.css';

const Home = ({ newPassword }) => {
  const [theme, setTheme] = useContext(Theme);
  const [modalTitle, setModalTitle] = useState(modalTitles[0]);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

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
    setShowResetPassword(false);
  };

  const toggleToSignup = (e) => {
    setModalTitle(modalTitles[1]);
    setShowLogin(false);
    setShowResetPassword(false);
  };

  const toggleToResetPassword = (e) => {
    setModalTitle(modalTitles[2]);
    setShowLogin(false);
    setShowResetPassword(true);
  };

  return (
    <div className="mx-auto md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-14 overflow-clip">
      <NavBar toggleTheme={toggleTheme} showLogin={toggleModal} />
      <HeroMain showExtras />
      <HeroDesign />
      <Features />
      <HeroSimple
        title="Visual approach to software development"
        description="Visual development environment that allows  users to create apps through methods such as drag-and-drop."
      />
      <Workflows />
      <HeroEnd title="Don't think, just start!" />
      <FooterAnimated />
      <AuthModal
        title={modalTitle}
        show={showModal}
        login={showLogin}
        reset={showResetPassword}
        newPassword={newPassword}
        toggleToLogin={toggleToLogin}
        toggleToSignup={toggleToSignup}
        toggleToResetPassword={toggleToResetPassword}
        onHide={toggleModal}
      />
    </div>
  );
};

export default Home;
