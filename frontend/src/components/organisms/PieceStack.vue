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
          <v-col v-for="pieceId in pieceRow" :key="pieceId" cols="3">
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
import IPiece from '@/domain/models/IPiece';
import PieceImg from '@/components/atoms/PieceImg.vue';

@Component({
  name: 'PieceStack',
  components: {
    PieceImg,
  },
})
export default class extends Vue {
  @Prop({ type: Array, required: true })
  private pieceState!: IPiece[];

  @Prop({ type: Boolean, required: true })
  private disabled!: boolean;

  @PropSync('stackSelectPieceId', { type: Number })
  private selectPieceId!: number;

  private pieceIds: number[][] = [];

  mounted() {
    this.shufflePieces();
  }

  private shufflePieces() {
    let pieces: IPiece[] = [];
    for (let i = 0; i < this.pieceState.length; i++) {
      pieces = this.createReplaceArrayRandom(this.pieceState);
    }
    for (let i = 0; i < 4; i++) {
      this.pieceIds.push([]);
      for (let j = 0; j < 4; j++) {
        const piece = pieces[4 * i + j];
        if (piece !== null) {
          this.pieceIds[i].push(piece.id);
        } else {
          continue;
        }
      }
    }
  }

  private createReplaceArrayRandom<T>(arr: T[]) {
    const randA = Math.floor(Math.random() * (arr.length - 1));
    let randB = -1;
    // eslint-disable-next-line no-constant-condition
    while (randB === -1 || randA === randB) {
      randB = Math.floor(Math.random() * (arr.length - 1));
    }

    const returnArr = arr;

    const temp = returnArr[randA];
    returnArr[randA] = returnArr[randB];
    returnArr[randB] = temp;

    return returnArr;
  }

  private isDisplayed(pieceId: number) {
    return !!this.pieceState[pieceId];
  }
}
</script>
