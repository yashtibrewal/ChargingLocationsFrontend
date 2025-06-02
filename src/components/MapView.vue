<script setup>
import { GoogleMap, AdvancedMarker, Marker, InfoWindow } from 'vue3-google-map'
import { reactive, ref } from "vue";
import { usePointsStore } from '../store/chargingPoints';

const { chargingPoints } = usePointsStore();

const API_KEY = import.meta.env.VITE_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

const isInfoWindowOpen = ref(false);
const center = reactive({
    latitude: 0,
    longitude: 0,
})

console.log('map view loaded')

function getMarkerOptions(point) {
    return {
        position: { lat: point.location.latitude, lng: point.location.longitude },
        title: point.name
    }
}

function calcCenter() {
    let x = 0, y = 0;

    for (let chargingPoint of chargingPoints) {
        x += chargingPoint.location.latitude;
        y += chargingPoint.location.longitude;
    }
    x = x / chargingPoints.length;
    y = y / chargingPoints.length
    return {
        lat: x,
        lng: y
    }
}

</script>

<template>
    <h1 class="text-3xl font-bold mb-6 text-center text-amber-700">Map View</h1>
    <GoogleMap :api-key="API_KEY" :mapId="MAP_ID" style="width: 100%; height: 500px" :center="calcCenter()" :zoom="2">
        <Marker :options="getMarkerOptions(point)" @click="isInfoWindowOpen = true"
            v-for="(point, index) in chargingPoints" :key="point._id">
            <InfoWindow class="flex flex-col space-y-2 min-w-24"
                :position="{ lat: point.location.latitude, lng: point.location.longitude }" :open="isInfoWindowOpen">
                <h1 class="font-bold">{{ point.name }}</h1>
                <div>{{ point.power_output }}</div>
                <div>{{ point.connector_type }}</div>
                <div class="p-1 rounded text-white" :class="{
                    'bg-green-500': point.status.toLowerCase() === 'active',
                    'bg-gray-500': point.status.toLowerCase() !== 'active'
                }">{{ point.status }}</div>
            </InfoWindow>
        </Marker>
    </GoogleMap>
</template>