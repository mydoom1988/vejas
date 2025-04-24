<script src="https://api.windy.com/assets/map-forecast/libBoot.js"></script>
<script src="polyline.js"></script>
<script>
  const STRAVA_ACCESS_TOKEN = '445403f98c9e005eaea61c3dd7e8cc4b1fbf57b2';
  const WINDY_API_KEY = 'pB51Zbb2Lz3JQ3j2lsidiIB6d2wlYny3';

  const options = {
    key: WINDY_API_KEY,
    verbose: true,
    lat: 54.9,
    lon: 21.2,
    zoom: 8,
    overlay: 'wind',
    timestamp: Date.now(),
    level: 'surface'
  };

  windyInit(options, windyAPI => {
    const { map } = windyAPI;

    fetch('https://www.strava.com/api/v3/athlete/activities', {
      headers: {
        Authorization: `Bearer ${STRAVA_ACCESS_TOKEN}`
      }
    })
    .then(res => res.json())
    .then(activities => {
      activities.forEach(activity => {
        if (activity.map && activity.map.summary_polyline) {
          const coords = decodePolyline(activity.map.summary_polyline);
          const polyline = L.polyline(coords, {
            color: 'orange',
            weight: 4,
            opacity: 0.8
          }).addTo(map);
          map.fitBounds(polyline.getBounds());
        }
      });
    })
    .catch(err => console.error('Failed to load Strava activities:', err));
  });
</script>
