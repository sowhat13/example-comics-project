<template>
    <div class="favorites">
        <div class="badge" @click="isFavoritesList = !isFavoritesList">
            <transition name="bounce">
                <span class="badge-number" v-if="showLength">{{ favorites.length }}</span>
            </transition>
            <HeartIcon class="icon" />
        </div>
        <transition name="slide-fade">

            <div class="favorites-wrapper" v-if="isFavoritesList">

                <div class="favorites-title">
                    <small>
                        ({{ favorites.length }})
                    </small>
                    <h1 class="title">

                        Favorites</h1>
                    <div class="close" @click="isFavoritesList = !isFavoritesList">
                        <XMarkIcon class="icon" />
                    </div>
                </div>

                <TransitionGroup class="favorites-list" tag="ul" name="slide-fade">

                    <li class="favorite" v-for="favorite in favorites" :key="favorite.id">
                        <div class="badge" @click="unfav(favorite)">
                            <HeartIcon class="icon" />
                        </div>
                        <img :src="favorite.image" :alt="favorite.title" class="favorite-image" />
                        <span @click="goToDetails(favorite.id)" class="favorite-title">{{ favorite.title }}</span>
                    </li>
                </TransitionGroup>
            </div>
        </transition>
    </div>
</template>
  
<script>
// @ is an alias to /src
import { HeartIcon, XMarkIcon } from '@heroicons/vue/24/solid';
export default {
    name: 'FavoritesView',
    data() {
        return {
            showLength: false,
            isFavoritesList: false
        }
    },
    computed: {
        favorites() {
            return this.$store.getters.favorites
        },
    },
    watch: {
        favorites: {
            deep: true,
            immediate: true,
            handler() {
                this.showLength = false
                setTimeout(() => {
                    this.showLength = true
                }, 100);
            }
        }
    },
    methods: {
        unfav(fav) {
            this.$store.dispatch('removeFromFavorites', fav)
        },
        goToDetails(id) {
            this.$router.push({ path: 'comics' + '/' + id })
        }
    },
    components: {
        HeartIcon, XMarkIcon
    }
}
</script>
  
<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";


.badge {
    background-color: $green-color;
    position: relative;

    .icon {
        color: $primary-color;
    }

    .badge-number {
        color: $primary-color;
        font-size: 12px;
        font-weight: 600;
        margin-right: 5px;
        position: absolute;
        top: -8px;
        right: -8px;
        background: $accent-color;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $light-color ;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    }

}

@keyframes bounce-in {
    0% {
        transform: scale(0.5);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

.bounce-enter,
.bounce-leave-to {
    opacity: 0;
    transform: scale(0.5);

}

.favorites-wrapper {
    position: absolute;
    top: 60px;
    right: 10px;
    z-index: 100;
    width: 300px;
    height: 600px;
    max-height: calc(100vh - 120px);
    max-width: calc(100vw - 40px);
    background-color: $primary-color;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px $dark-color;
    overflow: hidden;
    border: 5px solid $primary-color;

    .favorites-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background-color: rgba(0, 0, 0, 0.3);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 60px;
        border-radius: 12px;

        small{
            font-size: 0.8rem;
            font-weight: 600;
            color: $light-color;
            display: flex;
            width: 20%;
            justify-content: center;

        }
        .title {
            font-size: 1.5rem;
            font-weight: 600;
            color: $light-color;
            display: flex;
            width: 60%;
            justify-content: center;
        }

        .close {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            display: flex;
            width: 20%;
            justify-content: center;

            .icon {
                width: 24px !important;
                height: 24px !important;
                min-width: 24px;
                min-height: 24px;
                color: $light-color;
            }

            &:hover {
                .icon {
                    color: $accent-color;
                }
            }
        }
    }

    .favorites-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        padding-bottom: 80px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;

        .favorite {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border-radius: 10px;
            background-color: $dark-color-light;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease-in-out;
            cursor: pointer;

            &:hover {
                background-color: $dark-color;
            }

            .favorite-image {
                width: 50px !important;
                height: 50px !important;
                min-width: 50px;
                min-height: 50px;
                object-fit: cover;
                border-radius: 10px;
            }

            .favorite-title {
                font-size: 1rem;
                font-weight: 600;
                color: $text-color;
                @include ellipsisLine(2);

                &:hover {
                    color: $accent-color;
                }
            }

            .badge {
                width: 20px !important;
                height: 20px !important;
                min-width: 20px;
                min-height: 20px;
                background: $green-color;

                .icon {
                    width: 14px !important;
                    height: 14px !important;
                    min-width: 14px;
                    min-height: 14px;
                    color: $red-color;
                }

                &:hover {
                    .icon {
                        color: $dark-color !important;
                    }
                }
            }
        }
    }
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100%);
}
</style>