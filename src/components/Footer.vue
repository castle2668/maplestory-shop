<template>
  <div>
    <footer class="bg-white pt-5 mt-md-5">
      <div class="container-fluid container-lg pt-5">
        <div class="position-relative pt-1">
          <img
            src="../assets/images/people.png"
            width="560px"
            class="position-absolute people-lg d-none d-md-block"
            style="bottom: -2px; right: 0;"
          />
          <img
            src="../assets/images/GIFs/mushroom.gif"
            width="70px"
            class="position-absolute d-md-none"
            style="bottom: -2px; right: 0px;"
          />
          <img
            src="../assets/images/GIFs/mushroom2.gif"
            width="70px"
            class="position-absolute d-md-none"
            style="bottom: -2px; left: 150px;"
          />
          <img
            src="../assets/images/roger.png"
            width="70px"
            class="position-absolute"
            style="bottom: -2px; left: 80px;"
          />
          <img
            src="../assets/images/mary.png"
            width="70px"
            class="position-absolute"
            style="bottom: -2px; left: 0px;"
          />
        </div>
      </div>
      <Tiles></Tiles>
    </footer>
  </div>
</template>

<script>
import Tiles from './Tiles.vue';

export default {
  name: 'Footer',
  components: {
    Tiles,
  },
};
</script>

<style scoped lang='scss'>
footer {
  .people-lg {
    @media (min-width: 800px) {
      width: 601px;
    }
  }
}
</style>
