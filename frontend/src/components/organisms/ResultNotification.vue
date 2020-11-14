<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="400"
  >
    <v-card>
      <v-card-title class="d-flex justify-center">
        {{ resultMessage() }}
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          to="/"
        >
          Exit
        </v-btn>
        <v-btn
          v-if="isAgain"
          color="primary"
          text
          @click="reset()"
        >
          Again?
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';

@Component({
  name: 'ResultNotification',
})
export default class extends Vue {
  @Prop({ type: Boolean, required: true })
  private show!: boolean;

  @Prop({ type: String, required: true })
  private playerName!: string;

  @Prop({ type: Boolean })
  private result?: boolean;

  @Prop({ type: String })
  private message?: string;

  @Prop({ type: Boolean, default: true })
  private isAgain!: boolean;

  private resultMessage() {
    if (this.message) {
      return this.message;
    }

    if (this.result) {
      return `${this.playerName} win.`;
    }

    return `${this.playerName} lose.`;
  }

  private reset() {
    // this.$router.replace({ path: this.$router.currentRoute.path });
    this.$router.go(0);
  }
}
</script>
