import Vue from 'vue';
import Vuex from 'vuex';
import { generalStore } from './generalStore';

Vue.use(Vuex);

export default new Vuex.Store(generalStore);
