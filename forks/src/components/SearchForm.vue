<template>
  <div class="container">
    <div class="main-content">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder=":owner/:repository" aria-label=":owner/:repository" aria-describedby=":owner/:repository" v-model="repository">
        <div class="input-group-append">
          <button :disabled="!repository" class="btn btn-outline-secondary" type="button" @click="goRepoForks">Поиск</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Q from 'q';

@Component<SearchForm>({
  name: 'SearchForm',
  props: {
        SearchText: String,
    },
})

export default class SearchForm extends Vue {
  public readonly SearchText!: string;

  public repository: string = '';

  public async mounted() {
    const delayPromise = Q.delay(100);
    await delayPromise;
    if (this.SearchText) {
      this.repository = this.SearchText;
    }
  }

  public goRepoForks() {
    this.$router.replace({ name: 'Forks' , params: { repository: this.repository}});
    this.$router.go(0);
  }

}
</script>

<style scoped>
  .main-content {
    padding-top: 30px;
  }
</style>