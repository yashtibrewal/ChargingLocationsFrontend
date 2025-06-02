<script setup>

import { reactive, ref } from 'vue';
import PointStatus from './PointStatus.vue'
import ConnectorType from './ConnectorType.vue'
import PowerOutput from './PowerOutput.vue'
import { useAuthStore } from '../store/auth'

const { token } = useAuthStore();

const props = defineProps(['point', 'page']);
const emit = defineEmits('goToListPage');

let point;
let statusFilter;
let powerFilter;
let connectorFilter;
if (props.page === 'editPage') {
    point = props.point;
    statusFilter = ref(point.status);
    powerFilter = ref(point.power_output);
    connectorFilter = ref(point.connector_type);
} else {
    point = reactive({
        location: {}
    });
    statusFilter = ref('all');
    powerFilter = ref('all');
    connectorFilter = ref('all');
}


function resetFields() {
    statusFilter.value = 'all';
    powerFilter.value = 'all';
    connectorFilter.value = 'all';
    point.name = "";
    point.location = { latitude: "", longitude: "" };
}

function validateInputs() {
    const { latitude, longitude } = point.location;

    if (!point.name || point.name.length < 3 || point.name.length > 50) {
        alert("Name is required and must be at least 3 characters or more then 50.");
        return;
    }
    if (statusFilter.value === 'all') {
        alert("Please select an option in status.");
        return;
    }
    if (connectorFilter.value === 'all') {
        alert("Please select an option in connector type.");
        return;
    }
    if (powerFilter.value === 'all') {
        alert("Please select an option in power output.");
        return;
    }
    if (
        !latitude || !longitude ||
        latitude < -90 || latitude > 90 ||
        longitude < -180 || longitude > 180
    ) {
        alert("Latitude must be between -90 and 90, and longitude between -180 and 180.");
        return;
    }
    return true;
}

async function callAddPointAPI() {
    if (!validateInputs()) {
        return;
    }
    const url = import.meta.env.VITE_BACKEND_URL;
    await fetch(`${url}/charging-locations`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: point.name,
            location: point.location,
            status: statusFilter.value,
            power_output: powerFilter.value,
            connector_type: connectorFilter.value
        })
    })
    alert('Charging Location Created successfully');
    resetFields();
    emit('goToListPage')
}

async function callUpdatePointAPI() {
    if (!validateInputs()) {
        return;
    }
    const url = import.meta.env.VITE_BACKEND_URL;
    await fetch(`${url}/charging-locations`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            _id: point._id,
            name: point.name,
            location: point.location,
            status: statusFilter.value,
            power_output: powerFilter.value,
            connector_type: connectorFilter.value
        })
    })
    alert('Charging Location Updated successfully');
    resetFields();
    emit('goToListPage')
}

</script>


<template>
    <div class="flex flex-col space-y-5 items-center py-6">

        <h1 v-if="page === 'addPage'" class="text-3xl font-bold mb-6 text-center text-amber-700">Add Charging Location
        </h1>
        <h1 v-if="page === 'editPage'" class="text-3xl font-bold mb-6 text-center text-amber-700">Edit Charging Location
        </h1>


        <div class="flex flex-col space-y-5">
            <div class="flex space-x-5">
                <label for="name">Name</label>
                <input title="Name must be 3-50 characters." required minlength="3" maxlength="50" type="text"
                    class="border border-black rounded" name="name" v-model="point.name" />
            </div>
            <div class=" flex space-x-5 items-center">
                <PointStatus @statusFilter="(data) => statusFilter = data.value" :initialFilter="statusFilter" />
            </div>
            <div class="flex space-x-5 items-center">
                <PowerOutput @powerFilter="(data) => powerFilter = data.value" :initialFilter="powerFilter" />
            </div>
            <div class="flex space-x-5 items-center">
                <ConnectorType @connectorFilter="(data) => connectorFilter = data.value"
                    :initialFilter="connectorFilter" />
            </div>
            <div>
                <div>Location</div>
                <div class="flex space-x-5 my-5 ml-5">
                    <label for="latitude">Latitude</label>
                    <input type="number" class="border border-black rounded" name="latitude"
                        v-model="point.location.latitude" :min="-90" :max="90" step="0.000001" required />
                </div>
                <div class="flex space-x-5 my-5 ml-5">
                    <label for="longitude">Longitude</label>
                    <input type="number" class="border border-black rounded" name="longitude"
                        v-model="point.location.longitude" :min="-180" :max="180" step="0.000001" required />
                </div>

            </div>
        </div>
        <button v-if="page === 'addPage'" @click="callAddPointAPI()"
            class="bg-blue-600 rounded-xl px-4 py-2 text-white border-2 border-blue-950 cursor-pointer hover:shadow-2xl">Add
            Charging Point</button>
        <button v-if="page === 'editPage'" @click="callUpdatePointAPI()"
            class="bg-blue-600 rounded-xl px-4 py-2 text-white border-2 border-blue-950 cursor-pointer hover:shadow-2xl">Update
            Charging Point</button>
    </div>
</template>