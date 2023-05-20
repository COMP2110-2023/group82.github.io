import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/Weather.js';
import './components/facts.js';
import './components/dictionary-widget.js';
import './components/MemeGenerator.js';

class Comp2110Portal extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      margin: 0 auto;
      text-align: center;
      display:flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: stretch;
    }

    header {
      width: 100%;
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	    background-size: 400%;
	    animation: gradient 15s ease infinite;
	    height: 95vh;
      padding: 20px;
      box-sizing: border-box;
      color: white;
      font-size: 3em;
      
    }

    h1{
      font-size: 2em;
      padding: 0px;
      margin-bottom: 0px;
      text-shadow: 3px 3px 2px black;   
    }
    
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    blog-block{
      background-color: #f7f7f7;
      text-overflow: ellipsis;
    }

    main {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    }

    .widget-columns {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap:2em;
    }

    .widget-block {
      transition: transform 0.2s ease-in-out;

    }

    .widget-block:hover {
      transform: scale(1.5);
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }

    #lwidget {
      padding: 0px;
      margin-top: 0px;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Portal';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget id="lwidget"></login-widget>
      </header>

      <blog-block></blog-block> 

      <main>
      <div class="widget-columns">

        <widget-column header="">
          <widget-block header="First Widget"></widget-block>
          <br>
          <widget-facts header="Facts Widget"></widget-facts>
        </widget-column>
              
        <widget-column header="">
          <widget-dictionary header="widget-dictionary"></widget-dictionary>
          <br>
          <ad-widget></ad-widget>
        </widget-column>

        <widget-column header="">
          <widget-weather header="Weather Widget"></widget-weather>
          <br>
          <ad-widget></ad-widget>
        </widget-column>

        </div>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

function submitBlogPost(form) {
  console.log("This function is running.")

  //const title = document.getElementById("Main-Title").value
  const title = form.formTitle.value;
  const content = form.formText.value;
 
  //const content = document.getElementById("Main-Post").value
  
  console.log("hi")
 
     fetch( this.blogUrl, {
     method: 'POST',
   
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'basic ee5b2fb9-1e1d-4504-bbcb-f7c3c89acc2b' },

       body: JSON.stringify({title, content})
  
     
   }).then(result => result.json())

   .then(response => {
    if (response.ok){
      console.log("all good")
    }

    else {
      console.log("failed")
    }
   })

}

customElements.define('comp2110-portal', Comp2110Portal);