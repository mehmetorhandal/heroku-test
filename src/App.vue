<template>
  <v-app>
    <v-navigation-drawer fixed clipped app class="lighten-4" v-model="drawer">
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{
                item.heading
                }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
          <v-list-item :to="{name: item.route}" :key="i" v-else>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{
                item.text
                }}
              </v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="white" app fixed :clipped-left="$vuetify.breakpoint.mdAndUp">
      <!-- <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon> -->
      <span class="title ml-3 mr-5">
        <img src="./assets/logo.png" height="40">
      </span>
      <v-list-item-title v-if="isLoggedIn" @click="this.logout" class="grey--text">Logout</v-list-item-title>
      <v-breadcrumbs :items="this.breadcrumbs">
      <template v-slot:item="props">
        <router-link :to="props.item.to ? props.item.to : ':;'" :class="[props.item.disabled && 'disabled']">{{ props.item.text.toUpperCase() }}</router-link>
      </template>
    </v-breadcrumbs>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
    breadcrumbs: [],
    items: [
      { icon: "dashboard", text: "Dashboard", route: "dashboard" },
      { icon: "person", text: "Academic Staff List", route: "academic-staff-list" },
      { icon: "person", text: "Fulfillment List", route: "fulfillment-list" },
      { icon: "category", text: "Rooms", route: "rooms" },
      { icon: "ballot", text: "Lessons", route: "lessons" },
      { icon: "timeline", text: "Organization", route: "organization" },
      { icon: "poll", text: "Exam Schedule", route: "exam-schedule" }
    ]
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    $route() {
      this.breadcrumbs = this.$route.meta.breadcrumb;
    }
  },
  created() {
    this.breadcrumbs = this.$route.meta.breadcrumb;
    this.$http.interceptors.response.use(
      undefined,
      err =>
        new Promise((resolve, reject) => {
          if (
            err.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.$store.dispatch(logout);
          }
          throw err;
        })
    );
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        window.location.href = "/login";
      });
    }
  }
};
</script>

<style lang="scss">
@import "app.scss";
</style>
