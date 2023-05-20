import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class FactsBlock extends LitElement {
  static properties = {
    header: { type: String },
    url: {type: String },
    _fact: {type: String },
    text: {type: String },
    _date: {type: String},
  }

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: ivory;
        border-style: solid;
        border-width: 1px;
        text-align: center;
    }

    :p {
        text-align: center;

    }

  `;

  constructor() {
    super();
    this.header = 'Widget';
    this.url = this.urlFormer();
    this._fact = "";
    this.text = 'Loading...';
    this._fetch();


    

    
    console.log(this.url);
  }

  connectedCallBack() {
    super.connectedCallBack();
  }

  //fetch function that calls fetch from the url 
  //from the urlFormer() function
  //gets the data from the response and sets the elements _fact variable to it
  // for the text to be called in render.

  _fetch() { 
    var test = "";
    fetch(this.url)
    .then ((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        //console.log(data);
        //this.fact = data.text;
        //console.log(this._fact);
        this._fact = data.text;
        //console.log(this._fact);

        //Debugging output statements from the functions creation
        

    })
    

  }

  render() {
    return html`
        <h3>Fact of the day!</h3>
        <p>${this._fact}<p>
        <p>${this.date}</p?
        
        
         
    `;
  }
//this function creates a string based on the original baseURL variable and adds the month/date/ to the end of it.
  urlFormer() {
    var baseURL = 'http://numbersapi.com/';
    const date = new Date();

    baseURL = baseURL + (date.getMonth()+1) + "/";
    baseURL = baseURL + date.getDate() + "/date?json";
    return baseURL;

  }

}

customElements.define('widget-facts', FactsBlock);