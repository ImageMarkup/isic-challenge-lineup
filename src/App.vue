<template>
  <div id="app">
    <nav v-if="!givenChallenge">
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
  private baseUrl = this.getParam('baseUrl', 'https://challenge.isic-archive.com/api');
  private challenge = this.getParam('challenge', '52');

  public mounted() {
    M.AutoInit();
  }

  private getParam(key: string, defaultValue: string) {
    const s = new URL(window.location.href).searchParams;
    return s.has(key) ? s.get(key)! : defaultValue;
  }

  get givenChallenge() {
    return this.getParam('challenge', '') !== '';
  }
}

</script>

<style lang="scss">


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  > main {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;

    > * {
      flex: 1 1 0;
    }
  }

  > nav form {
    display: flex;
  }
}

@import '~materialize-css/sass/components/color-variables';
@import '~materialize-css/sass/components/color-classes';
@import '~material-design-icons/iconfont/material-icons.css';

@import './styles/materialize';
@import './styles/lineup';
@import './styles/material';


</style>
