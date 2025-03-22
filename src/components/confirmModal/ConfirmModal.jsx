import React from 'react';
import '@/styles/components/confirmModal.scss';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Вы уверены, что хотите удалить этот список задач?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">
            Удалить
          </button>
          <button onClick={onClose} className="cancel-button">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
