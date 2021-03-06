<template>
  <v-container>
    <v-row justify="center">
      <span class="text-h4">制限時間: {{ timer }}</span>
    </v-row>
    <v-row justify="center">
      <PlayerName :playerName="currentPlayerName"/>
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
      <v-col md="7" sm="12">
        <Board
          :key="boardKey"
          @setPiece="setBoardPiece"
          :boardState="boardState"
          :disabled="boardDisabled"
        />
      </v-col>
      <v-col md="5" sm="12">
        <PieceStack
          :key="pieceStackKey"
          :disabled="pieceStackDisabled"
          :pieceState="pieces"
          :stackSelectPieceId.sync="selectPieceId"
        />
      </v-col>
    </v-row>
    <ResultNotification
      :show="showResultNotification"
      :playerName="currentPlayerName"
      :message="resultMessage"
      :result="resultState"
      :is-again="isResultAgain"
      @reset="resetRoom"
    />
    <v-overlay :value="!isUserTurn()" :z-index="0">
      <v-container fill-height>
        <v-row justify="center">
          相手のターンです。
        </v-row>
      </v-container>
    </v-overlay>
    <v-btn
      color="primary"
      fixed
      bottom
      right
      @click="leaveRoom"
    >
      部屋から出る
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ResultNotification from '@/components/organisms/ResultNotification.vue';
import Board from '@/components/organisms/Board.vue';
import PieceStack from '@/components/organisms/PieceStack.vue';
import PlayerName from '@/components/atoms/PlayerName.vue';
import IBoardState from '@/domain/models/IBoardState';
import IPiece from '@/domain/models/IPiece';
import IPlayer from '@/domain/models/IPlayer';
import { WebSocketStateModule } from '@/store/modules/WebSocketStateModule';
import { RoomModule } from '@/store/modules/RoomModule';

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

  private pieceStackKey = 0;

  // private gameField: GameField = new GameField();

  private boardState: IBoardState | null = null;

  private pieces: Array<IPiece | null> | null = null;

  private selectPieceId: number | null = null;

  private boardDisabled = true;

  private pieceStackDisabled = false;

  private showResultNotification = false;

  private resultState: boolean | null = null;

  private currentPlayerId: string | null = null;

  private currentPlayerName: string | null = null;

  private resultMessage: string | null = null;

  private isResultAgain = true;

  private timer = 60;

  mounted() {
    this.socket.on('leavePlayer', () => {
      this.showResultNotification = true;
      this.isResultAgain = false;
      this.resultMessage = '相手プレイヤーが退出しました。';
    });
    this.syncGameField();

    const timer = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.showResultNotification = true;
        this.resultState = false;
        clearInterval(timer);
      }
    }, 1000);
  }

  get socket() {
    return WebSocketStateModule.socket;
  }

  private isUserTurn() {
    return RoomModule.isUserTurn;
  }

  private actionMessage() {
    if (this.boardDisabled) {
      return '駒を選択して下さい。';
    }

    return 'ボードに配置して下さい。';
  }

  private leaveRoom() {
    this.socket.emit('leaveRoom', RoomModule.roomId);
    this.$router.push('/');
  }

  private setBoardPiece(payload: { width: number; height: number }) {
    if (this.selectPieceId !== null) {
      this.socket.emit('setPiece', RoomModule.roomId, payload.height, payload.width);
      this.syncGameField();
    }
  }

  private result() {
    this.socket.emit('judgeResult', RoomModule.roomId);
  }

  private setPhase(phase: 'select' | 'put') {
    if (phase === 'select') {
      this.boardDisabled = true;
      this.pieceStackDisabled = false;
    } else if (phase === 'put') {
      this.boardDisabled = false;
      this.pieceStackDisabled = true;
    }
  }

  private resetRoom() {
    this.socket.emit('resetRoom', RoomModule.roomId);
    this.syncGameField();
    this.showResultNotification = false;
  }

  @Watch('selectPieceId')
  private selectPiece() {
    if (this.selectPieceId !== null && this.currentPlayerId === RoomModule.userId) {
      this.socket.emit('selectPiece', RoomModule.roomId, this.selectPieceId);
      this.syncGameField();
    }
  }

  private syncGameField() {
    this.socket.emit('syncGameField', RoomModule.roomId);
    this.socket.on('boardState', (boardState: IBoardState) => {
      this.boardState = boardState;
      this.boardKey++;
    });
    this.socket.on('pieces', (item: {
      pieces: Array<IPiece | null>;
      selectPieceId: number;
    }) => {
      this.pieceStackKey++;
      this.pieces = item.pieces;
      if (item.selectPieceId !== undefined) {
        this.selectPieceId = item.selectPieceId;
      }
    });
    this.socket.on('phase', (phase: 'select' | 'put') => {
      this.setPhase(phase);
      if (phase === 'put') {
        this.timer = 60;
      }
    });
    this.socket.on('getCurrentPlayer', (player: IPlayer) => {
      this.currentPlayerId = player.id;
      this.currentPlayerName = player.name;
      if (this.currentPlayerId === RoomModule.userId) {
        RoomModule.SET_USER_TURN(true);
      } else {
        RoomModule.SET_USER_TURN(false);
      }
    });
    this.socket.on('getJudgeResult', (judge: boolean) => {
      this.showResultNotification = true;
      this.resultState = judge;
    });
    this.socket.on('resetRoom', () => {
      this.showResultNotification = false;
    });
  }
}
</script>
