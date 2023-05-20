import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MemeGenerator extends LitElement {
  static get properties() {
    return {
      memes: { type: Array },
      topText: { type: String },
      bottomText: { type: String },
    };
  }
  
  static style = css`
    :host{
      display:block;
      width: 250px;
      height: 250px;
      align self: center;



    }
    `

  constructor() {
    super();
    this.memes = [];
    this.topText = '';
    this.bottomText = '';
  }

  async firstLoad() {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const memes = await response.json();
  alert(memes) 

    this.memes = memes.data.memes;
  }

  
  render() {
    return html`
      <h1>Meme Generator</h1>
      <select 
        id="meme-select"
        onchange="this.onMemeSelect()">
        ${this.memes.map((meme) => html`
          <option value="${meme.id}">${meme.name}</option>
        `)}
      </select>
      <input 
        id="top-text"
        type="text"
        value="${this.topText}"
      />
      <input 
        id="bottom-text"
        type="text"
        value="${this.bottomText}"
      />
      <button 
        onclick="this.onGenerateMeme()">Generate Meme</button>
      <img 
        id="meme-image"
        src=""
      />
    `;
  }

  onMemeSelect() {
    const memeId = document.getElementById('meme-select').value;
    this.topText = '';
    this.bottomText = '';
    document.getElementById('meme-image').src = '';

    fetch(`https://api.imgflip.com/get_meme/${memeId}`)
      .then((response) => response.json())
      .then((meme) => {
        this.topText = meme.data.top_text;
        this.bottomText = meme.data.bottom_text;
        document.getElementById('meme-image').src = meme.data.url;
      });
  }

  onGenerateMeme() {
    const memeId = document.getElementById('meme-select').value;
    const topText = document.getElementById('top-text').value;
    const bottomText = document.getElementById('bottom-text').value;

    fetch(`https://api.imgflip.com/generate_meme/${memeId}?text1=${topText}&text2=${bottomText}`)
      .then((response) => response.json())
      .then((meme) => {
        document.getElementById('meme-image').src = meme.data.url;
      });
  }
}

customElements.define('meme-generator', MemeGenerator);
