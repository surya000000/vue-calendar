<template>
  <div id="app">
    <Calendar :events="events" show-events-inline :tabs="tabs">
      <div slot="inlineEvent" event-for="2019-11-26">
        Hello World
      </div>
      <div slot="inlineEvent" event-for="2019-11-25">
        Hello World
      </div>
    </Calendar>
  </div>
</template>

<script>
const events = [{
  date: "2019-11-27",
  bgColor: "red",
  txtColor: "white",
  inline: true,
  events: [{
    title: "World cup 2020",
  }]
},
{
  date: "2019-11-28",
  bgColor: "red",
  txtColor: "white",
  inline: true,
  events: [{
    title: "World cup 2020",
    desc: "hello",
  }]
}];

import Calendar from '@/components/calendar';
export default {
  computed: {
    events() {
      return events;
    },
    fields() {
      return [{
        type: 'text',
        name: "event",
        validations: {
          required: false
        },
        onChange: () => this.onChange(),
      }]
    },
    tabs() {
      return [{
        label: "Events",
        value: "events",
        slots: [{ type: "eventList", events: this.events }]
      },{
        label: "New Events",
        value: "newEvent",
        slots: [{
          type: "form",
          fields: this.fields,
        }]
      }]
    }
  },
  components: {
    Calendar,
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto ;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>
