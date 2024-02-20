import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  image: { id, webformatURL, tags, largeImageURL },
  openImage,
}) => {
  const handleClick = () => {
    openImage({ tags, largeImageURL });
  };

  return (
    <li id={id} className={style.ImageGalleryItemImage} onClick={handleClick}>
      <img
        className={style.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        link={largeImageURL}
      />
    </li>
  );
};
