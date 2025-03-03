import React from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";

// Ensure you set the app element once (ideally in your index.js)
Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  // Optionally, if there is no image, you might still want to render Modal to avoid re-registering.
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      {image ? (
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
      ) : null}
    </Modal>
  );
};

export default ImageModal;
