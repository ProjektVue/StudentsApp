<template>
  <div class="col-md-12">
    <div class="row justify-content-around">
      <div class="col-lg-4">
        <h3>Nowe Wydarzenoe</h3>
      </div>
    </div>
    <div v-if="error" class="error">{{error.message}}</div>

    <form name="form" @submit.prevent="pressed">
      <div class="row justify-content-center">
        <div class="col-md-6 form-group">
          <label for="title">Nazwa wydarzenia</label>
          <input
            id="title"
            v-model="event.title"
            type="text"
            class="form-control"
            placeholder="Tytuł"
          />
        </div>
        <div class="col-md-3 form-group">
          <label for="date">Data wydarzenia</label>
          <input
            id="date"
            v-model="event.date"
            type="date"
            class="form-control"
            placeholder="date"
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-9 form-group">
          <label for="description">Opis</label>
          <textarea
            id="description"
            v-model="event.description"
            type="text"
            class="form-control"
            placeholder="opis"
            rows="10"
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="form-group">
          <button class="btn btn-primary btn-block">Dodaj wydarzenie</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  const fb = require('../firebase.js')

  export default {
    name: "eventForm",
    data() {
      return {
        event: {
          title: "",
          date: new Date(),
          description: ""
        },
        error: ""
      }
    },
    methods: {
      pressed() {
        fb.eventsCollection.add(this.event)
          .then(() => {
            console.log("add event")
          })
          .catch(e => {
            this.error = e
          });

      }
    }
  }
</script>

<style scoped>
  div {
    margin-top: 10px;
  }
</style>
