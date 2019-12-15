Below are the accepted props for calendar

| show-inline | Boolean | shows event in calendar inline with date (not in the tab)                                                      |
|-------------|---------|----------------------------------------------------------------------------------------------------------------|
| tabs        | Array   | [{ label: "Events", value: "events", slots: [{ type: "eventList", events: [] }] }]                             |
| events      | Array   | [{ date: "2019-11-28",,bgColor: "red",,txtColor: "white", events: [{title: "World cup 2020",desc: "hello"}] }] |
|             |         |                                                                                                                |


slots in tabs array can be variety of type like  eventList, form, html
Event list and form slot has mandatory values like below but html slot type can be raw html 

 eventList and form slots: [{ type: 'eventList', events: [] ], [{ type: "form", fields: [] }]
 Fields are a set of form input needs to display 
 eg:  [{
        type: 'text',
        name: "event",
        validations: {
          required: false
        },
        onChange: () => this.onChange(),
      }]
 
 The on change handle bind events and send back value to the parent component.
 
 html slot can be html in a double quoted string eg: "<div style='color: red'>Vue</div>"
