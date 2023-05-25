<template>

    <div class="container mx-auto">

        <div class="flex w-full space-x-7">

            <div class="w-full">
                <div v-if="pending">
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-x-7 gap-y-12 mt-5 pb-20 px-5 md:px-0">
                        <div 
                        v-for="(pskeleton, idx) in skeletons"
                        :key="'prd_'+ idx"
                        >
                            <div class="aspect-w-2 aspect-h-3">
                                <div class="w-full h-full bg-gray-100"></div>
                            </div>
                            <div class="mt-2 w-full h-8 bg-gray-100"></div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-x-7 gap-y-12 mt-5 pb-20 px-5 md:px-0">
                        <FeatureProduct
                        v-for="(product, idx) in arrs"
                        :key="'prd_'+ idx"
                        :product="product"
                        ></FeatureProduct>
                    </div>

                    <div class="my-10 w-full mx-auto" v-if="isLoading == true">
                        <img src="/images/loading.gif" class="w-20 h-20 mx-auto flex" />

                    </div>

                    <!-- <div class="my-10 w-full">
                        <div class="flex space-x-4 mx-auto text-center w-fit">
                            <div 
                            v-for="(pg, idx) in pages"
                            :key="'page_'+ idx"
                            @click="clickPage(idx+1)" 
                            class="w-10 h-10 cursor-pointer"
                            :class="{
                                'text-white bg-black' : page == idx+1
                            }"
                            >{{ idx + 1 }}</div>
                        </div>
                    </div> -->

                </div>



            </div>
        </div>
    </div>

</template>

<script setup>

const route = useRoute();
console.log(route.fullPath)

let page = ref(1);
let isLoading = ref(false)
let skeletons = ref(Array(30))
let pages = ref(Array(5))
let arrs = ref([]);

const { pending, data: prodList } = await useLazyFetch( `/v1/prods/list10`, {
    method: 'GET',
    baseURL: 'https://rdev.the-relay.kr',
    headers: {'BrandDomain': 'kolon'},
    params: {
    //   offset: (route.query.page*30)-30,
    offset: (page.value*30)-30,
    limit:30,
    sub_brand:'',
    cat:'200000',
    grade:'',
    pr:'',
    order:'de'
    }
}); 
//   {
//     watch: [page]
//   }


watch(prodList, (newData) => {
    console.log(newData)
    arrs.value = newData.result.prodList;
});

function clickPage(selectPage) {

    page.value = selectPage;
    // const router = useRouter();
    // const route = useRoute();
    // router.push({ path:route.path, query: {
    //     ...route.query,
    //     page: selectPage
    // }});
    window.scrollTo(0,0);
}

async function getMoreData(el) {
    const scrollY = window.scrollY + window.innerHeight + 2;
    const bodyScroll = document.body.offsetHeight;

    if((scrollY >= bodyScroll) && isLoading.value == false ) {
        isLoading.value = true;

        page.value++;
        const { data, pending, error, refresh } = await useFetch(
            `/v1/prods/list10`, {
                method: 'GET',
                baseURL: 'https://rdev.the-relay.kr',
                headers: {'BrandDomain': 'kolon'},
                params: {
                    offset: (page.value*30)-30,
                    limit:30,
                    sub_brand:'',
                    cat:'200000',
                    grade:'',
                    pr:'',
                    order:'de'
                },
                onRequest({ request, options }) {
                    console.log('---------------')
                    console.log('pageValue,,,',page.value)
                },
                onResponse({ request, response, options }) {
                    console.log(response)
                    arrs.value = arrs.value.concat(response._data.result.prodList);
                    isLoading.value = false;
                },
                onResponseError({ request, response, options }) {
                }
            } 
        );

    }
}

onMounted(async () => {
    console.log('onMounted')

    window.addEventListener("scroll", getMoreData);
})


onBeforeUnmount(() => {
    console.log('onBeforeUnmount')
});

onUnmounted(() => {
    console.log('onUnmounted')
});

onActivated(() => {
    console.log('onActivated')
    window.addEventListener("scroll", getMoreData);
});

onDeactivated(() => {
    console.log('onDeactivated')
    window.removeEventListener('scroll',getMoreData);
});


</script>