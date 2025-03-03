import React from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContainer}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || "enlarged"}
          className={styles.modalImage}
        />

        <div className={styles.modalDetails}>
          <p>Author: {image.user?.name}</p>
          <p>Likes: {image.likes}</p>
          {image.description && <p>Description: {image.description}</p>}
        </div>

        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
