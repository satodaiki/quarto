<template>
  <v-img
    src="@/assets/board/outline.png"
    contain
  >
    <v-container fill-height class="flex-nowrap">
      <v-row v-for="i in 4" :key="i" justify="center" no-gutters>
        <v-col v-for="j in 4" :key="j" md="auto">
          <v-img
            @click="setPiece(i - 1, j - 1)"
            src="@/assets/board/unit.png"
            :width="180"
            :height="180"
            :contain="true"
          >
            <PieceImg :pieceId="calcPieceId(i - 1, j - 1)" />
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Emit,
} from 'vue-property-decorator';
import PieceImg from '@/components/atoms/PieceImg.vue';
import BoardState from '@/domain/models/BoardState';

@Component({
  name: 'Board',
  components: {
    PieceImg,
  },
})
export default class extends Vue {
  @Prop()
  private boardState?: BoardState;

  @Emit('setPiece')
  private setPiece(width: number, height: number) {
    return { width, height };
  }

  private calcPieceId(width: number, height: number): number {
    const tempSquares = this.boardState?.squares[width][height];
    if (tempSquares) {
      return tempSquares.getId();
    }

    return -1;
  }
}
</script>
