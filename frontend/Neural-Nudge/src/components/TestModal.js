import React from 'react';
import Modal from 'react-modal';

const TextModal = ({ isOpen, onClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Text Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </Modal>
  );
};

export default TextModal;