<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <form>
          <input id="baseUrl" placeholder="Base URL" v-model="baseUrl" required>
          <input type="number" id="challenge" placeholder="Challenge" v-model="challenge" required>
        </form>
      </div>
    </nav>
    <main>
      <Analyze :baseUrl="baseUrl" :challenge="challenge"/>
    </main>
  </div>
</template>

<script lang="ts">
import * as M from 'materialize-css';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Analyze from './components/Analyze.vue';
import { ISubmissionSummary } from './model';
import { getByTeam } from './rest';


@Component({
  components: {
    Analyze
  },
})
export default class App extends Vue {
  private baseUrl = 'https://challenge.isic-archive.com/api';
  private challenge = '52';

  public mounted() {
    M.AutoInit();
  }
}

</script>

<style lang="scss">
@import '~materialize-css/sass/materialize';
@import '~material-design-icons/iconfont/material-icons.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;

  > :not(nav) {
    flex: 1 1 0;
  }

  > nav form {
    display: flex;
  }
}

</style>
