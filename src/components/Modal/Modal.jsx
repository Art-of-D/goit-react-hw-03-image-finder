import { Component } from 'react';
import style from './Modal.module.css';
class Modal extends Component {
  handleCloseModal = e => {
    const { closeModal } = this.props;
    if (e.key === 'Escape' || e.target.className === style.Overlay) {
      closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCloseModal);
  }

  render() {
    const { tags, largeImageURL } = this.props;
    return (
      <div className={style.Overlay} onClick={this.handleCloseModal}>
        <div className={style.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
export default Modal;
