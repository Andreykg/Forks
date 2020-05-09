<template>
    <modal
        :name="name"
        @before-open="beforeOpen"
        class="fork-modal"
    >
        <div v-if="Object.keys(item).length !== 0">
            <div>
                <span class="data">Название</span>
                <span class="data">{{item.full_name}}</span>
            </div>
            <div>
                <span class="data">Владелец</span>
                <span class="data">{{item.owner.login}}</span>
            </div>
            <div>
                <span class="data">Звездность</span>
                <span class="data">{{item.stargazers_count}}</span>
            </div>
        </div>
        <div class="buttons-row">
            <button type="button" class="btn btn-secondary" @click="hide">Закрыть</button>
            <button type="button" class="btn btn-success" @click="add(item)">Добавить</button>
        </div>
    </modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {ForkInterface} from '@/models/ForkInterface';

@Component<FavoriteForksModal>({
    props: {
        name: String,
    },
})
export default class FavoriteForksModal extends Vue {
    protected readonly name!: string;
    public item: ForkInterface = {
        id: '',
        full_name: '',
        owner: {
            login: '',
        },
        stargazers_count: 0,
        url: '',
        isFavorite: false,
    };

    public beforeOpen(event: any) {
        if (event.params) {
            this.item = event.params.data;
        }
    }
    public hide() {
        this.$modal.hide(this.name);
    }
    public add(item: ForkInterface) {
        const idsString = localStorage.getItem('favorite');
        if (idsString) {
                var existingItemArray = idsString.split(',');
                const res = existingItemArray.find((x) => x === item.id);
                if (!res) {
                existingItemArray.push(item.id);
                localStorage.setItem('favorite', existingItemArray.toString());
            }
        } else {
            let ids = [];
            ids.push(item.id);
            localStorage.setItem('favorite', ids.toString());
        }
        this.hide();
        this.$emit('addFavoriteId', item.id);
    }
}
</script>

<style  scoped>
    span.data {
        width: 50%;
        color: #FFFFFF;
        display: inline-block;
    }
    .buttons-row {
        padding-top: 30px;
        padding-bottom: 30px;
        text-align: center;
    }
    button {
        margin: 0 15px;
    }
</style>