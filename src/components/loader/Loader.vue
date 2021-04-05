<template>
  <div class="loader-container">
    <svg class="loader" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <g>
        <ellipse ry="25" rx="25" cy="30" cx="30" stroke-width="5" stroke="#fff" fill="none"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.loader-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.loader ellipse {
  stroke-dasharray:10, 9999;
  -webkit-animation:load 2s cubic-bezier(0.8,0.25,0.25,0.9) infinite, spin 2s linear infinite;
  -webkit-transform-origin:center;
}

@-webkit-keyframes load {
  50% {
    stroke-dasharray:140;
    stroke-dashoffset:0;
    -webkit-transform:rotateZ(0deg);
  }
  100% {
    stroke-dasharray:146;
    stroke-dashoffset:-156;
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform:rotateZ(360deg);
  }
}
</style>