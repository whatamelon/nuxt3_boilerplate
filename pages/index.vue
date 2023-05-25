<template>
    <div class="space-y-10">
      <PartialsHomeTopBanner
        :topBanners="home.result.topBanners"
      ></PartialsHomeTopBanner>

      <PartialsHomeReviewList
          :reviewList="home.result.reviewList"
      ></PartialsHomeReviewList>

      <PartialsHomeProdList
          :prodList="home.result.prodList"
      ></PartialsHomeProdList>
    </div>

</template>

<script setup>
const { data: home, error } = await useAsyncData(
  'home',
  () => $fetch( `/v1/homes/list21`, {
    method: 'GET',
    baseURL: 'https://rdev.the-relay.kr',
    headers: {'BrandDomain': 'kolon'}
  } )
);
</script>