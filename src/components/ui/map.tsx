"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";

import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude: number;
  longitude: number;
  locationType?: "home" | "shop";
  address?: string;
  className?: string;
}

const homeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const shopIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapCenter({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude], 15);
  }, [map, latitude, longitude]);
  return null;
}

export function BookingMap({ latitude, longitude, locationType, address, className }: MapProps) {
  const icon = locationType === "home" ? homeIcon : locationType === "shop" ? shopIcon : defaultIcon;
  const locationLabel = locationType === "home" ? "Home Service" : locationType === "shop" ? "Shop Visit" : "Location";
  
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className={className}>
      <div className="relative rounded-lg overflow-hidden border" style={{ height: "300px" }}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapCenter latitude={latitude} longitude={longitude} />
          <Marker position={[latitude, longitude]} icon={icon}>
            <Popup>
              <div className="text-center">
                <p className="font-medium">{locationLabel}</p>
                {address && <p className="text-sm text-muted-foreground">{address}</p>}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{locationLabel}</p>
          {address && <p className="text-xs text-muted-foreground">{address}</p>}
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <Navigation className="h-4 w-4 mr-2" />
            Directions
          </a>
        </Button>
      </div>
    </div>
  );
}