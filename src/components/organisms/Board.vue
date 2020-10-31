<template>
  <v-card
    :disabled="disabled"
    class="pa-5"
    rounded="xl"
    color="grey darken-4"
  >
    <v-img
      src="@/assets/board/outline.png"
      contain
    >
      <v-container fill-height class="flex-nowrap">
        <v-container class="board-inner-container">
          <v-row v-for="i in 4" :key="i" justify="center" no-gutters>
            <v-col v-for="j in 4" :key="j" cols="3">
              <v-img
                class="board-unit-img"
                @click="setPiece(i - 1, j - 1)"
                src="@/assets/board/unit.png"
                width="8vw"
                height="8vw"
                :contain="true"
              >
                <PieceImg
                  class="piece-img"
                  :pieceId="calcPieceId(i - 1, j - 1)"
                />
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-img>
  </v-card>
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
  @Prop({ type: Object })
  private boardState?: BoardState;

  @Prop({ type: Boolean, required: true })
  private disabled!: boolean;

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

<style lang="scss">
.board-inner-container {
  transform:rotate(45deg);
  padding: 8vw 8vw 8vw 7vw;
}
.board-unit-img {
  transform:rotate(-45deg);
  overflow: initial;
  cursor: pointer;
}
.piece-img {
  position: absolute;
  top: -3vw;
  left: 1vw;
}
</style>
