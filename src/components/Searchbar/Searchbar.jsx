import { Component } from 'react';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    input: '',
  };

  submitInput = e => {
    const { input } = this.state;
    e.preventDefault();
    this.props.addSearchWord(input);
    this.setState(() => ({
      input: '',
    }));
  };

  handleInput = e => {
    this.setState(() => ({
      input: e.target.value,
    }));
  };

  render() {
    const { input } = this.state;
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.submitInput}>
          <button type="submit" className={style.SearchFormButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11 20C13.3869 20 15.6761 19.0518 17.364 17.364C19.0518 15.6761 20 13.3869 20 11C20 8.61305 19.0518 6.32387 17.364 4.63604C15.6761 2.94821 13.3869 2 11 2C8.61305 2 6.32387 2.94821 4.63604 4.63604C2.94821 6.32387 2 8.61305 2 11C2 13.3869 2.94821 15.6761 4.63604 17.364C6.32387 19.0518 8.61305 20 11 20ZM18.93 20.69C19.46 22.29 20.67 22.45 21.6 21.05C22.45 19.77 21.89 18.72 20.35 18.72C19.21 18.71 18.57 19.6 18.93 20.69Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={style.SearchFormButtonLabel}></span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            value={input}
            onChange={this.handleInput}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
