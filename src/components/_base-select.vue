<template>
  <select v-on="$listeners" >
    <option v-for="item in items" :key="item.value || item" :selected="$attrs.value === (item.value || item)">
      {{ item.label || item }}
    </option>
  </select>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  }
}
</script>
