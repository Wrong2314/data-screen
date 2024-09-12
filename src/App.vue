<template>
  <router-view></router-view>
</template>
<script setup>
  import { useDataStore } from "@/store/dataStore.js";

  const store = useDataStore();
  store.initMockData();
</script>
