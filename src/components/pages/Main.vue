<template>
  <v-container>
    <v-row>
      <PlayerName :playerName="currentPlayerName()"/>
    </v-row>
    <v-row>
      <v-col>
        <Board
          :key="boardKey"
          @setPiece="setBoardPiece"
          :boardState="gameField.boardState"
        />
      </v-col>
      <v-col>
        <PieceStack
          :pieceState="gameField.pieces"
          :stackSelectPieceId.sync="selectPieceId"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from '@/components/organisms/Board.vue';
import PieceStack from '@/components/organisms/PieceStack.vue';
import PlayerName from '@/components/atoms/PlayerName.vue';
import GameField from '@/domain/models/GameField';

@Component({
  name: 'Main',
  components: {
    Board,
    PieceStack,
    PlayerName,
  },
})
export default class extends Vue {
  // ボードの状態を反映させるためのコンポーネントの強制的な更新に使用
  // https://www.tomatoaiu.com/entry/2019/09/28/133319
  private boardKey = 0;

  private gameField: GameField = new GameField();

  private selectPieceId: number | null = null;

  private currentPlayerName() {
    return this.gameField.currentPlayer.playerId;
  }

  private setBoardPiece(payload: { width: number; height: number }) {
    console.log('pieceId', this.selectPieceId);
    if (this.selectPieceId !== null) {
      console.log('setBoardPiece通ってる');
      const result = this.gameField.setPiece(this.selectPieceId, payload.width, payload.height);
      this.boardKey += 1;
      if (result) {
        // eslint-disable-next-line no-alert
        alert(`${this.gameField.currentPlayer.playerId}の勝ちだよ`);
      }
    }
  }

  mounted() {
    // this.gameField.pieces = this.gameField.pieces.filter((p) => p.getId() > 1);
  }
}
</script>
