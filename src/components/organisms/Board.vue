<template>
  <v-img
    src="@/assets/board/outline.png"
    contain
  >
    <v-container fill-height class="flex-nowrap">
      <v-row v-for="i in 4" :key="i" justify="center" no-gutters>
        <v-col v-for="j in 4" :key="j" md="auto">
          <v-img
            src="@/assets/board/unit.png"
            :width="180"
            :height="180"
            :contain="true"
          >
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Board',
})
export default class extends Vue {}
</script>
