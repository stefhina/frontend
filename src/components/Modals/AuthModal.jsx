import Modal from './Modal';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import RequestPasswordResetForm from '../Forms/RequestPasswordResetForm';
import PasswordResetForm from '../Forms/PasswordResetForm';

const AuthModal = ({
  title,
  show,
  login,
  reset,
  newPassword,
  onHide,
  toggleToLogin,
  toggleToSignup,
  toggleToResetPassword,
}) => {
  return (
    <Modal
      title={newPassword ? modalTitles[3] : title}
      show={newPassword ? true : show}
      closable={newPassword && false}
      onHide={onHide}
    >
      {newPassword ? (
        <PasswordResetForm onToggle={toggleToLogin} />
      ) : login ? (
        <LoginForm
          onToggle={toggleToSignup}
          onToggleReset={toggleToResetPassword}
        />
      ) : reset ? (
        <RequestPasswordResetForm onToggle={toggleToLogin} />
      ) : (
        <SignupForm onToggle={toggleToLogin} />
      )}
    </Modal>
  );
};

const modalTitles = [
  'Login to your account',
  'Sign up to our platform',
  'Lost password',
  'Reset your password',
];

export default AuthModal;
export { modalTitles };
