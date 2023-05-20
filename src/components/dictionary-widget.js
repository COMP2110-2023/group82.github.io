import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DictionaryAPI extends LitElement{

    //declaring properties
    static properties = {
        header: {type:String},
        url: {type:URL},
        _data: {state:true},
        word: {type:String},
        definition: {type:String},
        synonyms: {type:String},
        example: {type:String},
        partOfSpeech: {type:String},

    }

    //styling
    static styles = css`

    :host{
        display:block;
        width: 250px;
        height: 250px;
        align-self: center;
    }

    body{
        display: flex;
        width: 250px;
        height: 250px;
        align-items: center;
        justify-content: center;
    }
    .wrapper{
        align-items: center;
        justify-content: center;
        background-color: #4a7c59;
        padding: 0.5em;
        max-width: 100%;
        max-height: 100%;
        overflow:auto;
        border-radius: 10px;
        border-style: outset;
        border-width: 2px;
        
    }
    .wrapper ul li{
        padding-top: 0.3em;
        padding-left: 0.3em;
        padding-right: 0.3em;
        padding-bottom: 0.3em;
    
    }
    header{
        font-size: 1.5em;
        color: #faf3dd;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    h1{
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1em;
        color: #faf3dd;
        font-weight: normal;
    }
    h2{
        color: #faf3dd;
        font-size: 1em;
        text-transform: uppercase;
    }

    p{
        color: #faf3dd;
        border-left: 3px solid #68b0ab;
        border-radius: 4px 0 0 4px;
        padding-left: 10px;
        padding-right: 10px;
    }

    ul{
        list-style-type: none;
        text-align: center;
        padding: 0;
    }
   
    }`;

    static BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

    constructor(){
        super();
        this.word = '';
        this.definition = '';
        this.synonyms = '';
        this.example = '';
        this.partOfSpeech = '';
        this._dataLoaded = false;

    }

    //Function for when user presses submit, has preventDefault to stop auto-submitting. Takes word inside text input and parses it into this.word.
    //Then calls the fetch function.
    handleSubmit(event){

        event.preventDefault();
        const input = this.shadowRoot.querySelector('input[type="text"]');
        this.word = input.value;
        console.log(this.word);
        this._fetch();
    }

    connectedCallback(){
        super.connectedCallback();
        
    }

    //Fetch function which concatenates the baseURL and the new this.word to retrieve the JSON from the dictionary API
    //Then puts all the appropriate info from the JSON into the local variables. Also checks the 'dataLoaded' to prevent errors.
        _fetch(){
            fetch(DictionaryAPI.BASE_URL + this.word)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { meanings, word, phonetics } = data[0];
                    this.word = word;
                    this.partOfSpeech = meanings[0]?.partOfSpeech || '';
                    this.definition = meanings[0]?.definitions[0]?.definition || '';
                    this.example = meanings[0]?.definitions[0]?.example || undefined;
                    this.synonyms = meanings[0]?.synonyms?.join(', ') || '';
                    this._data = data;
                    console.log(this._data);
                    this._dataLoaded = true;
                  }
              });
        }


        //Checks if dataLoaded is true to start rendering appropriate response, otherwise renders the landing page.
    render(){
        if(this._dataLoaded){
        return html `
        <body>
        <div class= "wrapper">
        <header>DICTIONARY</header>
            <form id = "word-search-form" @submit=${this.handleSubmit}>
                <input type="text" placeholder= "Search For A Word">
                <input type="submit" value = "Define">
            </form>

            <ul>
                <li>
            <h2>${this.word} / ${this.partOfSpeech}</h2>
            <p>${this.definition ? 'Definition: '+this.definition: 'Sorry! No Definition Found'}</p>
            <p>${this.example ? 'Example: '+this.example: 'Sorry! No Examples Found'}</p>
            <p>${this.synonyms ? 'Synonyms: '+this.synonyms: 'Sorry! No Synonyms Found'}</p>
                </li>
            </ul>

            </div>
        </body>
        `
        } else{
            return html `
            <body>
            <div class= "wrapper">
            <header>DICTIONARY</header>
            <form id = "word-search-form" @submit=${this.handleSubmit}>
                <input type="text" placeholder= "Search For A Word">
                <input type="submit" value = "Define">
            </form>
            <h1>Search for a word and get its part of speech, definition, an example and possible synonyms!</h1>
            </div>
            </body>
            `
        }
    }


}


customElements.define('widget-dictionary', DictionaryAPI);