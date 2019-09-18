<template>
  <LineUp :data="submissions"/>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LineUp from './components/LineUp.vue';
import { ISubmissionSummary } from './model';
import { getByTeam } from './rest';

@Component({
  components: {
    LineUp
  },
})
export default class App extends Vue {
  @Prop({
    required: true
  })
  private baseUrl!: string;

  private submissions: ISubmissionSummary[] = [];

  public created() {
    this.fetchData();
  }

  @Watch('baseUrl')
  private onBaseUrlChanged() {
    this.fetchData();
  }

  private fetchData() {
    getByTeam(this.baseUrl).then((data) => this.submissions = data.results);
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
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
