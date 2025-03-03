import React from "react";

const ImageCard = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };
  return (
    <div onClick={handleClick}>
      <img src={image.urls.small} alt={image.alt_description || "image"} />
    </div>
  );
};

export default ImageCard;
