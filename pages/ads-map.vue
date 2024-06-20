<template>
    <div style="padding: 3%;" class="container-fluid">
        <p class="text-center">انتخاب محدوده آگهی روی نقشه</p>
        <p class="text-center">موقعیت دقیق مکان در لیست آگهی ها نمایش داده نخواهد شد</p>

        <div class="row">
            <div class="col-sm-6">
                <div class="adseMapBoxe">
                    <l-map id="map" ref="mapRef" :zoom="16" :center="[36.841658, 54.432422]" @click="fetchAddressData">
                        <l-tile-layer url="http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors" />
                        <l-circle-marker v-if="markerPosition" :lat-lng="markerPosition" :radius="10" color="red" />
                        <l-marker v-if="markerPosition" :lat-lng="markerPosition">
                            <l-popup>
                                {{ markerPosition }}
                            </l-popup>
                        </l-marker>
                    </l-map>
                </div>
            </div>
            <div class="col-sm-6 ">
                <div class="col-sm-12 DetailesMap text-right p-2">گلستان گرگان</div>
                <div class="col-sm-12 adseMap text-start">
                    {{ MapAddress?.address }}
                </div>
                <!-- Add other address fields as needed -->
                <!-- <p>{{ addressData.address }}</p>
                                <p>{{ addressData.address_compact }}</p>
                                <p>{{ addressData.city }}</p>
                                <p>{{ addressData.country }}</p>
                                <p>{{ addressData.county }}</p>
                                <p>{{ addressData.geom.coordinates.join(', ') }}</p> -->
                <div class="col-sm-12 DetailesMap">
                    <button style="padding: 10px; position: relative; width: 200px; color: white;"
                        class="btn btn-success mt-5">
                        <a style="text-decoration: none; color: white;" href="/drag-drop">بعدی</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';

const markerPosition = ref(null);
const addressText = ref('');
const MapAddress = ref(null);

// const addressData = ref({
//     address: "",
//     address_compact: "",
//     city: "",
//     country: "",
//     county: "",
//     district: "",
//     geom: { type: "", coordinates: [] },
//     last: "",
//     name: "",
//     neighbourhood: "",
//     plaque: "",
//     poi: "",
//     postal_address: "",
//     postal_code: "",
//     primary: "",
//     province: "",
//     region: "",
//     rural_district: "",
//     village: ""
// });


const fetchAddressData = async (event) => {
    const { lat, lng } = event.latlng;
    markerPosition.value = [lat, lng];

    const { data, pending, error: errors, refresh } = await useFetch(`https://map.ir/reverse/no?lon=${lng}&lat=${lat}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIzMDgxNzVmM2IwYjFmY2YyMjEzOGM0MDJlNzNkYWY4N2YyN2M0YWRmYWZiZTJlMWM1MjExNmRlN2M4ZjczNmY5NDQ2NjRiOTE0ZGY5ZDQyIn0.eyJhdWQiOiIyNzU0NCIsImp0aSI6IjIzMDgxNzVmM2IwYjFmY2YyMjEzOGM0MDJlNzNkYWY4N2YyN2M0YWRmYWZiZTJlMWM1MjExNmRlN2M4ZjczNmY5NDQ2NjRiOTE0ZGY5ZDQyIiwiaWF0IjoxNzE2ODg1MDE0LCJuYmYiOjE3MTY4ODUwMTQsImV4cCI6MTcxOTQ3NzAxNCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.cbwf2DFueiMUUgHR2sXGBG0z66TSOcrSgyfb2L-pV52SzNL-92Yy3jiDvJuRk8rV1gBH_e4GsXEinwHyQeFqCfEPc8nMdVIgPdtRzaYK3qereMRBJG6mirX8I-4b8sJ7m81_GmgHhULfjd_FGXnTjOhNgN9AFviOP0d1PJSBYQ26xtRSMtmThc-memZZSsKNf7_kudwaTxg0W_YjZmNDimdJ8ke_PcAAQEoyhIo-RECP2Db_RyWJOfGzmA16DaOaZonCG3Hs5dpQvbKSZ4xi6OZkX0dtMYpEeCd16fy9WnGClS0uRpB1z7U2mOFDkFSeUUKtn9wnb8qqo00Ntr7tCw',
        }
    });

    if (data) {
        console.log(data.value)
        MapAddress.value = data.value;

    } else {
        // alert('Failed to submit the form.');
    }

};

onMounted(() => {
    fetchAddressData();
});

// const markerPosition = ref(null);
const onMapClick = (event) => {
    markerPosition.value = event.latlng;
};

const submit = () => {
    // Your submit logic here
    alert(`Submitting location: ${addressText.value}`);
};
</script>

<style scoped>
.maps {
    width: 300px;
    height: 300px;
    position: relative;
    right: 42%;
}

.addresBox {
    width: 200px;
    height: 100px;
    border: 1px solid black;
    position: relative;
    right: 43%;
}
</style>