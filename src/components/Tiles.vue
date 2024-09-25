<template>
  <div>
    <div class="tiles d-flex justify-content-center align-items-center">
      <p class="m-0">
        Copyright © 2020-2024 Sean Huang.
        <br>All images and other content related to MapleStory are owned by Nexon Corporation.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tiles',
};
</script>

<style scoped lang="scss">
.tiles {
  height: 148px;
  background-image: url(../assets/images/OmegaSector-thick.png);
  background-repeat: repeat-x;
  z-index: 9;
  p {
    font-size: 14px;
    color: #fff;
    background: #332200;
    font-weight: bold;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.6);
    font-style: italic;
    text-align: center;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15);
    border-radius: 2px;
    border: 1px solid #221111;
    padding: 3px;
    width: 60%;
    opacity: 0.9;
  }
}
</style>
