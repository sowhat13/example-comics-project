<template>
  <div class="page">
    <div class="top container">
      <div class="top-bg"></div>
      <div class="top-content">
        <div class="favorite-wrapper">
          <button class="favorite" v-if="favorite" @click.stop="favIt(1)">
            <SolidHeartIcon class="icon heart-icon" />
            <span>
              Unfavorite
            </span>
          </button>
          <button class="favorite" @click.stop="favIt(2)" v-else-if="!favorite">
            <OutlineHeartIcon class="icon" />
            <span>
              Favorite
            </span>
          </button>
        </div>


        <div class="thumbnail-wrapper" :class="[loading ? 'shiny-element' : '']">

          <img v-if="comic?.thumbnail?.path" :src="comic?.thumbnail?.path + '.' + comic?.thumbnail?.extension"
            class="thumbnail" />
        </div>

        <div class="contents-wrapper">
          <div class="title">
            <h1 :class="[loading ? 'shiny-element' : '']">{{ comic?.title }}</h1>
          </div>
          <div class="content">
            <span class="title">
              Description:
            </span>
            <p :class="[loading ? 'shiny-element' : '']">{{ comic?.description }}</p>
          </div>
          <div class="content" v-if="loading || comic?.creators?.available">
            <span class="title">
              Creators:
            </span>
            <p :class="[loading ? 'shiny-element' : '']" >
              {{ comic?.creators?.items.map(creator => { return creator.name }).join(', ') }}
            </p>
          </div>
        </div>

        <div class="dates-wrapper">
          <div class="date-wrapper" v-if="comic?.dates.find(date => { return date.type == 'onsaleDate' })">
            <span class="title">
              On Sale Date:
            </span>
            <time class="time">
              {{ comic?.dates.find(date => { return date.type == "onsaleDate" })?.date }}
            </time>
          </div>

          <div class="date-wrapper" v-if="comic?.dates.find(date => { return date.type == 'digitalPurchaseDate' })">
            <span class="title">
              Digital Purchase Date:
            </span>
            <time class="time">
              {{ comic?.dates.find(date => { return date.type == "digitalPurchaseDate" })?.date }}
            </time>
          </div>

          <div class="date-wrapper" v-if="comic?.dates.find(date => { return date.type == 'focDate' })">
            <span class="title">
              Foc Date:
            </span>
            <time class="time">
              {{ comic?.dates.find(date => { return date.type == "focDate" })?.date }}
            </time>
          </div>
        </div>
      </div>



    </div>
    <div class="bottom">
      <CardsSwiper :isFavable="false" :visibleContent="true" noclick title="Characters" type="horizontal" :items="characters.results"
      :loading="characters.loading"></CardsSwiper>
      <CardsSwiper :isFavable="false" :visibleContent="true" noclick title="Stories" type="horizontal" :items="stories.results"
      :loading="stories.loading"></CardsSwiper>
    </div>

  </div>
</template>
  

<script>
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid';
import CardsSwiper from '@/components/CardsSwiper.vue';
import comics from '@/api/comics'
export default {
  name: 'CardDetailsView',
  data() {
    return {
      comic: null,
      loading: false,
      characters:{
        results:[],
        loading: false,

      },
      stories:{
        results:[],
        loading: false,

      },
    }
  },
  computed: {
    favorite() {
      return this.$store.getters.isFavorite(this.comic?.id)
    }
  },
  methods: {
    init() {
      this.getComic()
      this.getComicCharacters()
      this.getComicStories()
    },
    getComic() {
      this.comic = null
      this.loading = true

      comics.getComic(this.$route.params.id)
        .then(response => {
          this.comic = response.data.results[0]
          this.loading = false
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    },
    getComicCharacters(){
      this.characters.results = null
      this.characters.loading = true
      comics.getComicCharacters(this.$route.params.id)
        .then(response => {
          this.characters.results = response.data.results
          this.characters.loading = false
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.characters.loading = false
        })
    },
    getComicStories(){
      this.stories.results = null
      this.stories.loading = true
      comics.getComicStories(this.$route.params.id)
        .then(response => {
          this.stories.results = response.data.results
          this.stories.loading = false
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.stories.loading = false
        })
    },
    favIt(type) {
      if (!this.comic.id) return console.error('No id provided')
      if (type == 1) {
        this.$store.dispatch('removeFromFavorites', { id: this.comic.id, title: this.comic.title, image: this.comic.image })
      } else {
        this.$store.dispatch('addToFavorites', { id: this.comic.id, title: this.comic.title, image: this.comic.image })
      }
    },
  },

  created() {
    this.init()
  },
  mounted() {
  },
  components: {
    OutlineHeartIcon,
    SolidHeartIcon,
    CardsSwiper
  },
};

</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

.top {
  display: flex;
  position: relative;
  min-height: 400px;
  .top-bg {
    background: $secondary-gradient;
    background-size: cover;
    height: 300px;
    width: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 40px 40px 140px 140px;
    box-shadow: 0px 5px 30px 1px $dark-color-light;

    @media (max-width: 839.98px) {
      border-radius: 24px;
      width: 96%;
      left: 50%;
      height: 400px;
      transform: translateX(-50%);
    }
  }

  .top-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: 1;
    padding: 6% 12%;
    flex-wrap: wrap;
    gap: 20px;
    height: auto;
    width: 100%;

    .thumbnail-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 300px;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      box-shadow: $green-color 0px 0px 0px 1px, 0px 0px 8px 5px $green-color-50 ;

      .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .favorite-wrapper {
      position: absolute;
      top: 16px;
      left: 36px;
      z-index: 10;

      @media (max-width: 839.98px) {
        top: 12px;
        left: 3%;
      }

      .favorite {
        background-color: $dark-color;
        border-radius: 12px;
        padding: 4px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        min-height: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        border: none;
        gap: 4px;
        color: $green-color;
        font-size: 12px;

        &:hover {
          transform: scale(1.1);
        }

        .icon {
          width: 18px;
          height: 18px;
          color: $green-color;
        }
      }
    }

    .contents-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 400px;
      gap: 8px;
      max-width: 96%;

      .shiny-element {
        border-radius: 12px !important;
      }

      .title {
        display: flex;
        flex-direction: column;
        width: 100%;

        h5 {
          font-size: 1rem;
          padding: 0 12px;
        }

        h1 {
          font-size: 1.4rem;
          font-weight: 600;
          color: $light-color;
          text-shadow: 0 0 2px rgba(0, 0, 0, 1);
          display: flex;
          min-height: 40px;
          padding: 4px;
          width: 400px;
          max-width: 100%;

        }
      }

      .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 4px;
        gap: 2px;

        span {
          font-size: 0.8rem;
          color: $light-color;

        }

        p {
          font-size: 0.8rem;
          font-weight: 600;
          color: $text-color;
          text-shadow: 0 0 2px rgba(0, 0, 0, 1);
          display: flex;
          min-height: 30px;
          width: 400px;
          max-width: 100%;
          @include ellipsisLine(3);

        }
      }
    }

    .dates-wrapper {
      position: absolute;
      right: 100px;
      top: 80px;
      z-index: 50;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .date-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .title {
          font-size: 0.8rem;
          font-weight: 600;
          color: $text-color;
          text-shadow: 0 0 2px rgba(0, 0, 0, 1);
        }

        .time {
          font-size: 0.8rem;
          font-weight: 600;
          color: $light-color;
          text-shadow: 0 0 2px rgba(0, 0, 0, 1);
        }
      }

      @media (max-width: 1039.98px) {
        display: none;
      }
    }

    @media (max-width: 839.98px) {
      padding: 6% 4%;
      justify-content: center;
      align-items: center;

      .thumbnail-wrapper {
        width: 100px;
        height: 150px;
      }

      .contents-wrapper {
        width: 100%;
        max-width: 100%;

        * {
          text-align: center;
          align-items: center;
          justify-content: center;
        }

        .title {
          h5 {
            font-size: 0.8rem;
          }

          h1 {
            font-size: 1rem;
          }
        }

        .content {

          span {
            font-size: 0.8rem;
          }

          p {
            font-size: 0.6rem;
          }
        }
      }
    }
  }

}
.bottom{
  padding: 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}
</style>