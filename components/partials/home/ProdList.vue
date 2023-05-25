<template>
    <section class="w-full container pb-24 px-5 md:px-0 mt-12 mx-auto">
        <div class="w-full flex justify-between items-end">
            <h2 class="m-subhead-1-b md:display-1-b text-black">OLO RELAY 추천 상품</h2>
        </div>

            <div class="grid grid-cols-2 md:grid-cols-6 gap-x-4 md:gap-x-7 gap-y-12 mt-6">
                <FeatureProduct
                v-for="(prod, idx) in prodList.length > 12 ? prodList.splice(0,12) : prodList"
                :key="'home_sugg_prod_'+idx"
                :product="prod"
                ></FeatureProduct>
            </div>
    </section>
</template>

<script setup>
const props = defineProps({
    prodList:{
        type: [Array]
    }
})

</script>