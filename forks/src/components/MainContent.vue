<template>
  <div class="container">
    <div class="main-content">
      <h1>Привет дорогой пользователь!</h1>
      <div>
        <input type="text">
          <button>Поиск</button>
        </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component<MainContent>({
    props: {},
})
export default class MainContent extends Vue {

}
</script>

<style scoped>
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
  .main-content {
    text-align: center;
  }
</style>