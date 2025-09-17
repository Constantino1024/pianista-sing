import PropTypes from 'prop-types';
import Toast from './Toast';

export default function ToastContainer({ toasts, onClose, position = 'top-right' }) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed z-50 ${getPositionClasses()}`}
      style={{ maxWidth: '400px' }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
      title: PropTypes.string,
      message: PropTypes.string.isRequired,
      duration: PropTypes.number,
      showProgress: PropTypes.bool
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf([
    'top-left',
    'top-center', 
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ])
};