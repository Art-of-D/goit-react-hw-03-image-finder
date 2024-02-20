import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import style from './App.module.css';
import { Component } from 'react';
import { getImagesByTag } from '../service/pixabay/getImages';
import { ColorRing } from 'react-loader-spinner';

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
    const { searchWord, loading } = this.state;
    if (prevState.searchWord !== searchWord && prevState.imageList.length > 0) {
      this.clearState();
    }
    if (loading) {
      this.startSearch();
      setTimeout(() => {
        this.scrollToEnd();
      }, 300);
    }
  }

  clearState = () => {
    this.setState(() => ({
      imageList: [],
      total: 0,
      page: 1,
      loading: false,
    }));
  };

  startSearch = async () => {
    const { page, per_page, searchWord } = this.state;
    try {
      const result = await getImagesByTag(searchWord, page, per_page);
      const list = result.hits;
      const total = result.total;
      this.setState(prevState => ({
        imageList: [...prevState.imageList, ...list],
        total: total,
        loading: false,
      }));
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false,
      });
    }
  };

  addPage = async () => {
    await this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  addSearchWord = searchWord => {
    this.setState(() => ({
      searchWord: searchWord,
      loading: true,
    }));
  };

  openImage = ({ tags, largeImageURL }) => {
    this.setState(() => ({
      zoomImage: true,
      tags: tags,
      largeImageURL: largeImageURL,
    }));
  };

  closeImage = () => {
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
        {imageList.length > 0 && !loading && (
          <ImageGallery imageList={imageList} openImage={this.openImage} />
        )}
        {loading && (
          <ColorRing
            visible={true}
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            wrapperClass={style.ColorRing}
          />
        )}
        {total / per_page >= page && !loading && (
          <Button addPage={this.addPage} />
        )}
        {zoomImage && (
          <Modal
            tags={tags}
            largeImageURL={largeImageURL}
            onClose={this.closeImage}
          />
        )}
      </div>
    );
  }
}

export default App;
