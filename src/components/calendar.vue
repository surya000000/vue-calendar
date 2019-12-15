<template>
  <div class="calendar grid">
    <div class="grid-items">
      <span>Jump To</span>
      <Select @change="(e) => switchMonth(e)" :items="months" :value="currentMonth" />
      <Input type="number" :value="currentYear" @change.native="(e) => changeYear(e)"/>
      <p>{{ currentMonth }}</p>
      <div class="grid">
        <div v-for="day in days" :key="day" class="grid-item" @click="(e) => dayClick(day, e)">
          {{day}}
        </div>
        <div
          v-for="currentMonthEmptyDayNo in currentMonthStartDay"
          :key="`empty-${currentMonthEmptyDayNo}`"
          class="grid-item"
        >
        </div>
        <div v-for="dayNo in daysInMonth" :key="dayNo" class="grid-item" @click.self="(e) => monthDayContainerClick(dayNo, e)">
            <div v-if="showEventsInline">
              <div v-if="Object.keys($slots.inlineEvent || []).length">
                  <div v-for="(slot, index) in $slots.inlineEvent" :key="index">
                      <SlotNode :node="slot" v-if="`${currentYearMonth}-${dayNo}` === slot.data.attrs['event-for']"/>
                  </div>
                  <EventList
                    inline
                    :calendar-events="events"
                    :current-date="`${currentYearMonth}-${dayNo}`"
                  />
              </div>
            </div>
            <Tooltip :tooltip-list="findEventFor(dayNo).events" :show-tooltip="!!findEventFor(dayNo).events.length">
              <a @click="(e) => monthDayClick(dayNo, e)" href="#" name="title">{{dayNo}}</a>
            </Tooltip>
        </div>
      </div>
    </div>
    <CalendarSidebar direction="right" :show="showDrawer" width="50%" class="grid-items" v-if="showSidebar">
      <Tabs>
        <Tab :name="tab.label" :selected="index === 0" v-for="(tab, index) in tabs" :key="tab.value">
          <h1>{{ tab.label }} for {{ currentYearMonth }}-{{ currentDayNum }}</h1>
          <div v-for="(slot, index) in tab.slots" :key="index">
            <div v-html="slot.html" v-if="slot.type === 'html'"/>
            <FormBuilder :fields="slot.fields" v-if="slot.type == 'form'"/>
            <EventList
              v-if="slot.type == 'eventList'"
              :calendar-events="events"
              :current-date="`${currentYearMonth}-${currentDayNum}`"
            />
          </div>
        </Tab>
      </Tabs>
    </CalendarSidebar>
  </div>
</template>
<script>
import Tooltip from "@/components/_base-tooltip";
import EventList from '@/components/event-list';
import SlotNode from '@/components/slot-node';
import FormBuilder from '@/components/_base-form-builder';
import CalendarSidebar from '@/components/calendar-sidebar';
import Select from '@/components/_base-select';
import Input from '@/components/_base-input';
import months from '@/constants/months';
import days from '@/constants/days';
import Tabs from '@/components/_base-tabs';
import Tab from '@/components/_base-tab';

export default {
  name: 'app',
  components: {
    Select,
    FormBuilder,
    Input,
    EventList,
    CalendarSidebar,
    SlotNode,
    Tabs,
    Tooltip,
    Tab,
  },
  data() {
    const date = new Date();
    return {
      currentMonth: months[date.getMonth()],
      showDrawer: this.showSidebar,
      currentYear: String(new Date().getFullYear()),
      currentDayNum: date.getDate(),
    }
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
    showSidebar: {
      type: Boolean,
      default: true,
    },
    showEventsInline: {
      type: Boolean,
      required: false,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    currentYearMonth() {
      const month = months.indexOf(this.currentMonth)+1;
      return `${this.currentYear}-${month}`;
    },
    months() {
      return months;
    },
    days() {
      return days;
    },
    currentMonthStartDay() {
      const previousDate = new Date(this.currentYear, months.indexOf(this.currentMonth), 0);
      const monthEndDay = previousDate.getDay();
      const currentMonthDayIndex = monthEndDay === 6 ? 0 : monthEndDay + 1;
      return currentMonthDayIndex;
    },
    daysInMonth() {
      const month = months.indexOf(this.currentMonth)+1;
      const year = parseInt(this.currentYear);
      return new Date(year, month, 0).getDate();
    },
  },
  mounted() {
  },
  methods: {
    switchMonth(e) {
      this.currentMonth = e.target.value;
    },
    dayClick() {
    },
    monthDayContainerClick() {
    },
    findEventFor(day) {
      const calendar = this.events.find(event => event.date === `${this.currentYearMonth}-${day}`)
      return calendar || { events: [] };
    },
    changeYear(e) {
      if (parseInt(e.target.value) < 1) {
        return alert("invalid input");
      }
      this.currentYear = parseInt(e.target.value);
    },
    monthDayClick(dayNo) {
      this.showDrawer = true
      this.currentDayNum = dayNo;
    }
  }
}
</script>
