<template>
  <div class="parent">
    <div style="width: 500px; height: 300px">
      <LMap
        id="map"
        ref="mapRef"
        :zoom="zoom"
        :center="center"
        @click="handleMapClick"
      >
        <LTileLayer
          url="http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="markerLatLng" v-if="markerLatLng" />
      </LMap>
    </div>
    <div class="box">
      <p v-if="loading">در حال بارگذاری</p>
      <p v-else-if="address">{{ address }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMapStore } from "../store/map";

const mapStore = useMapStore();

const address = ref("");
const markerLatLng = ref(null);
const loading = ref(false);

let center = [36.8394, 54.4344];
const zoom = 16;

const handleMapClick = async (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  console.log(lat, lng);

  loading.value = true;

  try {
    const response = await fetch(
      `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
      {
        method: "GET",
        headers: {
          "Api-Key": "service.22dda51fbcf6451c85bfd77e96f6face",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      address.value = data.formatted_address;
    } else {
      console.error("Failed to fetch address:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching address:", error);
  } finally {
    loading.value = false;
  }

  markerLatLng.value = [lat, lng];
  center = [lat, lng];
};
</script>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box {
  width: 500px;
  height: 100px;
  margin-top: 15px;
  border: 1px solid rgb(163, 163, 163);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
