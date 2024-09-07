<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
  import { useDataStore } from "./store/dataStore";

  const store = useDataStore();
  store.initMockData();
</script>
