import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { Form, InputGroup } from "react-bootstrap";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "20px",
};

const gyms = [
  {
    name: "Énergie Cardio Beauharnois",
    position: { lat: 45.30860549108165, lng: -73.86171776257574 },
    mapsLink: "https://maps.app.goo.gl/odDz8rFiUcRsu2dn9",
  },
  {
    name: "Énergie Cardio Valleyfield",
    position: { lat: 45.270537938763866, lng: -74.13011423538185 },
    mapsLink: "https://maps.app.goo.gl/uzYZAx6uAR6TaK5Y8",
  },
];

const libraries = ["places"];

export default function MyLocations() {
  const { t } = useTranslation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [search, setSearch] = useState("");
  const [selectedGym, setSelectedGym] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef(null);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;

    // Create bounds and extend them with each gym location
    const bounds = new window.google.maps.LatLngBounds();
    gyms.forEach((gym) => bounds.extend(gym.position));

    // Fit the map to show all locations
    map.fitBounds(bounds);
  }, []);

  const handleGymClick = (gym) => {
    setSelectedGym(gym);
    setActiveMarker(gym.name);
    if (mapRef.current) {
      mapRef.current.panTo(gym.position);
      mapRef.current.setZoom(15);
    }
  };

  const handleMarkerClick = (gym) => {
    setSelectedGym(gym);
    setActiveMarker(gym.name);
  };

  const filteredGyms = gyms.filter((gym) =>
    gym.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: "#F5F7FA",
        gap: "30px",
      }}
      className="
        d-flex flex-column align-items-center
        px-3 py-4               /* mobile */
        px-md-5 py-md-5         /* tablet */
        px-xl-135px py-xl-50px  /* desktop */
      "
    >
      {/* TITLE */}
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ fontWeight: "bold" }}
      >
        <span className="d-none d-md-block" style={{ fontSize: "75px" }}>
          {t("homePage.myLocations.title")}
        </span>
        <span className="d-md-none" style={{ fontSize: "42px" }}>
          {t("homePage.myLocations.title")}
        </span>
      </div>
      <div
        className="
    d-flex 
    flex-column         /* mobile */
    flex-md-row         /* tablet & desktop */
    gap-3 gap-md-4
    w-100
  "
      >
        {/* LEFT CONTAINER */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxHeight: "600px",
            border: "1px solid #ddd",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          {/* SEARCH */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder={t("homePage.myLocations.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          {/* SCROLLABLE GYM LIST */}
          <div
            style={{
              overflowY: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {filteredGyms.map((gym) => (
              <div
                key={gym.name}
                onClick={() => handleGymClick(gym)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedGym?.name === gym.name ? "black" : "#f8f9fa",
                  color: selectedGym?.name === gym.name ? "white" : "black",
                  padding: "15px",
                  borderRadius: "10px",
                  fontWeight: "500",
                  transition: "0.3s",
                }}
              >
                {gym.name}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTAINER (MAP) */}
        <div style={{ flex: "2" }}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={12}
              onLoad={handleMapLoad}
            >
              {filteredGyms.map((gym) => (
                <Marker
                  key={gym.name}
                  position={gym.position}
                  onClick={() => handleMarkerClick(gym)}
                >
                  {activeMarker === gym.name ? (
                    <InfoWindow
                      position={gym.position}
                      onCloseClick={() => setActiveMarker(null)}
                    >
                      <div>
                        <strong>{gym.name}</strong>
                        <br />
                        <a
                          href={gym.mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("homePage.myLocations.viewOnMaps")}
                        </a>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))}
            </GoogleMap>
          ) : (
            <p>Loading Map...</p>
          )}
        </div>
      </div>
    </div>
  );
}
