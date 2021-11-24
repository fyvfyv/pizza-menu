<template>
  <button
    type="button"
    class="button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">

import {Component} from 'vue-property-decorator';
import Vue from 'vue';

@Component({})
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  box-sizing: border-box;
  display: inline-flex;
  border: none;
  border-radius: 0.5rem;
  line-height: 1;
  font-weight: 500;
  font-size: 1.25rem;
  color: #ffffff;
  margin: 0;
  outline: none;
  padding: 0.5rem 0.75rem;
  position: relative;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #FF6900;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #e86100;
  }

  &:active {
    background-color: #ff6900;
    color: #ffa566;
  }
}
</style>
