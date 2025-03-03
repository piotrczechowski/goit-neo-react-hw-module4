import React from "react";
import Modal from "react-modal";

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0",
          background: "#000",
          border: "none",
          overflow: "hidden",
          borderRadius: "4px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || "enlarged"}
          style={{ width: "100%", display: "block" }}
        />
        {/* Optional details */}
        <div style={{ color: "#fff", padding: "1em" }}>
          <p>Author: {image.user?.name}</p>
          <p>Likes: {image.likes}</p>
          {image.description && <p>Description: {image.description}</p>}
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            color: "#fff",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
