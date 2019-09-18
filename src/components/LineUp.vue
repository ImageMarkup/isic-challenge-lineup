<template>
  <div>
    {{baseUrl}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LineUp extends Vue {
  @Prop({
    required: true
  })
  private baseUrl!: string;


}
</script>

<style lang="scss" scoped>

</style>
