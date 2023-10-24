window.onload = async () => {
  // set the map
  let map = L.map("pedestrians_map").setView([45.5019, -73.5674], 11);

  // set the tiles on the map
  L.tileLayer(
    "https://api.maptiler.com/maps/basic-v2-light/256/{z}/{x}/{y}.png?key=nvdl8AalbEZo7o0Srfuz",
  ).addTo(map);

  // get the pedestrian lights data
  const pedestrian_lights_response = await fetch("/pedestrian_lights");
  const pedestrian_lights_json = await pedestrian_lights_response.json();
  const pedestrian_lights = await pedestrian_lights_json.data;

  // get the pedestrian lights with sound signals data
  const pedestrian_lights_with_sound_signal_response = await fetch(
    "/pedestrian_lights_with_sound_signal",
  );
  const pedestrian_lights_with_sound_signal_json =
    await pedestrian_lights_with_sound_signal_response.json();
  const pedestrian_lights_with_sound_signal =
    await pedestrian_lights_with_sound_signal_json.data;

  // set the marker on the map to where the pedestrian lights are located
  set_pedestrian_lights_marker(
    map,
    pedestrian_lights,
    pedestrian_lights_with_sound_signal,
  );
};

function set_pedestrian_lights_marker(
  map,
  pedestrian_lights,
  pedestrian_lights_with_sound_signal,
) {
  for (const pedestrian_light of pedestrian_lights) {
    // create the circle marker
    let pedestrian_light_marker = L.circleMarker(
      [
        parseFloat(pedestrian_light.Latitude),
        parseFloat(pedestrian_light.Longitude),
      ],
      { radius: 3, color: "green" },
    ).addTo(map);

    // check if the circle marker also has sound signals
    if (
      pedestrian_lights_with_sound_signal.some(
        (obj) => obj.INT_NO === pedestrian_light.INT_NO,
      )
    ) {
      // change the color to red to easily identify it
      pedestrian_light_marker.setStyle({ color: "red", fillColor: "red" });
    }
  }
}
