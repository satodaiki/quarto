<template>
  <v-container>
    <v-row>
      <v-col>
        <Board
          :boardState="gameField.boardState"
        />
      </v-col>
      <v-col>
        <PieceStack
          :pieceState="gameField.pieces"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from '@/components/organisms/Board.vue';
import PieceStack from '@/components/organisms/PieceStack.vue';
import GameField from '@/domain/models/GameField';

@Component({
  name: 'Main',
  components: {
    Board,
    PieceStack,
  },
})
export default class extends Vue {
  private gameField: GameField = new GameField();
}
</script>
cxvbn
