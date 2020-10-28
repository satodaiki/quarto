import PieceState from './PieceState';
import BoardState from './BoardState';
import Player from './Player';
import Piece from './Piece';

export default class GameField {
    public currentPlayer: Player;

    public playerA: Player;

    public playerB: Player;

    public pieceState: PieceState;

    public boardState: BoardState;

    public pieces?: Piece[];

    constructor() {
      this.playerA = new Player(0);
      this.playerB = new Player(1);
      this.currentPlayer = this.playerA;
      this.pieceState = new PieceState();
      this.boardState = new BoardState();
      this.createPiece();
    }

    // ボードに置かれているか
    public isBoardIn(width: number, height: number): boolean {
      return !!((this.boardState.squares && this.boardState.squares[width][height] == null));
    }

    // ボードにピースをセット
    public setPiece(id: number, width: number, height: number): boolean {
      if (this.boardState.squares && this.pieces && this.isBoardIn(width, height)) {
        this.boardState.squares[width][height] = this.pieces[id];
        if (this.getResultHorizontal() || this.getResultVertical() || this.getResultRightDownDiagonal() || this.getResultRightUpDiagonal()) return true;
      }

      return false;
    }

    // 相手プレイヤーに駒を渡す
    public selectPiece(pieceId: number): void {
      if (this.currentPlayer.playerId == this.playerA.playerId) {
        this.playerB.pieceId = pieceId;
        this.currentPlayer = this.playerB;
      } else {
        this.playerA.pieceId = pieceId;
        this.currentPlayer = this.playerA;
      }
    }

    // 結果判定(横)
    public getResultHorizontal(): boolean {
      let baseHole;
      let baseColor;
      let baseHeight;
      let baseForm;

      for (let i = 0; i < 4; i++) {
        // 判定のベース取得
        if (this.boardState.squares && this.boardState.squares[i][0] != null) {
          baseHole = this.boardState.squares[i][0].getHole();
          baseColor = this.boardState.squares[i][0].getColor();
          baseHeight = this.boardState.squares[i][0].getHeight();
          baseForm = this.boardState.squares[i][0].getForm();
        } else {
          continue;
        }

        for (let j = 1; j < 4; j++) {
          if (this.boardState.squares[i][j] != null) {
            if (baseHole != this.boardState.squares[i][j].getHole()) break;
            if (baseColor != this.boardState.squares[i][j].getColor()) break;
            if (baseForm != this.boardState.squares[i][j].getForm()) break;
            if (baseHeight != this.boardState.squares[i][j].getHeight()) break;
          } else {
            break;
          }

          return true;
        }
      }

      return false;
    }

    // 結果判定(縦)
    public getResultVertical(): boolean {
      let baseHole;
      let baseColor;
      let baseHeight;
      let baseForm;

      for (let i = 0; i < 4; i++) {
        // 判定のベース取得
        if (this.boardState.squares && this.boardState.squares[0][i] != null) {
          baseHole = this.boardState.squares[0][i].getHole();
          baseColor = this.boardState.squares[0][i].getColor();
          baseHeight = this.boardState.squares[0][i].getHeight();
          baseForm = this.boardState.squares[0][i].getForm();
        } else {
          continue;
        }

        for (let j = 1; j < 4; j++) {
          if (this.boardState.squares[j][i] != null) {
            if (baseHole != this.boardState.squares[j][i].getHole()) break;
            if (baseColor != this.boardState.squares[j][i].getColor()) break;
            if (baseForm != this.boardState.squares[j][i].getForm()) break;
            if (baseHeight != this.boardState.squares[j][i].getHeight()) break;
          } else {
            break;
          }

          return true;
        }
      }

      return false;
    }

    // 結果判定(右下斜め)
    public getResultRightDownDiagonal(): boolean {
      let baseHole;
      let baseColor;
      let baseHeight;
      let baseForm;

      // 判定のベース取得
      if (this.boardState.squares && this.boardState.squares[0][0] != null) {
        baseHole = this.boardState.squares[0][0].getHole();
        baseColor = this.boardState.squares[0][0].getColor();
        baseHeight = this.boardState.squares[0][0].getHeight();
        baseForm = this.boardState.squares[0][0].getForm();
      } else {
        return false;
      }

      for (let i = 1; i < 4; i++) {
        if (this.boardState.squares[i][i] != null) {
          if (baseHole != this.boardState.squares[i][i].getHole()) return false;
          if (baseColor != this.boardState.squares[i][i].getColor()) return false;
          if (baseForm != this.boardState.squares[i][i].getForm()) return false;
          if (baseHeight != this.boardState.squares[i][i].getHeight()) return false;
        } else {
          return false;
        }
      }

      return true;
    }

    // 結果判定(右上斜め)
    public getResultRightUpDiagonal(): boolean {
      let baseHole;
      let baseColor;
      let baseHeight;
      let baseForm;

      // 判定のベース取得
      if (this.boardState.squares && this.boardState.squares[0][3] != null) {
        baseHole = this.boardState.squares[0][3].getHole();
        baseColor = this.boardState.squares[0][3].getColor();
        baseHeight = this.boardState.squares[0][3].getHeight();
        baseForm = this.boardState.squares[0][3].getForm();
      } else {
        return false;
      }

      for (let i = 1; i < 4; i++) {
        if (this.boardState.squares[i][3 - i] != null) {
          if (baseHole != this.boardState.squares[i][3 - i].getHole()) return false;
          if (baseColor != this.boardState.squares[i][3 - i].getColor()) return false;
          if (baseForm != this.boardState.squares[i][3 - i].getForm()) return false;
          if (baseHeight != this.boardState.squares[i][3 - i].getHeight()) return false;
        } else {
          return false;
        }
      }

      return true;
    }

    // ピースを作成
    public createPiece(): void {
      if (this.pieces) {
        this.pieces[0] = new Piece(0, 'with', 'black', 'high', 'circle');
        this.pieces[1] = new Piece(1, 'with', 'black', 'high', 'rectangle');
        this.pieces[2] = new Piece(2, 'with', 'black', 'low', 'circle');
        this.pieces[3] = new Piece(3, 'with', 'black', 'low', 'rectangle');
        this.pieces[4] = new Piece(4, 'with', 'white', 'high', 'circle');
        this.pieces[5] = new Piece(5, 'with', 'white', 'high', 'rectangle');
        this.pieces[6] = new Piece(6, 'with', 'white', 'low', 'circle');
        this.pieces[7] = new Piece(7, 'with', 'white', 'low', 'rectangle');
        this.pieces[8] = new Piece(8, 'without', 'black', 'high', 'circle');
        this.pieces[9] = new Piece(9, 'without', 'black', 'high', 'rectangle');
        this.pieces[10] = new Piece(10, 'without', 'black', 'low', 'circle');
        this.pieces[11] = new Piece(11, 'without', 'black', 'low', 'rectangle');
        this.pieces[12] = new Piece(12, 'without', 'white', 'high', 'circle');
        this.pieces[13] = new Piece(13, 'without', 'white', 'high', 'rectangle');
        this.pieces[14] = new Piece(14, 'without', 'white', 'low', 'circle');
        this.pieces[15] = new Piece(15, 'without', 'white', 'low', 'rectangle');
      }
    }
}
