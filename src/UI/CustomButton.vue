<template>
  <div>
    <button class="button-menu">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "CustomButton"
}
</script>

<style scoped>
.button-menu {
  border-radius: 15px;
  width: 100%;
  background-color: #2c6eab;
  color: #FFF;
  font-family: MyriadPro-Bold;
  border: #2c6eab solid 0px;
  padding: 5px 30px 5px 30px;
  font-size: 18px;
  min-height: 60px;
  transition-property: all;
  transition: all ease 0.5s;
}

.button-menu:hover {
  background-color: #000;
  transition: 0.5s;
  cursor: pointer;
  -ms-transform: scale(1.05); /* IE 9 */
  -webkit-transform: scale(1.05); /* Safari 3-8 */
  transform: scale(1.05);
}
</style>