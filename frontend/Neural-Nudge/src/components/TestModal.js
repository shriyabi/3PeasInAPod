import React from 'react';
import Modal from 'react-modal';

const TextModal = ({ isOpen, onClose, content }) => {
  const modalStyle = {
    content: {
      backgroundColor: '#1a1a1a', // Dark peak background color
      color: '#ffffff', // White text color
      border: 'none',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '500px',
      margin: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Semi-transparent black overlay
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Text Modal"
      style={modalStyle}
      ariaHideApp={false}
    >
      <div className="modal-content">
        <p>{content}</p>
        <button 
          onClick={onClose} 
          className="close-button"
          style={{
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default TextModal;