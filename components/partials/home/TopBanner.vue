<template>
    <div>
        <Swiper
          :height="300"
          :modules="[SwiperAutoplay, SwiperEffectFade]"
          :slides-per-view="1"
          :loop="true"
          :effect="'fade'"
          :fadeEffect="{
            crossFade: true
          }"
          :autoplay="{
            delay: 10000
          }"
        >
          <SwiperSlide
            v-for="(topb, idx) in topBanners"
            :key="idx"
          >
          <div
            class="w-full md:w-screen bg-cover aspect-w-1 aspect-h-1 md:aspect-w-3 md:aspect-h-1"
            :style="bannerBgImg(topb.imgLinkM, topb.imgLink)"
          >

              <div class="w-screen md:flex">
                  <div class="w-full mx-auto md:max-w-5xl px-5 md:px-0 md:my-auto absolute bottom-16 md:bottom-0 md:relative">
                      <h3 
                      :style="bannerTxtColor(topb.titleColor)"
                      class="w-full md:w-1/2 m-display-3-b md:display-6-b line-clamp-3 whitespace-pre"
                      >{{ topb.titleTxt }}</h3>
                      <p 
                      :style="bannerTxtColor(topb.bodyColor)"
                      class="w-full md:w-1/2 m-body-2-r md:display-1-r mt-2.5 md:mt-5 line-clamp-3 whitespace-pre"
                      >{{ topb.bodyTxt }}</p>
                  </div>
              </div>
          </div>
            <!-- <img :src="topb.imgLink" class="h-full w-full object-cover"/> -->
          </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup>
const { isMobileOrTablet } = useDevice();

const props = defineProps({
    topBanners:{
        type: [Array]
    }
})

function bannerTxtColor(colorCode) {
    return {
        color: '#'+colorCode.slice(0,6)
    };
}

function bannerBgImg(imgM, img) {
    if(isMobileOrTablet == true) {
        return {
            backgroundImage: 'url('+ imgM +')',
            backgroundPosition: '50% 50%'
        }
    } else {
        return {
            backgroundImage: 'url('+ img +')',
            backgroundPosition: '50% 50%'
        }
    }
}
</script>