<template>
  <span class="text-h3">{{playerName}}さんの番です</span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'PlayerName',
})
export default class extends Vue {
  @Prop()
  private playerName?: string;
}
</script>
