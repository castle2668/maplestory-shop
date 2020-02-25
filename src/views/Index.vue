<template>
  <div>
    <div class="banner d-flex justify-content-center align-items-center">
      <h3 class="text-center">
        <div>回到最初的感動…</div>
        <div class="typing">我在冒險的起點等你！</div>
      </h3>
    </div>

    <section class="about-us container py-5 text-center">
      <h2 class="font-weight-bolder mb-3 pb-2">ABOUT US</h2>
      <p class="h4 pb-2">MapleStory Shop</p>
      <div class="row justify-content-center pb-3">
        <div class="col-10 col-lg-6">
          <p class="mb-0">
            在楓之谷世界中，打倒怪物後繼續前進是生存的唯一方式。
            MapleStory Shop 提供您冒險時所需要的裝備，有了這些裝備，在執行任務時不管是怪物還是 BOSS 都能像切菜一樣輕鬆地打倒。
          </p>
        </div>
      </div>
      <router-link to="/category" class="text-maple text-decoration-none">進入商城</router-link>
    </section>

    <section class="best-seller pt-5 pb-4">
      <div class="container pb-5 text-center">
        <h2 class="font-weight-bolder mb-4 pb-2">最受歡迎的商品</h2>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <swiper :options="swiperOption1" ref="mySwiper" v-if="products.length > 0">
              <swiper-slide class="py-3" v-for="item in hotProducts" :key="item.id">
                <div class="card border h-100">
                  <div class="border-bottom">
                    <span class="badge float-right badge-danger">熱銷商品</span>
                    <figure
                      class="mt-4 mb-4 item-image"
                      :style="{backgroundImage: `url(${item.imageUrl})`}"
                    ></figure>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title text-center">
                      <a href="#" class="text-dark font-weight-bold">{{ item.title }}</a>
                    </h4>
                    <p class="card-text text-secondary text-center">{{ item.content }}</p>
                    <div class="d-flex justify-content-center align-items-end">
                      <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}</div>
                      <del
                        class="h6 text-secondary pr-1"
                        v-if="item.price"
                      >{{ item.origin_price | currency }}</del>
                      <div
                        class="h5 text-maple font-weight-bold"
                        v-if="item.price"
                      >{{ item.price | currency }}</div>
                    </div>
                  </div>
                  <div class="card-footer d-flex bg-white border-0 pt-0 flex-md-column flex-xl-row">
                    <router-link
                      :to="`/detail/${item.id}`"
                      class="btn btn-outline-secondary btn-xl-sm w-100 mr-2"
                    >查看更多</router-link>
                    <button
                      type="button"
                      class="btn btn-outline-maple btn-xl-sm ml-auto w-100 mt-md-2 mt-xl-0"
                      @click="addToCart(item.id)"
                    >立即購買</button>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="swiper-pagination swp1" slot="pagination"></div>
      </div>
    </section>

    <section class="comment pt-5">
      <div class="container text-center">
        <h2 class="font-weight-bolder mb-4 pb-2">看看其他人怎麼說</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="npc npc1 ml-auto mr-auto mb-3"></div>
            <div class="h5">上班族阿凱</div>
            <p
              class="mb-3 mb-md-0"
            >在我還沒發現 MapleStory Shop 之前，我下班後還得自己花時間找資料。多虧了這裡有各式各樣的裝備與詳細的介紹，讓我省下許多時間並且購買到想要的裝備。</p>
          </div>
          <div class="col-md-4">
            <div class="npc npc2 ml-auto mr-auto mb-3"></div>
            <div class="h5">大學生悠娜</div>
            <p class="mb-3 mb-md-0">
              男友找我一起玩楓之谷，但是他平常都要上班，所以我總是一個人解任務。
              購買 MapleStory Shop 的裝備後，我練等的速度加快許多，不只提升我的遊戲體驗，也讓我找到一群好朋友交流哩。
            </p>
          </div>
          <div class="col-md-4">
            <div class="npc npc3 ml-auto mr-auto mb-3"></div>
            <div class="h5">高中生奈蘿</div>
            <p class="mb-3 mb-md-0">
              每天下課回到家的第一件事就是玩楓之谷，可是我每次都打不過任務裡的 BOSS。但是自從我買了 MapleStory Shop 推薦的裝備之後，打起怪來就像切菜一樣輕鬆了呢！
            </p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center no-gutters">
        <div class="col-10 text-center">
          <router-link to="/category" class="btn btn-maple d-block d-md-inline-block
          py-2 px-md-5 py-md-3 font-weight-bold rounded-0">查看所有商品</router-link>
        </div>
      </div>
    </section>

    <section class="job-swiper py-5 mt-3 mb-5 text-center">
      <h2 class="font-weight-bolder mb-3 pb-2">各職業展示</h2>
      <p class="h4">我們為不同的職業提供裝備上的選擇。</p>
      <div class="swiper-container pt-4">
        <div class="swiper-wrapper">
          <swiper :options="swiperOption2" ref="mySwiper">
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/beginner.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/sword.png" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/warrior.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/knight.png" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/thief-male.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/thief.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/thief2.png" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/magician.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/wizard.png" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/archer-male.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide">
                <img src="../assets/images/Job/archer.jpg" class="img-fluid" alt />
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="swiper-button-prev swp2"></div>
        <div class="swiper-button-next swp2"></div>
      </div>
      <div class="swiper-pagination swp2" slot="pagination"></div>
    </section>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'Index',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption1: {
        initialSlide: 0,
        direction: 'horizontal',
        speed: 800,
        grabCursor: true,
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination.swp1',
          clickable: true,
          type: 'bullets',
        },
        navigation: {
          nextEl: '.swiper-button-next.swp1',
          prevEl: '.swiper-button-prev.swp1',
        },
        breakpoints: {
          544: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          991: {
            slidesPerView: 3,
            centeredSlides: true,
          },
        },
      },
      swiperOption2: {
        initialSlide: 0,
        direction: 'horizontal',
        speed: 800,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 4,
        loop: true,
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          544: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          767: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          991: {
            slidesPerView: 3,
            centeredSlides: true,
          },
          1023: {
            slidesPerView: 4,
            centeredSlides: false,
          },
        },
        pagination: {
          el: '.swiper-pagination.swp2',
          clickable: true,
          type: 'bullets',
        },
        navigation: {
          nextEl: '.swiper-button-next.swp2',
          prevEl: '.swiper-button-prev.swp2',
        },
      },
      products: [],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$store.dispatch('updateLoading', true);
      const cart = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart }).then((response) => {
        if (response.data.message === '已加入購物車') {
          vm.$bus.$emit('message:push', '產品加入購物車成功', 'success');
          vm.$bus.$emit('cartCreate:push');
          vm.$store.dispatch('updateLoading', false);
          vm.$router.push('/customerOrder');
        } else if (response.data.message === '加入購物車有誤') {
          vm.$store.dispatch('updateLoading', false);
          vm.$bus.$emit('message:push', 'Oops！出現錯誤了！', 'danger');
        } else {
          vm.$store.dispatch('updateLoading', false);
          vm.$bus.$emit('message:push', 'Oops！出現錯誤了！', 'danger');
        }
      });
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    hotProducts() {
      const vm = this;
      return vm.products.filter((item) => item.category === '熱銷商品');
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scope lang="scss">
.loading-image {
  background-image: url(../assets/images/GIFs/KingSlime.gif);
  background-size: cover;
  width: 219px;
  height: 230px;
}

.banner {
  background-image: url(../assets/images/Banner/pocket.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  height: 30vh;
  @media (min-width: 992px) {
    height: 50vh;
  }
  h3 {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.55);
    padding: 10px;
    border-radius: 10px;
    width: 300px;
    min-height: 90px;
    max-height: 100%;
    div{
      line-height: 1.4;
    }
    .typing {
      width: 10em;
      white-space: nowrap;
      border-right: 2px solid transparent;
      animation: typing 3.5s steps(10, end), blink-caret 0.75s step-end infinite;
      overflow: hidden;
      letter-spacing: 0;
    }
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 10em;
      }
    }
    @keyframes blink-caret {
      from,
      to {
        box-shadow: 2px 0 0 0 transparent;
      }
      50% {
        box-shadow: 2px 0 0 0;
      }
    }
  }
}

.about-us {
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
}

.best-seller {
  background-color: #ededed;
  .container {
    position: relative;
    h2 {
      display: inline-block;
      font-weight: 600;
      border-bottom: 3px solid #c1170c;
    }
    .swiper-slide {
      height: auto;
      .card {
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
        .badge {
          font-size: 14px;
          padding: 5px 8px;
          margin-right: 4px;
          margin-top: 4px;
        }
        figure.item-image {
          height: 120px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          @media (max-width: 576px) {
            height: 100px;
          }
        }
        .card-text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .btn-xl-sm {
          @media (min-width: 1200px) {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            line-height: 1.5;
            border-radius: 0.2rem;
            font-size: 16px;
          }
        }
      }
    }
    .swiper-pagination {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .swiper-pagination-bullet {
        width: 16px;
        height: 16px;
        background-color: #c1170c;
        margin-left: 8px;
        margin-right: 8px;
      }
    }
  }
}

.comment {
  background-color: #ededed;
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
  .npc {
    background: #f8f9fa;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .npc1 {
    background-image: url(../assets/images/npc1.png);
  }
  .npc2 {
    background-image: url(../assets/images/npc2.png);
  }
  .npc3 {
    background-image: url(../assets/images/npc3.png);
  }
  .row .btn {
    position: relative;
    transform: translateY(50%);
    z-index: 9;
    font-size: 24px;
    @media (max-width: 767px) {
      font-size: 20px;
    }
  }
}

.job-swiper {
  position: relative;
  h2 {
    display: inline-block;
    font-weight: 600;
    border-bottom: 3px solid #c1170c;
  }
  .swiper-container {
    width: 100%;
    .slide img {
      height: 250px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      outline: none;
    }
  }
  .swiper-pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      background-color: #c1170c;
      margin-left: 8px;
      margin-right: 8px;
      @media (max-width: 767px) {
        margin-left: 4px;
        margin-right: 4px;
      }
    }
  }
}
</style>
