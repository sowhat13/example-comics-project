<template>
    <div class="swiper-outter">
        <h1 v-if="title" class="swiper-title gradient-text bg-primary-gradient">
            {{ title }}
        </h1>
        <div class="swiper-wrapper" :class="type">
            <div class="blank" v-if="!loading && items.length == 0">
                Could not find anything 😔
            </div>

            <swiper-container class="swiper-cont" :space-between="spaceBetween" :slides-per-view="(windowWidth / 240)"
                @progress="onProgress" :rewind="loop ? true : false" @slidechange="onSlideChange" v-else-if="!loading">
                <swiper-slide class="swiper-sl" v-for="item in items" :key="item.id">
                    <Card :noclick="noclick" :visibleContent="visibleContent" :isFavable="isFavable" :id="item.id" :image="item?.thumbnail?.path ? item?.thumbnail?.path + '.' + item?.thumbnail?.extension : ''" :type="type" :title="item?.title ? item?.title : item?.name ? item?.name : ''" />
                </swiper-slide>
            </swiper-container>
            <swiper-container class="swiper-cont" v-else :space-between="spaceBetween"
                :slides-per-view="(windowWidth / 240)" @progress="onProgress" @slidechange="onSlideChange">
                <swiper-slide class="swiper-sl" v-for="item in limit" :key="item">
                    <Card :isFavable="isFavable" loading :type="type" />
                </swiper-slide>
            </swiper-container>

        </div>
    </div>
</template>
  
<script>
import { register } from 'swiper/element/bundle';
import Card from '@/components/Card.vue'

register();

export default {
    data() {
        return {
            spaceBetween: 10,
            windowWidth: window.innerWidth,
        };
    },
    components: {
        Card
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onProgress(swiper) {
            console.log(swiper.progress);
        },
        onSlideChange(swiper) {
            console.log(swiper.activeIndex);
        },
        onResize() {
            this.windowWidth = window.innerWidth
        }
    },
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        },
        type: {
            type: String,
            required: true,
            default: 'regular'
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        limit: {
            type: Number,
            required: false,
            default: 12
        },
        title: {
            type: String,
            required: false,
            default: ''
        },
        loop: {
            type: Boolean,
            required: false,
            default: true
        },
        isFavable: {
            type: Boolean,
            required: false,
            default: true
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
    }
}
</script>
  
<style lang="scss" scoped>
.swiper-outter {

    display: flex;
    flex-direction: column;

    .swiper-wrapper {
        display: flex;
        width: 100vw;
        max-width: 100%;
        height: 360px;

        .swiper-cont {
            padding: 12px;
            width: 100vw;
            max-width: 100%;

            .swiper-sl {
                display: flex;
                align-items: flex-end;

            }

        }

        .swiper-cont {
            .swiper-sl {
                height: 90%;
                margin: auto 0;

            }
        }



        &.horizontal {
            height: 180px;
        }



    }


    .swiper-title {
        font-size: 40px;
        font-weight: 600;
        display: flex;
        width: fit-content;
        margin-left: 32px;
        margin-bottom: -20px;
        text-shadow: $accent-color 0px 0px 10px;
    }

    .blank {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 24px;
        font-weight: 600;
        color: $text-color;
    }
}
</style>