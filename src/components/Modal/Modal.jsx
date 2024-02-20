import style from './Modal.module.css';

export const Modal = ({ tags, largeImageURL, onClose }) => {
  return (
    <div className={style.Overlay} onClick={onClose}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
