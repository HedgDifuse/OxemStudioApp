<template>
  <div class="paginator-container">
    <button class="paginator-prev material-container paginator-button" @click="backward"
            :class="{ 'paginator-button-unactive': currentPage === minPage }">
      <img src="../../assets/backward.svg" alt="backward_icon">
    </button>
    <div class="paginator-value material-container paginator-button">
      <p class="paginator-value">{{currentPage + 1}}</p>
    </div>
    <button class="paginator-prev material-container paginator-button" @click="forward"
            :class="{ 'paginator-button-unactive': currentPage === maxPage }">
      <img src="../../assets/forward.svg" alt="forward_icon">
    </button>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'

@Options({
  props: {
    currentPage: Number,
    minPage: Number,
    maxPage: Number
  },
  emits: ['update:currentPage']
})
export default class Paginator extends Vue {
  currentPage: number = 0
  minPage: number = 0
  maxPage: number = 0

  forward() {
    if(this.currentPage + 1 <= this.maxPage) {
      this.$emit('update:currentPage', this.currentPage+1)
    }
  }

  backward() {
    if(this.currentPage - 1 >= this.minPage) {
      this.$emit('update:currentPage', this.currentPage-1)
    }
  }
}
</script>

<style scoped>
.paginator-container {
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
}

.paginator-value {
  color: white;
  margin: 2px;
  font-size: 20px;
}

.paginator-button {
  display: inline-block;
}

.paginator-button-unactive {
  opacity: 0.5;
  pointer-events: none;
}
</style>