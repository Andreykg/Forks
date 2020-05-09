<template>
  <div class="home">
    <SearchForm :SearchText="Repository" />
    <div v-show="loadingFinish">
      <div class="container" v-if="resultExist">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Владелец</th>
              <th scope="col">Звездность</th>
              <th scope="col">Ссылка</th>
              <th scope="col">Избранные</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fork,index) in paginatedForks" v-bind:key="index">
              <td>{{fork.full_name}}</td>
              <td>{{fork.owner.login}}</td>
              <td>{{fork.stargazers_count}}</td>
              <td>
                <button type="button" class="btn btn-link">
                  <a target="_blank" :href="fork.url">Link</a>
                </button>
              </td>
              <td>
                <img
                  style="height: 28px; width: 28px"
                  v-show="fork.isFavorite"
                  src="@/assets/img/check-mark.svg"
                  alt
                />
              </td>
              <td>
                <button @click="openForkModal(fork)" type="button" class="btn btn-primary">Добавить</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="text-align: center">
          <button
            type="button"
            class="btn btn-info"
            @click="prevPage"
            :disabled="pageNumber==0"
          >Previous</button>
          <span style="padding: 0 10px">{{pageNumber + 1}}</span>
          <button
            type="button"
            class="btn btn-info"
            @click="nextPage"
            :disabled="pageNumber >= (pageCount - 1)"
          >Next</button>
        </div>
      </div>
      <div style="text-align:center" v-else>Нету результатов</div>
    </div>
    <FavoriteForksModal @addFavoriteId="addFavoriteId" name="FavoriteForksModal" />
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SearchForm from "@/components/SearchForm.vue";
import axios from "axios";
import swal from "sweetalert2";
import Q from "q";
import FavoriteForksModal from "@/modals/FavoriteForksModal.vue";
import { mapGetters } from "vuex";
import { ForkInterface } from "@/models/ForkInterface";

@Component<Forks>({
  components: {
    SearchForm,
    FavoriteForksModal
  },
  computed: {
    resultExist() {
      return this.forks.length > 0;
    },
    pageCount() {
      const l = this.forks.length;
      const s = this.size;
      return Math.ceil(l / s);
    },
    paginatedForks() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.forks.slice(start, end);
    },
    ...mapGetters({
      favoriteForkIds: "GetFavoriteForkIds"
    })
  }
})
export default class Forks extends Vue {
  public readonly favoriteForkIds!: string[];
  public forks: ForkInterface[] = [];
  public loadingFinish: boolean = false;

  public Owner: string = "";
  public Repository: string = "";
  public pageNumber: number = 0;
  public size: number = 10;

  public async mounted() {
    swal.showLoading();
    const delayPromise = Q.delay(1300);
    const parameters = this.$route.params;
    this.Repository = parameters.repository;

    const arrayOfStrings = this.Repository.split("/");
    try {
      await this.SearchForks(
        arrayOfStrings[0].replace(":", "").trim(),
        arrayOfStrings[1].replace(":", "").trim()
      );
    } catch (error) {}

    if (parameters.page && parseInt(parameters.page, 10)) {
      const pageNum = parseInt(parameters.page, 10);
      if (pageNum > 0) {
        this.pageNumber = parseInt(parameters.page, 10) - 1;
      }
    }
    await delayPromise;
    if (this.forks.length > 0) {
      this.forks.forEach((fork: ForkInterface) => {
        const idExistInFavorite = this.favoriteForkIds.find(
          x => String(x) === String(fork.id)
        );
        if (idExistInFavorite) {
          fork.isFavorite = true;
        }
      });
    }
    swal.close();
    this.loadingFinish = true;
  }

  public async SearchForks(owner: string, repoName: string) {
    const self = this;
    const path = owner + "/" + repoName + "/forks";
    fetch("https://api.github.com/repos/" + path)
      .then(response => response.json())
      .then(
        (forks: ForkInterface[]) =>
          (this.forks =
            forks.length > 0
              ? forks.map((x: ForkInterface) => {
                  return {
                    full_name: x.full_name,
                    id: x.id,
                    owner: {
                      login: x.owner.login
                    },
                    stargazers_count: x.stargazers_count,
                    url: x.url,
                    isFavorite: false
                  };
                })
              : [])
      );
  }

  public nextPage() {
    this.pageNumber++;
  }

  public prevPage() {
    this.pageNumber--;
  }

  public openForkModal(fork: ForkInterface) {
    this.$modal.show("FavoriteForksModal", {
      data: fork
    });
  }

  public addFavoriteId(id: string) {
    const exist = this.favoriteForkIds.find(x => x === id);
    if (!exist) {
      this.$store.commit("AddFavoriteForkId", id);
      const fork = this.forks.find(x => String(x.id) === String(id));
      if (fork) {
        fork.isFavorite = true;
      }
    }
  }
}
</script>
