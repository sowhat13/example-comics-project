<template>
    <div class="banner-container">
        <swiper-container class="banner-swiper-container" v-if="banners && banners.length > 0" :slides-per-view="3"
            :breakpoints="{
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 0
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 0
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 0
                }
            }" :space-between="0" :autoplay="{ delay: 4000 }" :rewind="true" :centered-slides="true"
            @slidechange="onSlideChange" :initial-slide="1">
            <swiper-slide class="banner-swiper-slide" v-for="(banner, index) in banners" :key="'banner' + index">
                <div class="banner">

                    <div class="banner-poster-wrapper">
                        <img v-if="banner?.images?.length > 0"
                            :src="banner.images[0].path +  '.' + banner.images[0].extension"
                            :alt="banner.title" class="banner-poster" />
                        <div v-else class="banner-poster"></div>
                    </div>

                </div>

            </swiper-slide>
        </swiper-container>

        <div v-else class="banner">
            <div class="lds-heart">
                <div></div>
            </div>
        </div>
        <div class="banner-content" v-if="selectedBanner">
            <h1 class="banner-title">{{ selectedBanner.title }}</h1>
            <p class="banner-description" v-html="selectedBanner.description"></p>
            <button class="banner-button" @click="goToDetails(selectedBanner.id)">Details</button>
        </div>
    </div>
</template>
  
<script>
import { register } from 'swiper/element/bundle';

register();

export default {
    name: 'BannerComponent',
    data() {
        return {
            selectedBanner: null
        };
    },
    methods: {
        goToBanner() {
        },

        onSlideChange(swiper) {
            console.log(swiper.detail[0].activeIndex);
            this.selectedBanner = this.banners[swiper.detail[0].activeIndex]
        },
        goToDetails(id) {
            this.$router.push({ path: 'comics' + '/' + id })
        }
    },
    props: {
        banners: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    mounted() {
        this.selectedBanner = this.banners.length > 1 ? this.banners[1] : null
    }
};
</script>
  
<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

.banner-container {
    width: 100%;
    aspect-ratio: 4/1;
    min-height: 320px;
    max-width: 100%;
    position: relative;
    overflow: visible !important;
    margin-bottom: 30px;

    .banner-swiper-slide {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
        margin: auto;
        overflow: visible !important;
        opacity: 0.5;
        transform: scale(0.96);

        &.swiper-slide-active {
            transform: scale(1.1);
            z-index: 100;
            opacity: 1;

            .banner-poster {
                border: 3px solid $green-color;
                box-shadow: 0px 5px 15px 0px $green-color-50 ;

            }
        }
    }
}

.banner {
    display: flex;
    align-items: center;
    color: #fff;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: visible !important;
    justify-content: center;
}

.banner-swiper-container {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    max-width: 50%;
}

.banner-poster-wrapper {
    width: 100%;
    max-width: 100%;
    height: 80%;
    display: flex;

    .banner-poster {
        width: 100%;
        max-width: 100%;
        height: 100%;
        display: flex;
        object-fit: cover;
        z-index: 40;
        box-shadow: $accent-color 0px 0px 1px 2px;
        border-radius: 10px;
        cursor: pointer;
    }
}

.banner-content {
    position: absolute;
    width: 50%;
    padding: 40px;
    height: 100%;
    color: $text-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @media (max-width: 639.98px) {
        padding: 8px;
}

    .banner-title {
        font-size: 24px;
        margin-bottom: 10px;
        @include ellipsisLine(2);

    }

    .banner-description {
        font-size: 16px;
        margin-bottom: 10px;
        @include ellipsisLine(4);

    }

    .banner-button {
        background-color: $accent-color;
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease-in-out; 
        &:hover {
            background-color: $accent-color-50;
        }
    }

}



.lds-heart {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    transform: rotate(45deg);
    transform-origin: 40px 40px;
}

.lds-heart div {
    top: 32px;
    left: 32px;
    position: absolute;
    width: 32px;
    height: 32px;
    background: $accent-color;
    animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}

.lds-heart div:after,
.lds-heart div:before {
    content: " ";
    position: absolute;
    display: block;
    width: 32px;
    height: 32px;
    background: $accent-color;
}

.lds-heart div:before {
    left: -24px;
    border-radius: 50% 0 0 50%;
}

.lds-heart div:after {
    top: -24px;
    border-radius: 50% 50% 0 0;
}

@keyframes lds-heart {
    0% {
        transform: scale(0.95);
    }

    5% {
        transform: scale(1.1);
    }

    39% {
        transform: scale(0.85);
    }

    45% {
        transform: scale(1);
    }

    60% {
        transform: scale(0.95);
    }

    100% {
        transform: scale(0.9);
    }
}</style>
  