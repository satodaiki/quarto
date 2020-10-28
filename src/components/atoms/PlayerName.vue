<template>
    <p>{{playerName}}さんの番です</p>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'PlayerName',
})
export default class extends Vue {
  props: ['playerName']
}
</script>
