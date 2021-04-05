<template>
  <div class="error-container">
    <p class="error-label error-text">{{label}}</p>
    <button class="error-refresh material-container error-text" @click="onRetry()">Повторить</button>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'

@Options({
  props: {
    label: String,
    onRetry: Function
  }
})
export default class ErrorLabel extends Vue {

}
</script>

<style scoped>
.error-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.error-label {
  margin-bottom: 25px!important;
}

.error-text {
  color: white;
  margin: 2px;
  font-size: 20px;
}
</style>