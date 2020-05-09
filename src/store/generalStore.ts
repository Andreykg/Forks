import Vuex, { StoreOptions } from 'vuex';

export interface GeneralState {
  favoriteForkIds: string[];
}

const storeState: GeneralState = {
  favoriteForkIds: [],
};
export const generalStore: StoreOptions<GeneralState> = {
  state: storeState,
  getters: {
    GetFavoriteForkIds: (state) => {
      return state.favoriteForkIds;
    },
  },
  mutations: {
    SaveFavoriteForkIds: (state, data) => {
      state.favoriteForkIds = data;
    },
    AddFavoriteForkId: (state, data: string) => {
      state.favoriteForkIds.push(String(data));
    },
  },
  actions: {},
};


