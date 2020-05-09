<template>
    <div id="app">
        <div>
            <router-view :key="$route.path" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'AppLayout',
    mounted() {
        var idsString = localStorage.getItem('favorite');
        if(idsString) {
            this.$store.commit('SaveFavoriteForkIds', idsString.split(','));
        } 
    },
    methods: {},
    beforeCreate() {}
};
</script>
