<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps(['initialFilter']);
const emit = defineEmits(['connectorFilter']);

const connectorFilter = ref(props.initialFilter);

const updateFilter = () => {
	emit('connectorFilter', connectorFilter);
};

watch(() => props.initialFilter, (newValue) => {
	connectorFilter.value = newValue;
})

</script>


<template>
	<label for="connector_type">Connector Type</label>
	<select @change="updateFilter" name="connector_type" v-model="connectorFilter" class="border px-2 py-1 rounded">
		<option value="all">All</option>
		<option value="type_1">Type 1</option>
		<option value="type_2">Type 2</option>
		<option value="CCS_1">CSS 1</option>
		<option value="CSS_2">CSS 2</option>
		<option value="Tesla">Tesla</option>
	</select>
</template>
