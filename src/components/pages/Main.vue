<template>
  <v-container>
    <v-row justify="center">
      <PlayerName :playerName="currentPlayerName()"/>
    </v-row>
    <v-row class="my-4" justify="center">
      <div>{{ actionMessage() }}</div>
    </v-row>
    <v-row class="my-4" justify="center">
      <v-btn
        x-large
        @click="result()"
      >
        Quarto!
      </v-btn>
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
    <ResultNotification
      :show="showResultNotification"
      :playerName="currentPlayerName()"
      :result="resultState"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ResultNotification from '@/components/organisms/ResultNotification.vue';
import Board from '@/components/organisms/Board.vue';
import PieceStack from '@/components/organisms/PieceStack.vue';
import PlayerName from '@/components/atoms/PlayerName.vue';
import GameField from '@/domain/models/GameField';

@Component({
  name: 'Main',
  components: {
    ResultNotification,
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

  private showResultNotification = false;

  private resultState?: boolean;

  private currentPlayerName() {
    return this.gameField.currentPlayer.playerId;
  }

  private actionMessage() {
    if (this.boardDisabled) {
      return '駒を選択して下さい。';
    }

    return 'ボードに配置して下さい。';
  }

  private setBoardPiece(payload: { width: number; height: number }) {
    if (this.selectPieceId !== null) {
      this.toggleDisabled();
      this.gameField.setPiece(payload.height, payload.width);
      this.boardKey += 1;
    }
  }

  private result() {
    this.showResultNotification = true;
    this.resultState = this.gameField.getJudgeResult();
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
