/**
 * A Blog widget that displays blog posts pulled from 
 * an API
 * 
 * <blog-block></blog-block>
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class BlockBlock extends LitElement {
  static properties = {
    _posts: { state: true, attribute: false}

  }
  

  static styles = css`
  :host {
    margin: 1em;
  }
  .blogpost {
    text-align: center;
    font-style: italic;
    background-color: #c3c3c3;
    border: 3px outset #e0e0e0;
    margin-bottom: 5px;
    
  }
  .blogpost h2 {
    background-color: #010081;
    text-transform: capitalize;
    text-align: center;
    //border-radius: 40px;
    color: white;
    margin-top: 0px;
    margin-bottom:5px;
    
    
  }

  .blogpost h3 {
    text-align: center;
    border-radius: 2px;
    margin-top: 1px;
  }
  `;

  getBlogs() {
    console.log('this function is running');

    const url = `${BASE_URL}blog`;

    fetch(url)
        .then(response => response.json())
        .then(posts => {
            this._posts = posts.posts;
        });
    console.log(this._posts);
    return 0;

  }

  constructor() {
    super();

    console.log(this);

    const url = `${BASE_URL}blog`;
    fetch(url)
        .then(response => response.json())
        .then(posts => {
            this._posts = posts.posts; 
        });
  }

  connectedCallBack(){
    super.connectedCallBack()
    this.addEventListener('myPost', function() {console.log('event dispatched'); this.getBlogs()})
  }

  // A simple formatter that just splits text into paragraphs and 
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library
  static formatBody(text) {
    const paragraphs = text.split('\r\n')
    return paragraphs.map(paragraph => html`<p>${paragraph}</p>`)
  }
  
  render() {
    if (!this._posts)
      return html`Loading...`
    
    return html`
      ${this._posts.map(post => html`<div class="blogpost">
        <h2>${post.title}</h2>
        <h3>By ${post.name}</h3>
        ${BlockBlock.formatBody(post.content)}
      </div>`)}
      `;
  }


}


customElements.define('blog-block', BlockBlock);


