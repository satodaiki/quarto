<template>
  <v-container>
    <v-row>
      <PlayerName :playerName="currentPlayerName()"/>
    </v-row>
    <v-row>
      <PlayerName :playerName="currentPlayerName()"/>
    </v-row>
    <v-row justify="center">
      <v-col md="12" lg="12" xl="7">
      <!-- <v-col> -->
        <Board
          :key="boardKey"
          @setPiece="setBoardPiece"
          :boardState="gameField.boardState"
          :disabled="boardDisabled"
        />
      </v-col>
      <v-col md="12" lg="12" xl="5">
      <!-- <v-col> -->
        <PieceStack
          :disabled="pieceStackDisabled"
          :pieceState="gameField.pieces"
          :stackSelectPieceId.sync="selectPieceId"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
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

  private boardDisabled = true;

  private pieceStackDisabled = false;

  private currentPlayerName() {
    return this.gameField.currentPlayer.playerId;
  }

  private setBoardPiece(payload: { width: number; height: number }) {
    if (this.selectPieceId !== null) {
      this.toggleDisabled();
      const result = this.gameField.setPiece(payload.height, payload.width);
      this.boardKey += 1;
      if (result) {
        // eslint-disable-next-line no-alert
        alert(`${this.gameField.currentPlayer.playerId}の勝ちだよ`);
      }
    }
  }

  private toggleDisabled() {
    this.boardDisabled = !this.boardDisabled;
    this.pieceStackDisabled = !this.pieceStackDisabled;
  }

  @Watch('selectPieceId')
  private selectPiece() {
    if (this.selectPieceId !== null) {
      this.toggleDisabled();
      this.gameField.selectPiece(this.selectPieceId);
    }
  }
}
</script>
