import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ImageModal from "./components/ImageModal";

const ACCESS_KEY = "XsiQzLl6GWOgwNRfPbDuVCvaj8BSkGugL0V8f2y3ITU";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (searchQuery) => {
    try {
      setIsLoading(true);
      setError(null);
      setQuery(searchQuery);
      setPage(1);

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&page=1&client_id=${ACCESS_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setImages(data.results);
      toast.success(`Found ${data.total} images for "${searchQuery}"`);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more
  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=${nextPage}&client_id=${ACCESS_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage(nextPage);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Open modal to show the selected image.
  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  // Close the modal.
  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div>
      {/* React Hot Toast Listener */}
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {isLoading && <Loader />}

      {images.length > 0 && !error && <LoadMoreBtn onClick={handleLoadMore} />}

      {selectedImage && (
        <ImageModal
          isOpen={showModal}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
