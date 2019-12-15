<template>
  <div>
    <button type="submit" v-on="$listeners">
      <slot />
    </button>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'submit',
    }
  }
}
</script>
