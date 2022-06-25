<script setup>
</script>

<template>
  <div class="layout">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="center">
      <slot> </slot>
    </div>
    <div class="footer">
      <slot name="footer">footer</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  .header {
    height: 40px;
    width: 100%;
  }
  .center {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    // flex-flow: row wrap;
    flex-wrap: wrap;
    @media only screen and (max-width: 400px) {
      width: 100%;
    }
  }
  .footer {
    width: 100%;
  }
}
</style>

