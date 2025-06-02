<script setup>

import { ref, watch } from "vue";
import { useAuthStore } from '../store/auth'
import { usePointsStore } from '../store/chargingPoints'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import ConnectorType from './ConnectorType.vue'
import PowerOutput from './PowerOutput.vue'
import PointStatus from './PointStatus.vue'

// To store filtered or unfiltered points for viewing
const chargingPoints = ref([]);
// To store all the points recieved from API
const fetchedChargingPoints = ref([]);
const { token } = useAuthStore();
const { setChargingPoints } = usePointsStore();
const router = useRouter()
const statusFilter = ref('all');
const powerFilter = ref('all');
const connectorFilter = ref('all');

const emit = defineEmits(['goToEdit']);


const getAllChargingLocations = async () => {
    try {
        const url = import.meta.env.VITE_BACKEND_URL
        const response = await fetch(`${url}/charging-locations`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const jsonResponse = await response.json();
        chargingPoints.value = jsonResponse.data;
        fetchedChargingPoints.value = [...chargingPoints.value];
        setChargingPoints(chargingPoints.value);

    } catch (error) {
        console.error(error.message);
    }
}

onBeforeMount(() => {
    if (!token) {
        router.push("/");
    } else {
        getAllChargingLocations();
    }
});

function editPoint(point) {
    emit('goToEdit', point);
}

function deletePoint(point) {
    async function callDeletePointAPI() {
        if (confirm('Delete Charging Location?')) {
            const url = import.meta.env.VITE_BACKEND_URL;
            await fetch(`${url}/charging-locations`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({
                    _id: point._id
                })
            })
            getAllChargingLocations()
        }
    }
    callDeletePointAPI();
}

function filterData() {
    chargingPoints.value = fetchedChargingPoints.value.filter(item => {
        return (
            (statusFilter.value === 'all' || item.status === statusFilter.value) &&
            (powerFilter.value === 'all' || item.power_output === powerFilter.value) &&
            (connectorFilter.value === 'all' || item.connector_type === connectorFilter.value)
        );
    });
}


watch(statusFilter, () => {
    filterData();
});
watch(powerFilter, () => {
    filterData();
});
watch(connectorFilter, () => {
    filterData();
});

</script>
<template>

    <div class="max-w-6xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold mb-6 text-center text-amber-700">Charging Locations</h1>
        <div class="flex flex-wrap space-x-5">
            <div class="mb-4 flex space-x-5 items-center">
                <PointStatus @statusFilter="(data) => statusFilter = data.value" :initialFilter="statusFilter" />
            </div>
            <div class="mb-4 flex space-x-5 items-center">
                <PowerOutput @powerFilter="(data) => powerFilter = data.value" :initialFilter="powerFilter" />
            </div>
            <div class="mb-4 flex space-x-5 items-center">
                <ConnectorType @connectorFilter="(data) => connectorFilter = data.value"
                    :initialFilter="connectorFilter" />
            </div>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(point, index) in chargingPoints" :key="index"
                class="bg-white shadow-md rounded-2xl p-5 border-4 border-amber-300 ">
                <div class="flex justify-between items-center mb-2 text-sm text-gray-500">
                    <span>#{{ index + 1 }}</span>
                    <span class="space-x-2">
                        <span @click="editPoint(point)"
                            class="bg-yellow-300 px-2 py-1 border-2 border-yellow-950 rounded cursor-pointer">Edit</span>
                        <span @click="deletePoint(point)"
                            class="bg-red-300 px-2 py-1 border-2 border-yellow-950 rounded cursor-pointer">Delete</span>
                    </span>
                </div>

                <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ point.name }}</h2>

                <div class="text-sm text-gray-600 space-y-2">
                    <p><span class="font-medium">Power Output:</span> {{ point.power_output }}</p>
                    <p><span class="font-medium">Connector Type:</span> {{ point.connector_type }}</p>
                    <p>
                        <span class="font-medium">Location:</span>
                        {{ point.location.latitude }}, {{ point.location.longitude }}
                    </p>
                    <span class="capitalize px-2 py-1 rounded-lg text-lg font-semibold" :class="{
                        'bg-gray-200': point.status === 'inactive',
                        'bg-green-200': point.status === 'active'
                    }">
                        {{ point.status }}
                    </span>
                </div>
            </div>
            <div @click="$emit('goToAddNewPoint')" class="border-4 border-amber-300 rounded-4xl p-5">
                Add new Point
            </div>
        </div>
    </div>
</template>