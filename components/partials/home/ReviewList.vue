<template>
    <section class="w-full mb-0 md:mb-12">
        <div class="w-full container mx-auto px-0">
            <div class="w-full flex justify-between items-end mb-5 px-5 md:px-0">
                <h2 class="m-subhead-1-b md:display-1-b text-black">고객 리뷰</h2>

                <!-- <nuxt-link :to="'/sales_reviews'" @click="goToAll">
                    <h5 class="cursor-pointer m-body-2-b md:body-2-b text-coolgray-400 my-auto"><u>전체보기</u></h5>
                </nuxt-link> -->
                
            </div>

            <div 
            id="scrollLeft"
            class="w-screen max-w-md md:max-w-none md:w-full flex space-x-5 overflow-x-scroll md:overflow-x-hidden px-5 md:px-0"
            >
                <div
                v-for="(ReviewDTO,index) in reviewList"
                :key="index"
                class="w-40 md:w-1/6"
                >
                    <FeatureReview
                    :reviewDTO="ReviewDTO"
                    ></FeatureReview>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const { isMobileOrTablet } = useDevice();

const props = defineProps({
    reviewList:{
        type: [Array]
    }
})

onMounted(() => {
    document.getElementById('scrollLeft').scrollLeft += 80;
});

</script>