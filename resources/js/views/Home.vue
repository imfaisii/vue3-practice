<template>
  <div class="row">
    <div class="col-md-12">
      <h1 class="text-center text-danger">Users from Database</h1>
    </div>
    <div class="text-center col-md-12" v-if="users">
      <p v-for="(user, i) in users" v-bind:key="user.id">
        User# {{ i + 1 }} - {{ user.name }}
      </p>
    </div>
    <div class="text-center col-md-12" v-else>
      Fetching users...
      <span
        v-if="!users"
        class="spinner-border text-danger spinner-border-sm"
      ></span>
    </div>
  </div>
  <form @submit.prevent="submit()">
    <div class="row col-12">
      <div class="col-md-4">
        <div class="form-group mt-1">
          <label for="">Name</label>
          <input
            v-model="user.name"
            v-bind:class="errors.name ? 'is-invalid' : ''"
            class="form-control"
            type="text"
            placeholder="Faisal"
            required
          />
          <span class="text-danger" v-if="errors.name"
            ><strong>{{ errors.name[0] }}</strong></span
          >
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group mt-1">
          <label for="">Email</label>
          <input
            v-model="user.email"
            v-bind:class="errors.email ? 'is-invalid' : ''"
            class="form-control"
            type="email"
            placeholder="Faisal@example.com"
            required
          />
          <span class="text-danger" v-if="errors.email"
            ><strong>{{ errors.email[0] }}</strong></span
          >
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group mt-1">
          <label for="">Password</label>
          <input
            v-model="user.password"
            v-bind:class="errors.password ? 'is-invalid' : ''"
            class="form-control"
            type="password"
            placeholder="12345678"
            required
          />
          <span class="text-danger" v-if="errors.password"
            ><strong>{{ errors.password[0] }}</strong></span
          >
        </div>
      </div>
      <div class="col-md-12">
        <button
          :disabled="loading"
          v-text="loading ? 'Saving user...' : 'Submit'"
          class="btn btn-primary"
          type="submit"
        ></button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      users: null,
      loading: false,
      errors: [],
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async fetch() {
      this.$toast.info(`Fetching users...`);
      try {
        const users = await axios.get("/api/users");
        this.users = users.data;
        setTimeout(this.$toast.clear, 0);
      } catch (err) {
        console.log("error", err, err.response);
      }
    },
    async submit() {
      try {
        this.$toast.info(
          `Saving user with name ${this.user.name} please wait...`
        );
        this.loading = true;

        let res = await axios.post("/api/users", this.user);
        if (res.status == 200)
          this.$toast.success(
            `User created successfully with email ${this.user.email}`
          );

        this.fetch();

        this.loading = false;
        this.errors = [];
      } catch (err) {
        this.loading = false;

        if (err.response.status == 422) {
          this.$toast.error(
            `Validation errors occured with status text ${err.response.statusText}`
          );
          this.errors = err.response.data.errors;
        } else this.$toast.error(`Error occured : ${err.response.status} `);
      }
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>