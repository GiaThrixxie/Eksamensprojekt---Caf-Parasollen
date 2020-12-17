console.log('JavaScript from js/js.js: up and running!');





/***** Zoom on mouseover - Activity site *****/
/*********************************************/

/* Made with the help of CSS-Tricks <https://css-tricks.com/snippets/jquery/addingremoving-class-on-hover/> 

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
    
    /* Made with help from RWC <https://stackoverflow.com/questions/4822852/how-to-get-the-day-of-week-and-the-month-of-the-year> */

    // Display date in Danish and using local date customs (day/month/year)
    
    var weekday = { weekday: 'long'};
    
    var date = {  month: 'short', 
                   day: 'numeric'
                  };
    
    var printDate = new Date().toLocaleDateString('da', date);
    var printDay = new Date().toLocaleDateString('da', weekday);
    
    
    document.getElementById('day').innerHTML = printDay + ' den ' + printDate;

        
    
    // Display daily activities, food and open hours
    
    /* Made with help from W3Schools <https://www.w3schools.com/js/js_switch.asp> */
    
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
    
    
    
}); 



/***** Mapbox - Contact Us site *****/
/************************************/

/* Made with the help of Mapbox <https://docs.mapbox.com/mapbox-gl-js/example/set-popup/> */

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
    .setLngLat(cafeParasollen)
    .setPopup(popup)
    .addTo(map);
