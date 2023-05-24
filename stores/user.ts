import { defineStore } from "pinia"

export const useUserStore = defineStore('user', () => {

  const IS_LOGGED_IN = ref(false)
  const USER_ID = ref('');
  const ACCESS_TOKEN = ref('');
  const REFRESH_TOKEN = ref('');

  function login(
    id:string,
    accessToken:string,
    refreshToken:string
  ) {
    IS_LOGGED_IN.value = true
    USER_ID.value = id;
    ACCESS_TOKEN.value = accessToken;
    REFRESH_TOKEN.value = refreshToken;
  }

  function logout() {
    IS_LOGGED_IN.value = false
    USER_ID.value = '';
    ACCESS_TOKEN.value = '';
    REFRESH_TOKEN.value = '';

    console.log(IS_LOGGED_IN)
    console.log(IS_LOGGED_IN.value)
  }

  return { IS_LOGGED_IN,USER_ID,ACCESS_TOKEN,REFRESH_TOKEN, login, logout }
})