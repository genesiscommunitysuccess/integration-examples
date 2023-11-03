<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  title: String
});

const exampleTextField = ref('');

const onClick = () => {
  console.log(exampleTextField.value);
};

const setValue = (event) => {
  exampleTextField.value = event.target.value;
}
</script>


<template>
  <alpha-card>
    <h2>{{ props.title }}</h2>
    <alpha-text-field placeholder="Enter Some Text" @input="setValue" :value="exampleTextField"></alpha-text-field>
    <alpha-button appearance="accent" @click="onClick">Click Me</alpha-button>
  </alpha-card>
</template>

<style scoped>
alpha-card {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

alpha-text-field {
  margin-bottom: 12px;
}

h2 {
  font-size: var(--type-ramp-plus-5-font-size);
  line-height: var(--type-ramp-plus-5-line-height);
}

alpha-card > alpha-button {
  align-self: flex-end;
}
</style>
