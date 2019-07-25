<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark>
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      prepend-icon="place"
                      name="email"
                      label="Email"
                      type="text"
                      v-model="form.email"
                      v-validate="'required|email'"
                      :error-messages="errors.collect('email')"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      v-model="form.password"
                      v-validate="'required|min:5'"
                      :error-messages="errors.collect('password')"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn dark @click="login">Login</v-btn>
                </v-card-actions>
                <v-alert :value="error" type="error">{{ this.error }}</v-alert>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>

import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

export default {
  data: function() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    login: function() {
      this.$validator.validate().then(result => {
        if (result) {
          let email = this.form.email;
          let password = this.form.password;

          localStorage.setItem('token', email);
          localStorage.setItem('refresh_token', email);
          window.location.href = '/';

          // this.$store
          //   .dispatch("login", { email, password })
          //   .catch(
          //     err =>
          //       (this.error =
          //         "Authentication Failed. Please check your credentials")
          //   );
        }
      });
    }
  }
};
</script>
