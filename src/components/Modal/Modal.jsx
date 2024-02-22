import style from './Modal.module.css';

export const Modal = ({ tags, largeImageURL, onClose }) => {
  const closeModal = e => {
    console.log(e.target.className);
    if (e.target.className === style.Overlay) {
      onClose();
    }
  };
  return (
    <div className={style.Overlay} onClick={closeModal}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
