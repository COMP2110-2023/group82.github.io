# COMP2110 Portal - Starter

This is the starter repository for the COMP2110 Portal front end assignment 2023. You are
expected to customise this README file to describe your own project.  You may delete or modify
any or all of the current contents.

## Installation

The project has no external dependencies, it uses Lit via a CDN load directly into
the HTML page.   Node is used only to run a local HTTP server.

```bash
npm install
```

Will install the `http-server` node module.

```bash
npm start
```

will run the server.

## Weather Widget - Gregory Grashon 45324565

THe Weather Widget was created by Gregory Grayshon, Student Number 45324565.

The widget provides weather attributes for several major global cities. Furthermore, the widget can provide weather details for the users current location.

The widget provides, Day/Night status, Temperature in Celsius and details of the forecast.

THe API uses: https://open-meteo.com/en/

To provide forecast details, particular codes were used through the API then translated to the appropriate meaning, the following are all the codes with their associated meanings:

NOTE: The folowing information is taken from https://open-meteo.com/en/docs

Code	                Description
0	                    Clear sky
1, 2, 3	                Mainly clear, partly cloudy, and overcast
45, 48	                Fog and depositing rime fog
51, 53, 55	            Drizzle: Light, moderate, and dense intensity
56, 57	                Freezing Drizzle: Light and dense intensity
61, 63, 65	            Rain: Slight, moderate and heavy intensity
66, 67	                Freezing Rain: Light and heavy intensity
71, 73, 75	            Snow fall: Slight, moderate, and heavy intensity
77	                    Snow grains
80, 81, 82	            Rain showers: Slight, moderate, and violent
85, 86	                Snow showers slight and heavy
95 *	                Thunderstorm: Slight or moderate
96, 99 *	            Thunderstorm with slight and heavy hail


<b>Image References:</b>

<b>Day/Night images:</b> 

https://dribbble.com/shots/3333720-Weather-App-Background-Image-Free?utm_source=pinterest&utm_campaign=pinterest_shot&utm_content=Weather+App+Background+Image+Free&utm_medium=Social_Share. 

<i>Author: Prem</i>

<b>Weather Icons:</b>

https://icon-library.com/icon/weather-icon-gif-0.html

<i>Author: N.A (Free ICONS Library)</i>

## Dictionary API - Hamish Lin 46518037
This widget uses this API: https://dictionaryapi.dev/ to allow users to easily search and define words. It gives details on the part of word (i.e nouns, verbs etc) as well as the definition, possible examples and synonyms.

I've given the widget some user friendly features such as a default landing text that states "Search for something!" to help orient the user. The submit button has been renamed to "Define" and the text input has a placeholder that similarly states the purpose of the widget.

I've also used some error catching features such preventDefault() to stop the widget from auto-submitting once the site has been loaded. Otherwise an error would occur where it would search for null. Some words when searched do not provide synonyms or examples so a conditional has been added so that if there are none a small statement is given saying that none were found. Bear in mind the dictionary-api does not provide examples or synonyms for a lot words. 

## Fact of the day Widget - Lachlan Jackson 45948097
Using the API: http://numbersapi.com/ I have created a widget that will display a random fact about the day.

My widget is pretty barebones however it works as intended.

## Meme Generator API - Labib Zahin 45749337
Using the API: https://api.imgflip.com/get_memes I have created the meme generator which would display any random top 100 memes from the website. 

## Backend Server

Your portal will make use of a server that we have implemented that is running on <https://comp2110-portal-server.fly.dev/>.   Documentation for the services it provides
is in [this Github repository](https://github.com/COMP2110-2023/comp2110-portal-server/).

## Starter Code

The code included here implements the basic framework for the application, including
an overall page structure and the blog, login and advertising components.  If you run
the application you will see the basic page with space for a number of _widgets_.  
You will fill these slots with your own widgets - one per team member. (A _widget_
is a name for an element of a graphical user interface, basically the same as a
component).

The module `config.js` exports a variable `BASE_URL` that contains the address
of the backend server. This is used for example in the blog-block component
to define the URL endpoint.  You may also want to use it if you make use of
other API endpoints from the server (eg. tasks).

The code contains implementations of the following components:

### `<comp2110-portal>`

This is a container for the whole portal application and currently contains 
some of the pre-defined widgets.  You can modify this as you see fit to achieve
your overall application layout and behaviour.

### `<widget-column>`

This component implements a container for widgets and can be used to define
the style information and layout for the group.  You can modify this if you
wish or replace it with something else.

### `Login Widget + Blog Post`

This was created by Gregory Grayshon, Student Number: 45324565 and Lachlan Jackson, Student Number: 45948097

This particular component allows a scuucessful login from Group82. Groups 82 Token is then used
to authorise a post. This post is implemented as a form and fetches the blog section from the 
base url. From there it posts using apprpriate json and authentication headers.
the content and title for the blog is then converted to json, and then added as a post/

Note at the end there is a brief function that will reload the document, therefore the user
can immediately see the result in runtime.

This component implements a login form that will allow a user to authenticate to the
backend server.   If the user is logged in, the component displays their name and
a logout button rather than the form.  

Authentication is implemented in the `auth.js` module.  Once a user login succeeds,
the current user details are stored in the browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) so that
they persist over browser sessions.  In your code, you can use the function
`getUser()` from the `auth.js` module to find out if a user is logged in and get
their details.  

### `Styling And Layout`
Overall styling, layout, main portal and widget (widget-block) styling was primarily created Hamish Lin, Student Number: 46518037. Both Gregory Grayshon, Student Number: 45324565 and Lachlan Jackson, Student Number: 45948097 also contributed greatly especially with the overall style of the login and blog. The overall style was inspired by vaporwave and Windows98 aesthetics. 

### `<blog-block>`

This component implements a blog using the backend API from the COMP2110 portal server.
You can modify this component if you wish to change the layout of posts or the overall look and feel.  

This component only supports reading posts although the backend API allows posting new blog
posts if you are logged in.  One possible extension of this component would be to allow
posting in some way.

### `<ad-widget>`

This component displays an advertisement from the backend portal server. You should not
modify it and it should appear somewhere in your page design.


## Possible Widgets to Implement

Your first task is for each team member to choose one widget from the following list
to implement as a Lit component, following the basic outline provided in
`src/components/widget-block.js`.

* Weather forecast with data from <https://api.open-meteo.com/v1/forecast>, e.g.
[this example](https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&current_weather=true).  Location can be fixed or derived from the Javascript 
[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

* Currency conversion with data from <https://exchangerate.host/> e.g. 
[USD to EUR](https://api.exchangerate.host/convert?from=USD&to=EUR).  Your widget should
allow the user to input an amount to be converted and possibly select the to/from
currencies.

* A widget showing a random fact about the current date from <http://numbersapi.com/>,
e.g. <http://numbersapi.com/3/22/date>.

* A widget showing the upcoming public holidays from <https://date.nager.at>, e.g.
[the 2023 Australian holidays](https://date.nager.at/api/v2/publicholidays/2023/AU).
Your widget could allow selection of the country who's holidays are being displayed.

* (Advanced) A TODO task widget using the API provided by the COMP2110 portal backend.
Should show tasks for the current logged in user, allow creation of new tasks and
changing the state of existing tasks (marking them as done).

* Your own design making use of data from an open API (e.g. see [this list](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/)).

