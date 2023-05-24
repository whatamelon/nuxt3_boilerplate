<template>
    <div class="flex justify-between bg-white text-gray-800 h-14 text-xl container mx-auto">
        <a href="/" class="my-auto cursor-pointer">home</a>

        <div class="flex space-x-4">
            <nuxt-link to="/product_list" class="my-auto cursor-pointer">구매하기</nuxt-link>

            <nuxt-link v-if="store.IS_LOGGED_IN == false" to="/login" class="my-auto">시작하기</nuxt-link>
            <div v-else class="flex space-x-4">
                <b @click="logout" class="my-auto cursor-pointer">로그아웃</b>
                <b class="my-auto">{{ store.USER_ID }}</b>
            </div>
        </div>
    </div>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useUserStore } from "~/stores/user";
const store = useUserStore();
const { IS_LOGGED_IN } = storeToRefs(store);


async function logout() {
    const { data, pending, error, refresh } = await useFetch(
        `/v3/users/signout`, {
            method: 'POST',
            baseURL: 'https://rdev.the-relay.kr',
            headers: {
                'BrandDomain': 'kolon',
                'Authorization': 'Bearer '+ store.ACCESS_TOKEN,
                'RefreshToken': 'Bearer '+ store.REFRESH_TOKEN,
            },
            onResponse({ request, response, options }) {
                console.log(response)
                store.logout()
            },
            onResponseError({ request, response, options }) {
            }
        } 
    );
}

</script>