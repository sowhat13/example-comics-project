<template>
    <nav class="navbar" :class="{ 'navbar-scroll': isScrolled }">
        <router-link to="/" class="logo">
            <img src="../assets/images/marvel-logo.png" alt="Logo"
                class="logo-img" />
        </router-link>



        <div class="right">
            <div class="searchbar-wrapper">
                <input type="text" class="searchbar" placeholder="Search" />
                <MagnifyingGlassCircleIcon class="icon" />
            </div>
            <Favorites />
            <div class="badge">
                <UserIcon class="icon" />
            </div>
        </div>
    </nav>
</template>
  
<script>

import { UserIcon, MagnifyingGlassCircleIcon } from '@heroicons/vue/24/solid';
import Favorites from './Favorites.vue';
export default {
    name: 'NavbarComponent',
    components: { UserIcon, Favorites, MagnifyingGlassCircleIcon },
    data() {
        return {
            isScrolled: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isScrolled = window.scrollY > 30;
        }
    },

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar {
    background-color: transparent;
    min-height: 60px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    gap: 8px;
    flex-wrap: wrap;
    transition: all 0.3s ease-in-out;
    position: fixed;

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: $green-color;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 12px;

        .logo-img {
            width: 50px;
            height: 50px;
            object-fit: contain;
        }
    }

    .right {
        margin-left: auto;
        display: flex;
        gap: 12px;
        align-items: center;



    }
}

.badge {
    background-color: $green-color;

    .icon {
        color: $primary-color;
    }
}

.searchbar-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background-color: $dark-color-light;
    padding: 4px 12px;
    margin-right: 80px;

    .searchbar {
        border: none;
        background-color: transparent;
        color: $light-color;
        font-size: 1rem;
        font-weight: 600;
        width: 200px;

        &:focus {
            outline: none;
        }

        @media (max-width: 768px) {
            width: 50px;

        }
    }

    @media (max-width: 768px) {
        margin-right: 0;

    }
}


.navbar-scroll {
    background-color: $dark-color-light;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .searchbar-wrapper {
        background-color: $dark-color;
    }
}
</style>
  