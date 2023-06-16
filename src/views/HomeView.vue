<template>
  <div class="home page">
    <Banner :banners="comics"></Banner>
    <div class="alt-banner">
      <p class="section-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
    </div>
    <CardsSwiper title="Popular Comics" type="horizontal" :items="popularComics" :limit="popularComicsQuery.limit"
      :loading="popularComicsQuery.loading"></CardsSwiper>
    <CardsSwiper title="Latest comics" :items="latestComics" :limit="latestComicsQuery.limit"
      :loading="latestComicsQuery.loading"></CardsSwiper>

    <CardsSwiper title="Best comics" :items="comics" :limit="comicsQuery.limit" :loading="comicsQuery.loading">
    </CardsSwiper>

  </div>
</template>

<script>
import comics from '@/api/comics'
import CardsSwiper from '@/components/CardsSwiper.vue'
import Banner from '@/components/Banner.vue'
import {isInViewport} from '@/helpers/viewport'
export default {
  name: 'HomeView',
  components: {
    CardsSwiper,
    Banner
  },
  data() {
    return {
      comics: [],
      comicsQuery: {
        limit: 12,
        loading: false,
      },
      latestComics: [],
      latestComicsQuery: {
        limit: 12,
        loading: false,
      },
      popularComics: [],
      popularComicsQuery: {
        limit: 12,
        loading: false,
      },
      randomPickTime: 7000,
      timer: null
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.createTimer()
  },
  methods: {
    init() {
      this.getComics()
      this.getLatestComics()
      this.getPopularPopularComics()
    },
    getComics() {
      this.comicsQuery.loading = true
      comics.getComics({ limit: this.comicsQuery.limit, format: 'comic', hasDigitalIssue: true })
        .then(response => {
          this.comics = response.data.results
          this.comicsQuery.loading = false
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.comicsQuery.loading = false
        })
    },
    getLatestComics() {
      this.latestComicsQuery.loading = true
      comics.getComics({ limit: this.latestComicsQuery.limit, startYear: '2023', format: 'comic' })
        .then(response => {
          this.latestComics = response.data.results
          this.latestComicsQuery.loading = false
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.latestComicsQuery.loading = false
        })
    },
    getPopularPopularComics() {
      this.popularComicsQuery.loading = true
      comics.getComics({ limit: this.popularComicsQuery.limit,  format: 'infinite comic', orderBy: '-focDate'  })
        .then(response => {
          this.popularComics = response.data.results
          this.popularComicsQuery.loading = false
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.popularComicsQuery.loading = false
        })
    },

    selectRandomCard() {
      let cards = document.getElementsByClassName('card')
      let visibleCards = Array.from(cards).filter(card => {return isInViewport(card)});
      const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)]
      randomCard.classList.add('card-hovered2')
      setTimeout(() => {
        randomCard.classList.remove('card-hovered2')
      }, this.randomPickTime)
      console.log(cards, randomCard)
    },
    createTimer() {
     this.timer = setInterval(() => {
        this.selectRandomCard()
      }, this.randomPickTime + 3000)
    }
  },

  beforeUnmount() {
    clearInterval(this.timer)
  }

}
</script>



<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
  background: $background-color;
}

.alt-banner{
  background: $primary-gradient;
  padding: 16px;
  margin: 30px 0;
  text-align: center;
  .section-description{
    font-size: 1.2rem;
    font-weight: 300;
    color: $light-color;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
}
</style>