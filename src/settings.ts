// Drawing parameters
const MARKER_RADIUS_DEFAULT = 6.0;
const MARKER_RADIUS_LARGE = 8.0;
const MARKER_RADIUS_HUGE = 12.0;
const STATION_MARKER_LARGE_THRESHOLD = 3; // Number of groups needed to force a large station marker
const STATION_MARKER_HUGE_THRESHOLD = 4;
const STATION_MARKER_SCALE_THRESHOLD = 6;
const TRACK_WIDTH = 6.0;
const TRACK_OFFSET = 6.0;
const TRANSFER_WIDTH = 3.0;

const USE_CURVED_TRACKS = true;
const BEZIER_SHARPNESS = 0.6;

const DEBUG_MODE = false;

// Map rendering parameters
const SHARED_STRETCH_THRESHOLD = 8; // Max number of "local" stations in a shared stretch.

// Voxel data paramaters
const GEO_RANGE_LAT = 0.8;
const GEO_RANGE_LNG = 1.0;

const LAT_MIN = 40.713 - GEO_RANGE_LAT/2.0;
const LNG_MIN = -74.006 - GEO_RANGE_LNG/2.0;

const VOXELS_DIM = 500;
const VOXELS_RES_LAT = GEO_RANGE_LAT / VOXELS_DIM;
const VOXELS_RES_LNG = GEO_RANGE_LNG / VOXELS_DIM;

// Geocoding parameters
const ENC_NEIGHBORHOODS_ALWAYS_LABEL = ['Astoria'];
const ENC_NEIGHBORHOODS_ONLY_LABEL = ['Roosevelt Island', 'Governors Island', 'Randall\'s Island', 'North Brother Island', 'South Brother Island', 'Rikers Island', 'John F. Kennedy International Airport', 'Floyd Bennett Field', 'LaGuardia Airport'];
const ENC_LANDMARKS_ONLY_LABEL = ['Ellis Island', 'Liberty Island', 'Governors Island', 'Grand Army Plaza', 'Bartel Pritchard Square', 'Mets-Willets Point'];
const ENC_LANDMARKS_NEVER_LABEL = ['JFK Airport', 'LaGuardia Airport']; // These are covered by the neighborhood name

// Instructions for calculate_ridership function
const RIDERSHIP_ADD = 0;
const RIDERSHIP_NOCHANGE = 1;
const RIDERSHIP_DELETE = 2;

// Employment modifiers
// Data from NYCEDC
const PERCENTAGE_EMPLOYMENT_TRIPS = 0.2;
const EMPLOYMENT_BY_BOROUGH_MODIFIERS = {
  'Staten Island': 1.0,
  Queens: 5.551,
  Brooklyn: 5.606,
  Bronx: 2.476,
  Manhattan: 22.189,
};
