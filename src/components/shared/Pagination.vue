<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': !childPaginations.has_pre}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getCurrentPage(childPaginations.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in childPaginations.total_pages"
          :key="page"
          :class="{'active': childPaginations.current_page === page}"
        >
          <a class="page-link" href="#" @click.prevent="getCurrentPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !childPaginations.has_next}">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getCurrentPage(childPaginations.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    childPaginations: {
      type: Object,
    },
  },
  methods: {
    getCurrentPage(page) {
      this.$emit('changeCurrentPage', page);
    },
  },
};
</script>

<style scoped lang='scss'>
.pagination {
  & > li > a {
    background-color: white;
    color: #c1170c;
  }
  & > li > a:focus,
  & > li > span:focus,
  & > li > span:hover {
    color: #fff;
    background-color: #eee;
    border-color: #ddd;
  }
  & > li > a:hover {
    color: #c1170c;
    background-color: #eee;
    border-color: #ddd;
  }
  & > .active > a {
    color: #fff;
    background-color: #c1170c !important;
    border: solid 1px #c1170c !important;
  }
  & > .active > a:hover {
    color: #fff;
    background-color: #c1170c !important;
    border: solid 1px #c1170c;
  }
}
</style>
