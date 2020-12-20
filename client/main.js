import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';   // here!
Vue.use(VueMeteorTracker);                           // here!

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify)

import App from './App.vue';
import './main.html';

Meteor.startup(() => {
  new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    ...App,
  });
});
