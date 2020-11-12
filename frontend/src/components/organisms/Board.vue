<template>
  <v-card
    :disabled="disabled"
    class="pa-5"
    rounded="xl"
    color="grey darken-4"
  >
    <v-img
      class="board-img"
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
import IBoardState from '@/domain/models/IBoardState';

@Component({
  name: 'Board',
  components: {
    PieceImg,
  },
})
export default class extends Vue {
  @Prop({ type: Object })
  private boardState?: IBoardState;

  @Prop({ type: Boolean, required: true })
  private disabled!: boolean;

  @Emit('setPiece')
  private setPiece(width: number, height: number) {
    return { width, height };
  }

  private calcPieceId(width: number, height: number): number {
    const tempSquares = this.boardState?.squares[width][height];
    if (tempSquares) {
      return tempSquares.id;
    }

    return -1;
  }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.board-img {
  overflow: inherit;
}
.board-inner-container {
  transform:rotate(45deg);
  padding: 15% 15% 15% 15%;
}
.board-unit-img {
  transform:rotate(-45deg);
  overflow: initial;
  cursor: pointer;
}
.piece-img {
  position: absolute;
  bottom: 10px;
  padding: 0 20px;
}
@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .piece-img {
    padding: 0 7px;
  }
}
</style>
