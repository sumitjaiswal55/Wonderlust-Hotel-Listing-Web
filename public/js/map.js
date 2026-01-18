mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
  .addTo(map);




// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map', // container ID 
//     style: "mapbox://styles/mapbox/streets-v12",  //may be 
//     center: listing.geometry.coordinates, // starting position [lng, lat] 
//      zoom: 10,
//  });
 


//  const marker = new mapboxgl.Marker({color:"red"})
//         .setLngLat(listing.gemoetry.coordinates)
//         .addTo(map);