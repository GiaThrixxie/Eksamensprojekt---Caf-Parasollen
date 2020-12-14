console.log('JavaScript from js/js.js: up and running!');





/***** Zoom on mouseover - Activity site *****/
/*********************************************/

//Was meant to have the img increase in size AND the textbox to show itself on hover of either one, but won't work unfortunately, so I've left the two that work on themselves plus the attempted function that didn't work

$(document).ready(function () {


    // On hovering on the image of an activity, said image gains a class which increases its size
    $(function () {
        $('.activityImg').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        })
    })


    // On hovering on the text of an activity, said text gains a class which moves its top-position to show the description text
    $(function () {
        $('.textBox').hover(function () {
            $(this).addClass('textBoxHover');
        }, function () {
            $(this).removeClass('textBoxHover');
            /*}, function() {
              $(this).closest('.activity').find('.activityImg').addClass('hover');
            }, function() {
              $(this).closest('.activity').find('.activityImg').removeClass('hover');*/
        })
    })



    /***** Setting daily items Index page *****/
    /******************************************/

    // Display date in Danish and using local date customs (day/month/year)
    
    var weekday = { weekday: 'long'};
    
    var date = {  month: 'short', 
                   day: 'numeric'
                  };
    
    var printDate = new Date().toLocaleDateString('da', date);
    var printDay = new Date().toLocaleDateString('da', weekday);
    
    
    document.getElementById('day').innerHTML = printDay + ' den ' + printDate;

        
    
    // Display daily activities, food and open hours
    
    // Make an empty variable for everything; one for daily activity items, one for daily food and one for open hours
    var daily_activities;
    
    var daily_food;
    
    var daily_open_hours;
        
    
    // Because there's more than 2 scenarios I need to test (since there's 7 days of the week), I decided to use a switch statement to cycle through what needs to be displayed. Here we get the day based on its array number 0 is Sunday, 1 is Monday, and at the end 6 is Saturday
    
    switch (new Date().getDay()) {
        case 0: // Sunday
            daily_activities = '  ';
            daily_food = 'Flæskesteg med rødkål';
            daily_open_hours = 'kl. 11:30 - 15:00';
            break;
            
        case 1: // Monday
            daily_activities = '<strong>NADA</strong>   kl. 11:00 - 12:00</p><p class="dailyActivitiesStyle"><strong>Gåtur</strong>   kl. 13:00 - 14:00</p><p class="dailyActivitiesStyle"><strong>Frimærkeklub</strong>   kl. 14:00 - 15:00';
            daily_food = 'Frikadeller m. stuvet hvidkål';
            daily_open_hours = 'kl. 9:30 - 21:30';
            break;
            
        case 2: // Tuesday
            daily_activities = '<strong>Solstrålen</strong>   kl. 10:00 - 13:00';
            daily_food = 'Stegt lever m. bløde løg';
            daily_open_hours = 'kl. 9:30 - 15:30';
            break;
            
        case 3: // Wednesday
            daily_activities = '<strong>Strikkecafé</strong>   kl. 13:00 - 14:00';
            daily_food = 'Tarteletter m. høns i asparges';
            daily_open_hours = 'kl. 9:30 - 15:30';
            break;
            
        case 4: // Thursday
            daily_activities = '<strong>Solstrålen</strong>   kl. 10:00 - 13:00</p><p class="dailyActivitiesStyle"><strong>Brætspilscafé</strong>   kl. 13:00 - 14:30';
            daily_food = 'Grydestegt kylling m. agurkesalat';
            daily_open_hours = 'kl. 9:30 - 15:30';
            break;
            
        case 5: // Friday
            daily_activities = '<strong>Petanque</strong>   kl. 13:15 - 14:15';
            daily_food = 'Stuvede kartofler m. sylte, sennep og rødbeder';
            daily_open_hours = 'kl. 9:30 - 15:30';
            break;
            
        case 6: // Saturday
            daily_activities = '  ';
            daily_food = '  ';
            daily_open_hours = 'Lukket';
    }
    document.getElementById('dailyActivities').innerHTML = daily_activities; // Insert our daily activities value into the p with ID dailyActivities
    document.getElementById('dailyFood').innerHTML = daily_food; // Insert our daily food value into the p with ID dailyFood
    document.getElementById('dailyOpenHours').innerHTML = daily_open_hours; // Insert our daily open hours value into the p with ID dailyOpenHours
    
    
    
}); /*** Document ready end ***/
/*** $(document).ready(function() {
    
    /***
    }).catch(err => {
      // Do something for an error here
      console.log('There was an error ...');
    });
    
}); /*** Document ready end ***/




/***** Google Calendar API - Activities site *****/
/*************************************************/
// Client Secret = lwn3mTb5C1zm5O0eKCKHkdD_


// Client ID and API key from the Developer Console
var CLIENT_ID = '775054273001-4hbdulmdkhka3gib415gj9dg88i433os.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAI1VYmkO_Y8oBPg9aFyaLdZGMf3ZsY34o';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('No upcoming events found.');
        }
    });
}




/***** Mapbox - Contact Us site *****/
/************************************/



mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lhdGhyaXh4aWUiLCJhIjoiY2tpZnNoeGUwMDg3dzJ3bXFuYjF3ZnplaSJ9.5MWMr0s3QQ0E8CQHGhnCjw';
var cafeParasollen = [10.165250598435904, 56.129184069225076];
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/giathrixxie/ckifzzql20x1s19pmleins1ni',
    center: cafeParasollen, // starting position [lng, lat]
    zoom: 16 // starting zoom
});


// Create popup for the marker
var popup = new mapboxgl.Popup({
        offset: 25
    })
    .setHTML('<h3>Café Parasollen</h3>' +
        '<p>Grundtvigsvej 4</p>' +
        '<p>8260 Viby J</p>' +
        '<p>amj@kfumsoc.dk</p>' +
        '<p>Tlf: 8611 7703</p>'
    );

//Create DOM element for the marker
var markerDiv = document.createElement('div');
markerDiv.id = 'marker';

// Create the marker
new mapboxgl.Marker(markerDiv)
    // var marker = new mapboxgl.Marker()
    .setLngLat(cafeParasollen)
    .setPopup(popup)
    .addTo(map);
