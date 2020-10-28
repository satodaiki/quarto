<template>
    <v-container fill-height class="flex-nowrap">
      <v-row v-for="i in 4" :key="i" justify="center" no-gutters>
        <v-col v-for="j in 4" :key="j" md="auto">
          <PieceImg :pieceId="calcPieceId(i, j)" />
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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
  private pieceState?: Piece[];

  private calcPieceId(i: number, j: number): number {
    return ((4 * (i - 1)) + (j - 1));
  }
}
</script>
