<template>
  <div class="home container">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <p class="hello" v-if="show">Привет дорогой пользователь!</p>
    </transition>
    <span>Пример: :owner/:repositoryName.</span>
    <div>:apache/:spark</div>
    <div>:Microsoft/:vscode</div>
    <div>:rust-lang/:rust</div>
    <SearchForm />
  </div>
</template>

<script>

import SearchForm from '@/components/SearchForm.vue';

export default {
  data() {
    return {
      show: false
    }
  },
  name: 'Home',
  components: {
    SearchForm,
  },
  mounted() {
    this.show = true;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.hello {
    text-align: center;
    font-size: 25px;

}
</style>