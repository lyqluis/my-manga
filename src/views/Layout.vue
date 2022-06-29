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
    
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(5, 20%);
    grid-gap: 10px;
    justify-items: center;
    @media only screen and (max-width: 1024px) {
      width: 90%;
      grid-template-columns: repeat(4, 25%);
      @media only screen and (max-width: 800px) {
        width: 95%;
        grid-template-columns: repeat(3, 33.3%);
        @media only screen and (max-width: 500px) {
          width: 100%;
          grid-template-columns: repeat(2, 50%);
          @media only screen and (max-width: 300px) {
            grid-template-columns: repeat(1, 100%);
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
  }
}
</style>

