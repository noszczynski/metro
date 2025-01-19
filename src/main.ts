console.log("delete_station_event", delete_station_event)

var number_of_shuttles = 0;
var neighborhoods = new L.geoJson();
var landmarks = new L.geoJson();
var demand = [];
var N_demand_station_links = {};

// $.getJSON( "json/demand.json", function( data ) {
//     demand = data;
// });

function initialize_game_state() {

   if (N_stations != null) {
      // Reset the map
      for (var i = 0; i < N_stations.length; i++) {
         N_stations[i].del();
      }
   }

   if (N_lines != null) {
      for (var j = 0; j < N_lines.length; j++) {
         N_lines[j].generate_draw_map();
      }
      for (j = 0; j < N_lines.length; j++) {
         N_lines[j].draw();
      }
   }

   station_layer.bringToFront();

   number_of_shuttles = 1;

   station_id_generator.reset();
   line_id_generator.reset();

   N_stations = [];
   N_lines = [];
   N_transfers = [];

   // NEVER CHANGE THE ORDER OF THESE or you break saved games
   // Only add to the end
   N_lines.push(new Line('A', 'A', 'subway-line', '#0039A6', '#FFFFFF'));
   N_lines.push(new Line('B', 'B', 'subway-line', '#FF6319', '#FFFFFF'));
   N_lines.push(new Line('C', 'C', 'subway-line', '#0039A6', '#FFFFFF'));

   // Saving space here in case we want to add more defaults later
   // for(var i = 0; i < 50; i++) {
   //     N_lines.push(new Line('N/A', 'N/A', 'subway-line-long', '#808183', '#FFFFFF'));
   // }

   N_active_line = find_line_by_name('A');

   N_line_groups = [];
   // N_line_groups.push(new LineGroup('#0039A6', [find_line_by_name('A').id, find_line_by_name('A-Euclid').id, find_line_by_name('C').id, find_line_by_name('E').id, find_line_by_name('H').id, find_line_by_name('K').id, find_line_by_name('SIRR').id]));

   N_custom_line_colors = {};

   // Initialize demand matrix
   N_demand_station_links = {};
   N_demand_station_links[0] = {};
   N_demand_station_links[0][0] = [];
}

// Main

var map = L.map('map', {
   fullscreenControl: true,
   attributionControl: false
}).setView([50.061267, 19.937566], 14);


L.tileLayer.provider('CartoDB.Positron').addTo(map);

var station_layer = L.featureGroup();
var curve_layer = L.featureGroup();
var debug_layer = L.featureGroup();

map.addLayer(curve_layer);
map.addLayer(station_layer);
map.addLayer(debug_layer);

initialize_game_state();

var HEADLESS_MODE = false;
var CUSTOM_CITY_NAME = "";

$(function() {
   // Event handlers
   map.on('click', handle_map_click);

   $(document).on('click', '.station-delete', delete_station_event);
   $(document).on('click', '.station-transfer', transfer_station_event);
   $(document).on('click', '.station-build', build_to_station_event);
   $(document).on('click', '.subway-deletable', remove_line_from_station_event);
   $(document).on('click', '.station-name', function() {
      var text = $(this).text();
      var sn = $(this);
      $(this).text('');
      $('<textarea class="station-name-edit"></textarea>').appendTo($(this)).val(text).select().blur(

        function() {
           var newText = $(this).val();
           $(this).parent().text(newText).find('textarea').remove();
           var station_id = sn.attr('id').replace('station-', '');
           var station = N_stations[station_id];
           station.name = newText;
           station.generate_popup();
           generate_route_diagram(N_active_line);
        });
   });

   $(document).on('click', '.subway-clickable', function() {
      line_select_click_handler($(this));
      return false;
   });

   // UI edits
   $(".subway-hidden").hide();
   $("#custom-line-options").hide();

   // Starter screen
   $("#game-start-scratch").click(function() {
      $("#starter").hide();
   });

   $(".game-start-button").not(".game-start-greyed").click(function() {
      $("#starter").hide();
   });

   var input = document.getElementById('pac-input');
   var autocomplete = new google.maps.places.Autocomplete(input, {types: ["(cities)"]});

   autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();

      CUSTOM_CITY_NAME = place.name;

      var place_lat = place.geometry.location.lat();
      var place_lng = place.geometry.location.lng();
      map.panTo(L.latLng(place_lat, place_lng));
      $("#starter").hide();
   });

});