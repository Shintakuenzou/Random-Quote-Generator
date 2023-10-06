import { useEffect, useState } from "react";

import { Quotes, TwitterLogo } from "@phosphor-icons/react";

import { generateRandomBackgroundColor } from "./utils/generateRandomBackgroundColor";
import "./styles/app.css";
import { api } from "./utils/axios";

export function App() {
  const [quoteData, setQuoteData] = useState(null);
  // console.log(quoteData);

  const randomColor = generateRandomBackgroundColor();
  function applyRandomBackgroundColor() {
    document.body.style.backgroundColor = randomColor;
    document.body.style.transition = "0.5s";
    document.getElementById("text").style.color = randomColor;
    document.getElementById("author").style.color = randomColor;
    document.getElementById("new-quote").style.backgroundColor = randomColor;
    document.getElementById("tweet-quote").style.backgroundColor = randomColor;
  }
  async function connectAPI() {
    applyRandomBackgroundColor();

    try {
      const response = await api.get("https://api.quotable.io/quotes/random");
      setQuoteData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    applyRandomBackgroundColor();
    connectAPI();
  }, []);

  return (
    <section>
      <div id="quote-box">
        <Quotes size={36} color="#00000" weight="duotone" />

        <div className="quote-content">
          <h2 id="text">{quoteData && quoteData[0].content}</h2>
          <span id="author">- {quoteData && quoteData[0].author}</span>
        </div>

        <div id="linkAndButtonSection">
          <a
            href="https://twitter.com/i/flow/login?redirect_after_login=%2Fintent%2Ftweet"
            target="_blank"
            id="tweet-quote"
            rel="noreferrer"
          >
            <TwitterLogo size={20} />
          </a>
          <button id="new-quote" onClick={connectAPI}>
            New quote
          </button>
        </div>
      </div>
    </section>
  );
}
