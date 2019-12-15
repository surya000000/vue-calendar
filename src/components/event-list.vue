<template>
  <div class="event-list">
    <div v-for="calendarEvent in calendarEvents" :key="calendarEvent.date" :style="{
        background: inline && calendarEvent.bgColor,
        color: inline && calendarEvent.txtColor,
      }">
      <ul v-if="currentDate === calendarEvent.date">
        <li v-for="event in calendarEvent.events" :key="event.title">
          {{ event.title }} {{ event.time }}
        </li>
      </ul>
    </div>
    <div v-if="!inline && !calendarEventPresent">
        No Calendar event found
    </div>
  </div>
</template>
<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: false,
    },
    calendarEvents:{
      type: Array,
      default: () => [],
    },
    currentDate: {
      type: String,
      required: true,
    }
  },
  computed: {
    calendarEventPresent() {
      return this.calendarEvents.find(calendar => calendar.date === this.currentDate);
    }
  }
}
</script>
