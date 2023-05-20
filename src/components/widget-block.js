import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetBlock extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
        border-color: black;
        border-width: 2px;
        border-style: solid;
        border-top-right-radius: 15%;
        border-bottom-left-radius: 15%;
        border-bottom-right-radius: 15%;
    
  }
  `;

  constructor() {
    super();
    this.header = 'Widget';
  }

  render() {
    return html`
        <h3>${this.header}</h3>
    `;
  }
}

customElements.define('widget-block', WidgetBlock);