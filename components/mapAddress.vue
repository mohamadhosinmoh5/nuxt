<template>
  <div class="parent">
    <div style="width: 500px; height: 300px">
      <LMap
        id="map"
        ref="mapRef"
        :zoom="16"
        :center="[36.8394, 54.4344]"
        @click="handleMapClick(this)"
      >
        <LTileLayer
          url="http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />

        <l-circle-marker
          :lat-lng="[36.8394, 54.4344]"
          :radius="10"
          color="red"
        />
        <l-marker :lat-lng="[36.8394, 54.4344]"> </l-marker>
      </LMap>
    </div>
    <div class="box">
      <p v-if="address">{{ address }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMapStore } from "../store/map";

const mapStore = useMapStore();

const address = ref(null);

const handleMapClick = async (event) => {
console.log(event);
  const {} = await useFetch(
    `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
    {
      method: "get",
      headers: {
        "Api-Key": "service.22dda51fbcf6451c85bfd77e96f6face",
      },
    }
  );
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
