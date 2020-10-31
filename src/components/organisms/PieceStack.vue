<template>
  <v-card
    :disabled="disabled"
    color="brown darken-1"
    elevation="3"
  >
    <v-item-group
      v-model="selectPieceId"
    >
      <v-container fill-height>
        <v-row v-for="pieceRow in pieceIds" :key="pieceRow" no-gutters>
          <v-col v-for="pieceId in pieceRow" :key="pieceId" md="auto">
            <v-item
              v-slot="{ active, toggle }"
              :value="pieceId"
            >
              <v-card
                elevation="0"
                :color="active ? 'brown darken-3' : 'transparent'"
                @click="toggle"
              >
                <PieceImg v-if="isDisplayed(pieceId)" :pieceId="pieceId" />
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </v-card>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  PropSync,
} from 'vue-property-decorator';
import Piece from '@/domain/models/Piece';
import PieceImg from '@/components/atoms/PieceImg.vue';

@Component({
  name: 'PieceStack',
  components: {
    PieceImg,
  },
})
export default class extends Vue {
  @Prop({ type: Array, required: true })
  private pieceState!: Piece[];

  @Prop({ type: Boolean, required: true })
  private disabled!: boolean;

  @PropSync('stackSelectPieceId', { type: Number })
  private selectPieceId!: number;

  private pieceIds: number[][] = [];

  mounted() {
    for (let i = 0; i < 4; i++) {
      this.pieceIds.push([]);
      for (let j = 0; j < 4; j++) {
        const piece = this.pieceState[4 * i + j];
        if (piece !== null) {
          this.pieceIds[i].push(this.pieceState[4 * i + j].getId());
        } else {
          break;
        }
      }
    }
  }

  // updated() {
  //   for (let i = 0; i < 4; i++) {
  //     this.pieceIds.push([]);
  //     for (let j = 0; j < 4; j++) {
  //       const piece = this.pieceState[4 * i + j];
  //       if (piece !== null) {
  //         this.pieceIds[i].push(this.pieceState[4 * i + j].getId());
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  // }

  private isDisplayed(pieceId: number) {
    // this.pieceState.findIndex((p) => p.getId() === pieceId);
    return !!this.pieceState[pieceId];
    // return this.pieceState.findIndex((p) => p.getId() === pieceId) !== -1;
  }
}
</script>
