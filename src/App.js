import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faQuoteRight,
  faPerson,
  faCloudMoon,
  faCopy,
  faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  //To store Fetch randomQuotes JSON data
  const url = 'https://type.fit/api/quotes';
  const [quotesData, setQuotesData] = useState({});
  const [clipBoardIcon, setClipBoardIcon] = useState(faCopy);
  let randomNumber;

  const quotesTextColors = ['#ffc107', '#0d6efd', 'MediumSpringGreen', 'Crimson', 'Orange', 'purple'];
  const quotesAuthorColors = ['MediumSpringGreen', 'Orange', 'Crimson', 'purple', '#0d6efd', '#ffc107'];
  const txtQuotesText = useRef(null);
  const txtQuotesAuthor = useRef(null);
  let randomQuotesTextColor;
  let randomQuotesAuthorColor;

  //To Implement darkmode functionality
  const [modeText, setModeText] = useState('Default Mode');
  const [bodyMode, setBodyMode] = useState('body-default-mode');
  const [mainContainerMode, setMainContainerMode] = useState('main-container-default-mode');
  const [dataTextModeColor, setDataTextModeColor] = useState('data-text-default-mode');
  const [dataAuthorModeColor, setDataAuthorModeColor] = useState('data-author-default-mode');
  const [isToggle, setIsToggle] = useState(true);

  const getQuotes = async () => {
    await axios.get(url).then((response) => {
      randomNumber = Math.floor(Math.random() * response.data.length);
      setQuotesData(response.data[randomNumber]);
      console.log(response.data[randomNumber]);

      //Get random colors for quotes text
      randomQuotesTextColor = quotesTextColors[Math.floor(Math.random() * quotesTextColors.length)];
      randomQuotesAuthorColor = quotesAuthorColors[Math.floor(Math.random() * quotesAuthorColors.length)];
      txtQuotesText.current.style.color = randomQuotesTextColor;
      txtQuotesAuthor.current.style.color = randomQuotesAuthorColor;
    })
  };

  useEffect(() => {
    // let count = 0;
    const timer = setInterval(() => {
      getQuotes();
      setClipBoardIcon(faCopy);
      // count++
      // console.log(count);
    }, 3000)
    return () => clearInterval(timer)
  })

  const btnToggle = () => {
    if (isToggle === true) {
      setBodyMode('body-dark-mode');
      setMainContainerMode('main-container-dark-mode');
      setDataTextModeColor('data-text-dark-mode');
      setDataAuthorModeColor('data-author-dark-mode');
      setModeText('Dark Mode');
      setIsToggle(false);
    }
    else {
      setBodyMode('body-default-mode');
      setMainContainerMode('main-container-default-mode');
      setDataTextModeColor('data-text-default-mode');
      setDataAuthorModeColor('data-author-default-mode');
      setModeText('Default Mode');
      setIsToggle(true);
    }
  }

  const btnCopy = () => {
    setClipBoardIcon(faCheckDouble);
    navigator.clipboard.writeText(quotesData.text);
  }

  return (
    <div className={bodyMode}>

      <Header />

      <div className="container text-end">
        <span className="txt-dark-mode-default text-white">{modeText}</span>&nbsp;
        <FontAwesomeIcon icon={faCloudMoon} className='text-warning' />
        <div
          className="position-relative form-check form-switch"
        >
          <input
            type="checkbox"
            className="form-check-input position-absolute top-0 end-0"
            onClick={btnToggle}
          />
        </div>
      </div>

      <div className={`container-fluid ${mainContainerMode}`}>
        <div className="container" style={{ paddingTop: '25px' }}>
          <div className="container">
            <p className={dataTextModeColor} ref={txtQuotesText}>{quotesData.text}</p>
          </div>
          <div className="container text-end">
            <p className={dataAuthorModeColor} ref={txtQuotesAuthor}><b>Author:</b>
              {
                //Validate quotes.author if null or not
                quotesData.author === null ?
                  quotesData.author = 'No author specified'
                  :
                  quotesData.author
                // (<FontAwesomeIcon icon={faPerson} />)
              }<FontAwesomeIcon icon={faPerson} /></p>
          </div>
        </div>
        <div className="container">
          <button className="btn btn-warning" style={{ color: 'white' }} onClick={getQuotes}>Get Quote <FontAwesomeIcon icon={faQuoteRight} /></button>
          <a
            href={`https://twitter.com/intent/tweet?text=${quotesData.text}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-primary" style={{ marginLeft: '5px' }}>Tweet <FontAwesomeIcon icon={faTwitter} /></button>
          </a>
          <button className="btn btn-outline-info" style={{ marginLeft: '5px' }} onClick={btnCopy}><FontAwesomeIcon icon={clipBoardIcon} /></button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
