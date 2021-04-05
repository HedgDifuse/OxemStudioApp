<template>
  <div class="text-input-container">
    <label>
      <input type="text" class="text-input-input" :placeholder="hint" @input="onEdit">
    </label>
    <img class="text-input-icon" src="../../assets/search.svg" alt="search_icon"/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'

@Options({
  props: {
    hint: String,
    text: String
  },
  emits: ['update:text']
})
export default class SearchTextInput extends Vue {
  hint: string = ""

  onEdit(event: InputEvent) {
    this.$emit('update:text', (event.target as HTMLInputElement).value)
  }
}
</script>

<style scoped>

</style>