<template>
    <div class="card-wrapper" @click="goToDetails()">

        <div class="card" :class="[type, loading ? 'shiny-element' : '']">
            <div class="card-image unselectable">
                <img v-if="image" loading="lazy" :src="image" alt="Card Image" />
                <div v-else class="card-image"></div>
            </div>
            <div class="card-content" :class="visibleContent ? 'visible-content' : ''">
                <span class="card-title"  v-if="title">
                    {{ title }}
                </span>
            </div>
            <div v-if="isFavable" class="favorite-wrapper">
                <div class="favorite" v-if="favorite" @click.stop="favIt(1)">
                    <SolidHeartIcon class="icon heart-icon" />
                </div>
                <div class="favorite" @click.stop="favIt(2)" v-else-if="!favorite">
                    <OutlineHeartIcon class="icon" />
                </div>
            </div>
            <div class="shiner"></div>
        </div>

    </div>
</template>

<script>
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid';


export default {
    name: 'CardComponent',
    data() {
        return {
            isHovered: false
        };
    },
    computed: {
        favorite() {
            return this.$store.getters.isFavorite(this.id)
        }
    },
    methods: {
        favIt(type) {
            if (!this.id) return console.error('No id provided')
            if (type == 1) {
                this.$store.dispatch('removeFromFavorites', { id: this.id, title: this.title, image: this.image })
            } else {
                this.$store.dispatch('addToFavorites', { id: this.id, title: this.title, image: this.image })
            }
        },
        goToDetails() {
            if (this.noclick) return
            this.$router.push({ path: 'comics' + '/' + this.id })
        }
    },
    props: {
        type: {
            type: String,
            required: true,
            default: 'regular'
        },
        image: {
            required: false,
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },

        isFavable: {
            type: Boolean,
            required: true,
            default: true
        },
        title: {
            type: String,
            required: false,
        },
        id: {
            required: false,
        },
        noclick: {
            type: Boolean,
            required: false,
            default: false
        },
        visibleContent: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {
        OutlineHeartIcon,
        SolidHeartIcon
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

.card-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
}

.card {
    display: flex;
    flex-direction: column;
    gap: 12px;

    border-radius: 8px;
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    position: relative;
    cursor: pointer;

    &:hover {
        @extend .card-hovered;
    }

    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;

    .card-content {
        position: absolute;
        bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 8px;
        opacity: 0;
        transition: all 0.3s ease-in-out;

        .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: $light-color;
            text-shadow: 0 0 2px rgba(0, 0, 0, 1);
            text-align: center;
            @include ellipsisLine(2);
        }
    }
    .visible-content{
        opacity: 1;
        .card-title{
            @include ellipsisLine(4);
        }
    }
    .card-image {
        width: 100%;
        height: 100%;
        min-height: 100%;
        background: $primary-gradient;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .favorite-wrapper {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;

        .favorite {
            background-color: $background-color;
            border-radius: 50%;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
            }

            .icon {
                width: 20px;
                height: 20px;
                color: $green-color;
            }
        }
    }
}

.card-hovered {
    transform: rotate3d(0, 1, 0, 18deg) scale(1.1);
    z-index: 40;
    box-shadow: $accent-color -2px 2px 0px 1px, -3px 3px 8px 5px $accent-color-50 ;

    .card-content {
        opacity: 1;
        transform: translateY(-10px);
    }

    .shiner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2) 60%, transparent);
        animation: shine-bottom 5s forwards;
        background-size: 300% 300%;
    }
}

.card-hovered2 {
    transform: rotate3d(0, 1, 0, 18deg) scale(1.1);
    z-index: 40;
    box-shadow: $green-color -2px 2px 0px 1px, -3px 3px 8px 5px $green-color-50 ;

    .card-content {
        opacity: 1;
        transform: translateY(-10px);
    }


    .shiner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 40%, rgba(251, 255, 197, 0.3) 60%, transparent);
        animation: shine-bottom 5s infinite forwards;
        background-size: 100% 300%;
    }
}

</style>