<template>
    <nuxt-link
    :to="'/product/'+product.prodId"
    >
        <div 
        class="aspect-w-2 aspect-h-3 relative"
        >
            <img 
            :src="product.imgLink" 
            class="w-full h-full object-center object-cover"
            />
            
            <i v-if="product.heartFlag == 'n'" @click.prevent="addToFavor" class="ri-heart-line ri-xl absolute top-3 right-2 left-auto w-fit h-fit"></i>
            <i v-else @click.prevent="deleteToFavor" class="ri-heart-fill ri-xl absolute top-3 right-2 left-auto w-fit h-fit"></i>

        </div>
        <p class="pt-2 line-clamp-2 break-all">{{ product.prodId }}</p>
        <p class="pt-2 line-clamp-2 break-all">{{ product.name }}</p>
    </nuxt-link>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const store = useUserStore();

const props = defineProps({
    product:{
        type: [Object]
    }
})


async function addToFavor() {
    if(store.IS_LOGGED_IN == false) {
        alert('로그인해주세요.')
    } else {
        const { data, pending, error, refresh } = await useFetch(
            `/v1/prods/heart/${props.product.prodId}`, {
                method: 'POST',
                baseURL: 'https://rdev.the-relay.kr',
                headers: {
                    'BrandDomain': 'kolon',
                    'Authorization': 'Bearer '+ store.ACCESS_TOKEN,
                    'RefreshToken': 'Bearer '+ store.REFRESH_TOKEN,
                },
                onResponse({ request, response, options }) {
                    console.log(response)
                    if(response.status == 200) {
                        props.product.heartFlag = 'y';
                        alert('찜했습니다.')
                    }
                },
                onResponseError({ request, response, options }) {
                    console.log(response)
                }
            } 
        );
    }
}


async function deleteToFavor() {
    if(store.IS_LOGGED_IN == false) {
        alert('로그인해주세요.')
    } else {
        const { data, pending, error, refresh } = await useFetch(
            `/v1/prods/heart/${props.product.prodId}`, {
                method: 'DELETE',
                baseURL: 'https://rdev.the-relay.kr',
                headers: {
                    'BrandDomain': 'kolon',
                    'Authorization': 'Bearer '+ store.ACCESS_TOKEN,
                    'RefreshToken': 'Bearer '+ store.REFRESH_TOKEN,
                },
                onResponse({ request, response, options }) {
                    console.log(response)
                    if(response.status == 200) {
                        props.product.heartFlag = 'n';
                        alert('찜을 취소했습니다.')
                    }
                },
                onResponseError({ request, response, options }) {
                    console.log(response)
                }
            } 
        );
    }
}
</script>