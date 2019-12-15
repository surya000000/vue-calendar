import Vue from 'vue';

const slotNode = Vue.component("slot-node", {
  functional: true,
  render(h, context){
    return context.props.node
  }
})

export default slotNode;
