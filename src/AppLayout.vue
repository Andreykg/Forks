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
        const idsString = localStorage.getItem('favorite');
        if (idsString) {
            this.$store.commit('SaveFavoriteForkIds', idsString.split(','));
        }
    },
};
</script>
