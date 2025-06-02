<script setup lang="ts">

import {ref, watch} from 'vue'; 

const props = defineProps(['initialFilter'])
const emit = defineEmits(['statusFilter'])

const statusFilter = ref(props.initialFilter);

const updateFilter = () => {
    emit('statusFilter', statusFilter);
}

// To update the local variable when parent variable changes
watch(() => props.initialFilter, (newValue, oldValue)=> {
    statusFilter.value = newValue;
});

</script>

<template>
    <label for="status">Status</label>
    <select @change="updateFilter" name="status" v-model="statusFilter" class="border px-2 py-1 rounded">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
    </select>
</template>
