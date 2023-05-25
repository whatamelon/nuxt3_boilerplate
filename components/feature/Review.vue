<template>
    <div class="w-40 md:w-full" style="break-inside: avoid" >
        <div 
        v-show="reviewDTO.reviewType == 'b' && reviewDTO.imgs != 'none'"
        class="aspect-w-1 aspect-h-1 w-full"
        >
            <img :src="reviewDTO.imgs.split(',')[0]" class="w-full h-full rounded-xl cursor-pointer object-cover" />
            <p v-show="reviewDTO.imgs.split(',').length > 1" class="m-subhead-1-b md:body-2-b text-white absolute bottom-auto left-auto w-fit h-fit" style="top:83%; right: 6%;">{{ reviewDTO.imgs.split(',').length }}</p>
        </div>
        
        <div v-show="reviewDTO.reviewType == 'b'" class="rounded px-1 mt-2.5 bg-green-600 m-caption-b md:caption-b text-white w-fit">구매</div>
        <div v-show="reviewDTO.reviewType == 's'" class="rounded px-1 bg-orange-500 m-caption-b md:caption-b text-white w-fit">판매</div>
        <div class="flex justify-between pt-2.5 pb-2">
            <div class="flex">
                <i 
                v-for="idx in parseInt(reviewDTO.starPoint)"
                :key="idx"
                class="ri-star-fill"
                :class="{ 
                    'text-green-600' : reviewDTO.reviewType == 'b' ,
                    'text-orange-500' : reviewDTO.reviewType == 's' 
                }"
                ></i>
                <p class="m-body-1-b md:body2-b text-coolgray-900 pl-1 my-auto">{{ reviewDTO.starPoint }}</p>
            </div>
        </div>

        <div 
        @click="toggleTextMore"
        class="inline-block mb-2 w-full"
        >
            <p 
            :class="{
                'line-clamp-5': showAllText == false,
                'line-clamp-15': showAllText == true,
                'cursor-pointer':reviewDTO.msg.length > 80
            }"
            class="m-body-1-r body-1-r text-coolgray-700"
            >{{ reviewBody }} </p>
            <i 
            v-if="reviewDTO.msg.length > 80 && showAllText == false" 
            class="ri-arrow-down-s-line ri-lg text-right justify-end flex"></i>
            
        </div>
         
        <div class="flex justify-between">
            <p class="m-body-1-r md:body-1-r text-coolgray-400 w-1/2">{{ date }}</p>
            <p class="m-body-1-r md:body-1-r text-coolgray-400 w-1/2 text-right">{{ reviewDTO.userName }}</p>
        </div>
    </div>
</template>

<script setup>

let showAllText = ref(false)
let reviewBody = ref('')

const props = defineProps({
    reviewDTO:{
        type: [Object]
    }
})
const date = useDate(props.reviewDTO.reviewDate)


onBeforeMount(() => {
    if(props.reviewDTO.msg.length > 80) {
        reviewBody = props.reviewDTO.msg.slice(0,80) + '...';
    } else {
        reviewBody = props.reviewDTO.msg;
    }
})


function toggleTextMore() {
    /// origin body가 80이하인애들 처리 안하는 로직 만들기
    if(props.reviewDTO.msg.length > 80) {
        if(showAllText == true) {
            showAllText = false;
            reviewBody = props.reviewDTO.msg.slice(0,80) + '...';
        } else {
            showAllText = true;
            reviewBody = props.reviewDTO.msg;
        }
    }
}

</script>