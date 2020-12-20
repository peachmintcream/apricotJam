<template>
  <v-app>
    <div v-if="!$subReady.Time">Loading...</div>
    <v-main v-else>
      <v-card
        height="400"
        width="256"
        class="mx-auto"
        color="blue"
      >
        <v-navigation-drawer permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Hello {{hello}}
              </v-list-item-title>
              <v-list-item-subtitle>
                The time is now: {{currentTime}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in TimeCursor"
              :key="item.time"
              link
            >
              <v-list-item-icon>
                <v-icon>{{item.time}}  -  {{item._id}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{settings}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import '/imports/collections/Time';

export default {
  data() {
    console.log('Sending non-Meteor data to Vue component');
    return {
      hello: 'World',
      settings: Meteor.settings.public,   // not Meteor reactive
    }
  },
  // Vue Methods
  methods: {
    updateTime() {
      console.log('Calling Meteor Method UpdateTime');
      Meteor.call('UpdateTime');          // not Meteor reactive
    }
  },
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      'Time': []
    },
    // A helper function to get the current time
    currentTime () {
      console.log('Calculating currentTime');
      var t = Time.findOne('currentTime') || {};
      return t.time;
    },
    // A Minimongo cursor on the Time collection is added to the Vue instance
    TimeCursor () {
      // Here you can use Meteor reactive sources like cursors or reactive vars
      // as you would in a Blaze template helper
      return Time.find({}, {
        sort: {time: -1}
      })
    },
  }
}
</script>

<style scoped>
  p {
    font-size: 2em;
  }
</style>
