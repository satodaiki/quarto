<template>
  <v-item-group
    v-model="selectPieceId"
  >
    <v-container fill-height class="flex-nowrap">
      <v-row v-for="i in 4" :key="i" justify="center" no-gutters>
        <v-col v-for="j in 4" :key="j" md="auto">
          <v-item
            v-slot="{ active, toggle }"
            :value="calcPieceId(i, j)"
          >
            <v-card
              :color="active ? 'gray' : ''"
              @click="toggle"
            >
              <PieceImg v-if="isDisplayed(i, j)" :pieceId="calcPieceId(i, j)" />
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  PropSync,
} from 'vue-property-decorator';
import PieceImg from '@/components/atoms/PieceImg.vue';
import Piece from '@/domain/models/Piece';

@Component({
  name: 'PieceStack',
  components: {
    PieceImg,
  },
})
export default class extends Vue {
  @Prop()
  private pieceState!: Piece[];

  @PropSync('stackSelectPieceId', { type: Number })
  private selectPieceId!: number;

  private isDisplayed(i: number, j: number) {
    return this.pieceState.findIndex((p) => p.getId() === this.calcPieceId(i, j)) !== -1;
  }

  private calcPieceId(i: number, j: number): number {
    return ((4 * (i - 1)) + (j - 1));
  }
}
</script>
