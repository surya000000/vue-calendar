<template>
  <div>
    <div v-for="field in fields" :key="field.name">
      <form>
        <component :is="inputComponent(field.type)" @change="e => inputChange(field, e)"/>
        <Button type="submit">
          Save
        </Button>
      </form>
    </div>
  </div>
</template>
<script>
import Select from '@/components/_base-select';
import Input from '@/components/_base-input';
import Button from '@/components/_base-button';

const fieldsMapped = {
  text: Input,
  number: Input,
}

export default {
  components: {
    Input,
    Select,
    Button,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    }
  },
  computed: {

  },
  methods: {
    inputChange(field, e) {
      this.$emit("inputChange", e.target.value);
    },
    inputComponent(fieldType) {
      return fieldsMapped[fieldType];
    }
  }

}
</script>
