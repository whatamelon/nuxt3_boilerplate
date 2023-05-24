<template>
    <div class="container max-w-md mt-40 mx-auto">
        <h2>로그인</h2>
        <div class="space-y-4 flex flex-col mt-8">
            <input type="text" placeholder="이메일" v-model="id" class="form-input
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "/>
            <input type="password" placeholder="비밀번호" v-model="password" class="form-input
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "/>
        </div>

        <button
        @click="login"
        class="rounded bg-gray-800 text-white text-center w-full py-3 mt-4"
        >시작하기</button>
    </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

let id = ref('');
let password = ref('');

const store = useUserStore();
const router = useRouter();

async function login() {
    console.log(id.value, password.value)

    if(id.value != '' && password.value != '') {
        const { data, pending, error, refresh } = await useFetch(
            `/v3/users/signin31`, {
                method: 'POST',
                baseURL: 'https://rdev.the-relay.kr',
                headers: {
                    'BrandDomain': 'kolon'
                },
                body:{
                    snsType: 'email',
                    relayId: id.value,
                    relayPw: password.value
                },
                onResponse({ request, response, options }) {
                    console.log(response)
                    store.login(
                        response._data.result.userType,
                        response._data.result.accessToken,
                        response._data.result.refreshToken
                    )
                    router.push('/');
                },
                onResponseError({ request, response, options }) {
                }
            } 
        );
    }

    
}

</script>