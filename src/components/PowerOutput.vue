<script setup>

import {ref, watch} from 'vue'; 

const props = defineProps(['initialFilter'])
const emit = defineEmits(['powerFilter'])

const powerFilter = ref(props.initialFilter);

const updateFilter = () => {
  emit('powerFilter', powerFilter);
};

// To update the local variable when parent variable changes
watch(() => props.initialFilter, (newValue, oldValue)=> {
    powerFilter.value = newValue;
});

</script>

<template>
    <label for="power">Power Output</label>
    <select @change="updateFilter" name="power" v-model="powerFilter" class="border px-2 py-1 rounded">
        <option value="all">All</option>
        <option value="DC">D.C.</option>
        <option value="AC">A.C.</option>
    </select>
</template>
