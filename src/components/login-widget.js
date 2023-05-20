import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    blogUrl: {type: String},
    user: {type: String, state: true },
    _posts: {state: true},
    correctLogin: {type: String},
  }

  static styles = css`
    :host {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    h1 {
      font-size: 0.55em;
      margin-bottom: 0px;
      padding-bottom: 0px;
      text-shadow: 3px 3px 2px black;
    }

    h2 {
      font-size: 0.5em;
      text-shadow: 3px 3px 2px black;
    }

    #blogHeading {
      
      font-size: 1.2em;
      padding-bottom: 5px;
      margin-bottom: 0px;
      padding-top: 5px;
      margin-top: 0px;
    }

    form {
      
      
      

    }

    .loginDetails {
      display: flex;
      flex-direction: row;
      align-items: center:
      
      vertical-align: middle;
      justify-content: center;

    }

    #loginWidget {
      
      
      

    }

    #failLogin {
      text-shadow: 3px 3px 2px black;
    }

    #submit_button {
      width: 8%;
      height: 40px;
      font-family: Verdana;
      background-color: #f0ebd8;
      color: blue;
      //border-radius: 10%;
      font-weight: bold;
      font-size: medium;
      border: 3px outset #ffffff;
      text-align: center;
      cursor: pointer;
      padding-top: 0px;

      

    }

    #submit_button:hover{
      background-color: yellow;
      color: red;
    }

    #reset_button:hover{
      background-color: yellow;
      color: red;
    }

    #reset_button {
      width: 8%;
      height: 40px;
      font-family: Verdana;
      background-color: #f0ebd8;
      color: blue;
      border: 3px outset #ffffff;
      //border-radius: 10%;
      font-weight: bold;
      font-size: medium;
      text-align: center;
      cursor: pointer;
      

    }

    #Blog-Box{

      font-family: verdana;
      background-color:  #F0EBD8;
      //border-radius: 10%;
      border: 6px inset #CCC;
      padding: 1%;
      margin-top: 10px;
      width: 60%;
      z-index: -1;
      margin-bottom: 0px;
      padding-bottom: 0px;
      


      
    }

    #Title-Box{
      background-color: #F0EBD8;;
      //border-radius: 10%;
      border: 7px inset #CCC;
      padding: 1%;
      margin-top: 0px;
      width: 20%;
      z-index: -1;
    }

    #Log-Out-Button{
      width: 8%;
      height: 40px;
      font-family: Verdana;
      background-color: #f0ebd8;
      color: blue;
      border: 3px outset #ffffff;
      //border-radius: 10%;
      font-weight: bold;
      font-size: medium;
      text-align: center;
      cursor: pointer;
      margin-left: 4%;
      margin-right: 4%;
      margin-top: auto;
      margin-bottom: auto; 

    }

  #Log-Out-Button:hover{
    background-color: yellow;
    color: red;
    

  }

  #TitleLabel{
    font-family: Verdana;
    Font-Size: Large;

  }



  .login{

  
  
  


    }

    #label1{ 
      justify-content: space-evenly;
      text-shadow: 3px 3px 2px black;
      
     
    }

    #label2{
      text-shadow: 3px 3px 2px black;
      justify-content: space-evenly;
    }

    #User{
      background-color: #F0EBD8;;
      //border-radius: 10%;
      border: 7px inset #CCC;
      
      
    }

    #Pass{
      background-color: #F0EBD8;;
      //border-radius: 10%;
      border: 7px inset #CCC;
    }


    #submitButton {
      font-family: Verdana;
      background-color: #f0ebd8;
      color: blue;
      border: 3px outset #ffffff;
      //border-radius: 10%;
      font-weight: bold;
      font-size: medium;
      text-align: center;
      cursor: pointer;


    }
    
    `;

    

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.blogUrl = `${BASE_URL}blog`;
    this.user = getUser();
  }
//function to allow login
  submitForm(event) { 
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log(username);
    console.log(password);
    fetch(this.loginUrl, {
        method: 'post',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json',}

    }).then(result => result.json()).then(response => {
        this.user = response;
        console.log(this.user.error);
        this.correctLogin = this.user.error;
        
        storeUser(response);
    })
  }
// function to submit the posts header and post content, authorising group82 to post.
//the post also submits to main blog page, with a refresh function at the end so user
//can immediately see submitted post
  submitPost(event) {
    event.preventDefault();
    console.log("testing");
    const title = event.target.title.value;
    const content = event.target.text.value;   
       fetch( this.blogUrl, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'basic ee5b2fb9-1e1d-4504-bbcb-f7c3c89acc2b' },
         body: JSON.stringify({title, content})       
     }).then(result => result.json())
     .then(posts => {
      this._posts = posts.posts; 
      document.location.reload();
  });
  }
//function to log out
  logout() {
    deleteUser();
    this.user = null;
  }
//function to present blog form upon successful login
  render() {
    if (this.user && this.correctLogin != 'login incorrect') {
        return html`
        <div id = "loginWidget">
        <div class = "loginDetails">
          <h2>The current user logged in is ${this.user.name}</h2>
          
          <button @click=${this.logout} id = "Log-Out-Button">Logout</button>
        </div>
        
        <form @submit=${this.submitPost}>
        <h1 id= "blogHeading"><b>Write a Blog...</b></h1>
        
        <input name = "title" type = "text" id = "Title-Box" placeholder = "Title..">
        <br>
        
        <textarea input name = "text" rows = "5" cols = "40" id = "Blog-Box" placeholder = "Type a blog here..."></textarea>
        <br>
        <input type='submit' value='submit' id = "submit_button">
        <input type="reset" value="reset" id = "reset_button">
        </form>
        </div>
        `;

    }

    if (this.correctLogin == 'login incorrect') {
      return html`
      <form @submit=${this.submitForm} id = "form">
        <label class = "login" id = "label1"><b> Username: </b></label>
        <input name="username" class = "login" id = "User" placeholder = "Username">
        <br>
        <label class = "login" id="label2"><b> Password: </b></label> 
        <input type="password" name="password" class = "login" id = "Pass" placeholder = "Password">
        <br>
        <input type='submit' value='Login' class = "login" id = "submitButton">
      </form>
      <p id = "failLogin">Previous login was incorrect! </p`
      ;   

  }


//function to allow form submission  
    return html`
      <form @submit=${this.submitForm} id = "form">
        <label class = "login" id = "label1"><b> Username: </b></label>
        <input name="username" class = "login" id = "User" placeholder = "Username">
        <br>
        <label class = "login" id="label2"><b> Password: </b></label> 
        <input type="password" name="password" class = "login" id = "Pass" placeholder = "Password">
        <br>
        <input type='submit' value='Login' class = "login" id = "submitButton">
      </form>`;   
  }
}

customElements.define('login-widget',  LoginWidget);
