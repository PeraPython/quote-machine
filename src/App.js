import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        quotes: []
      },
      currentQuote: "",
      currentAuthor: ""
    }
    this.handleNewQuotes = this.handleNewQuotes.bind(this);
  }

  handleNewQuotes() {
    const length = this.state.data.quotes.length;
    const random = Math.floor(Math.random()*length);
    this.setState({
      currentQuote: this.state.data.quotes[random].quote,
      currentAuthor: this.state.data.quotes[random].author
    })
  }

  componentDidMount(){
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data =>{ 
              this.setState({ data });
              const length = this.state.data.quotes.length;
              const random = Math.floor(Math.random()*length);
              this.setState({
                currentQuote: this.state.data.quotes[random].quote,
                currentAuthor: this.state.data.quotes[random].author
              })
            });
      
  }
  render() {
    const { currentQuote, currentAuthor } = this.state;
    const link = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="' + encodeURIComponent( currentQuote + '" ' + currentAuthor);
    return (
      <div id="quote-box">
        <div id="text"><i className="fa fa-quote-left"> </i> {currentQuote}</div>
        <div id="author">-{currentAuthor}</div>
        <button id="new-quote" onClick={this.handleNewQuotes}>New quote</button>
        <a href={link} id="tweet-quote"><i className="fa fa-twitter"></i></a>
      </div>
    );
  }
}

export default App;
