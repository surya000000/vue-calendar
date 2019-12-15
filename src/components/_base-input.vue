<template>
  <input @input="$emit('change')" v-bind="$attrs" />
</template>
<script>
export default {

}
</script>
