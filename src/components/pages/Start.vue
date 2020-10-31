<template>
    <v-container>
        <v-btn to="/main">Start</v-btn>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Start',
})
export default class extends Vue {}
</script>
