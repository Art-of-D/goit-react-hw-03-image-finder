import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import style from './App.module.css';
import { Component } from 'react';
import { getImagesByTag } from '../service/pixabay/getImages';
import { Loader } from './Loader/Loader';

class App extends Component {
  state = {
    imageList: [],
    searchWord: '',
    total: 0,
    per_page: 10,
    page: 1,
    zoomImage: false,
    tags: '',
    largeImageURL: '',
    loading: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { loading, imageList } = this.state;
    if (loading) {
      this.startSearch();
    }
    if (!loading && imageList.length > prevState.imageList.length) {
      this.scrollToEnd();
    }
  }

  startSearch = async () => {
    const { page, per_page, searchWord } = this.state;
    try {
      const { hits, total } = await getImagesByTag(searchWord, page, per_page);
      this.setState(prevState => ({
        imageList: [...prevState.imageList, ...hits],
        total: total,
      }));
    } catch (e) {
      this.setState({
        error: e.message,
      });
    } finally {
      this.setState(() => ({
        loading: false,
      }));
    }
  };

  addPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  addSearchWord = searchWord => {
    this.setState(() => ({
      searchWord: searchWord,
      imageList: [],
      total: 0,
      per_page: 10,
      page: 1,
      zoomImage: false,
      tags: '',
      largeImageURL: '',
      loading: true,
      error: '',
    }));
  };

  openImage = ({ tags, largeImageURL }) => {
    this.setState(() => ({
      zoomImage: true,
      tags: tags,
      largeImageURL: largeImageURL,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      zoomImage: false,
      tags: '',
      largeImageURL: '',
    }));
  };

  scrollToEnd = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const {
      imageList,
      total,
      per_page,
      page,
      zoomImage,
      tags,
      largeImageURL,
      loading,
      error,
    } = this.state;
    return (
      <div className={style.AppBody}>
        <Searchbar addSearchWord={this.addSearchWord} />
        {error && <div>Error: {error}</div>}
        {imageList.length > 0 && (
          <ImageGallery imageList={imageList} openImage={this.openImage} />
        )}
        {loading && <Loader />}
        {total / per_page >= page && !loading && (
          <Button addPage={this.addPage} />
        )}
        {zoomImage && (
          <Modal
            zoomImage={zoomImage}
            tags={tags}
            largeImageURL={largeImageURL}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
