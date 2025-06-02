import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePointsStore = defineStore('chargingPoints', () => {

    const chargingPoints = ref([]);

    const setChargingPoints = (newPoints) => {
        chargingPoints.value = newPoints
    }

    return { chargingPoints, setChargingPoints }
})