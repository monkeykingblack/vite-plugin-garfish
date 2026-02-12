<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  entry: { type: String, required: true },
});

const containerId = computed(() => "sub-app-" + props.name);
</script>

<template>
  <div :id="containerId" />
</template>
