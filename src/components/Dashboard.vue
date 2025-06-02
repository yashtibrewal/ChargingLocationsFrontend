<script setup>

import ChargingList from './ChargingList.vue';
import AddOrEditChargingPoint from './AddOrEditChargingPoint.vue';
import { reactive, ref } from 'vue';
import MapView from './MapView.vue';

const page = ref('listPage');
let point = reactive({});

function goToEdit(chargingPoint) {
    page.value = 'editPage'
    point = chargingPoint;
}

function goToListPage() {
    page.value = 'listPage';
}

</script>

<template>
    <nav class="flex space-x-5 p-5 m-5 border-b-4 border-amber-200">
        <div @click="page = 'listPage'" class="cursor-pointer" :class="{ 'font-bold underline': page === 'listPage' }">
            List Points
        </div>
        <div @click="page = 'addPage'" class="cursor-pointer" :class="{ 'font-bold underline': page === 'addPage' }">
            Add Point
        </div>
        <div @click="page = 'mapPage'" class="cursor-pointer" :class="{ 'font-bold underline': page === 'mapPage' }">
            Map
        </div>
    </nav>

    <div class="mt-4">
        <ChargingList @goToEdit="(data) => goToEdit(data)" @goToAddNewPoint="page = 'addPage'"
            v-if="page === 'listPage'" />
        <AddOrEditChargingPoint v-if="page === 'addPage' || page === 'editPage'" :page="page" :point="point"
            @goToListPage="goToListPage" />
        <MapView v-if="page === 'mapPage'"></MapView>

    </div>
</template>