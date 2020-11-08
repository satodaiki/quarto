// import PieceState from './PieceState';
import BoardState from './BoardState';
import Player from './Player';
import Piece, {
  PieceHeight,
  PieceHole,
  PieceColor,
  PieceForm,
} from './Piece';

export default class GameField {
  public currentPlayer: Player;

  public playerA: Player;

  public playerB: Player;

  public phase: 'select' | 'put' = 'select';

  // public selectPieceId?: number;

  // public pieceState: PieceState;

  public boardState: BoardState;

  public pieces: Array<Piece | null> = [];

  constructor(playerA: Player, playerB: Player) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.currentPlayer = this.playerA;
    // this.pieceState = new PieceState();
    this.boardState = new BoardState();
    this.createPiece();
  }

  // ボードにピースをセット
  public setPiece(width: number, height: number): void {
    if (this.currentPlayer.pieceId !== undefined
      && this.boardState.isBoardIn(width, height)) {
      this.boardState.squares[height][width] = this.pieces[this.currentPlayer.pieceId];
      delete this.pieces[this.currentPlayer.pieceId];
      this.phase = 'select';
    }
  }

  // 判定結果を返す
  public getJudgeResult() {
    if (
      this.getResultHorizontal()
      || this.getResultVertical()
      || this.getResultRightDownDiagonal()
      || this.getResultRightUpDiagonal()
    ) {
      return true;
    }

    return false;
  }

  // 相手プレイヤーに駒を渡す
  public selectPiece(pieceId: number): void {
    this.togglePlayer();
    this.currentPlayer.pieceId = pieceId;
    this.phase = 'put';
  }

  // プレイヤーの切り替え
  private togglePlayer() {
    if (this.currentPlayer.id === this.playerA.id) {
      this.currentPlayer = this.playerB;
    } else {
      this.currentPlayer = this.playerA;
    }
  }

  // 結果判定(横)
  public getResultHorizontal(): boolean {
    let baseHole;
    let baseColor;
    let baseHeight;
    let baseForm;
    let matchHoleCnt;
    let matchColorCnt;
    let matchHeightCnt;
    let matchFormCnt;

    for (let i = 0; i < 4; i++) {
      if (this.boardState.squares && this.boardState.squares[i][0] !== null) {
        baseHole = this.boardState.squares[i][0]!.getHole();
        baseColor = this.boardState.squares[i][0]!.getColor();
        baseHeight = this.boardState.squares[i][0]!.getHeight();
        baseForm = this.boardState.squares[i][0]!.getForm();
        matchHoleCnt = 1;
        matchColorCnt = 1;
        matchHeightCnt = 1;
        matchFormCnt = 1;
      } else {
        continue;
      }

      for (let j = 1; j < 4; j++) {
        if (this.boardState.squares[i][j] !== null) {
          if (baseHole == this.boardState.squares[i][j]!.getHole()) matchHoleCnt++;
          if (baseColor == this.boardState.squares[i][j]!.getColor()) matchColorCnt++;
          if (baseForm == this.boardState.squares[i][j]!.getForm()) matchFormCnt++;
          if (baseHeight == this.boardState.squares[i][j]!.getHeight()) matchHeightCnt++;
        } else {
          break;
        }
      }

      if (
        matchHoleCnt == 4
        || matchColorCnt == 4
        || matchFormCnt == 4
        || matchHeightCnt == 4
      ) {
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
    let matchHoleCnt;
    let matchColorCnt;
    let matchHeightCnt;
    let matchFormCnt;

    for (let i = 0; i < 4; i++) {
      // 判定のベース取得
      if (this.boardState.squares && this.boardState.squares[0][i] !== null) {
        baseHole = this.boardState.squares[0][i]!.getHole();
        baseColor = this.boardState.squares[0][i]!.getColor();
        baseHeight = this.boardState.squares[0][i]!.getHeight();
        baseForm = this.boardState.squares[0][i]!.getForm();
        matchHoleCnt = 1;
        matchColorCnt = 1;
        matchHeightCnt = 1;
        matchFormCnt = 1;
      } else {
        continue;
      }

      for (let j = 1; j < 4; j++) {
        if (this.boardState.squares[j][i] !== null) {
          if (baseHole == this.boardState.squares[j][i]!.getHole()) matchHoleCnt++;
          if (baseColor == this.boardState.squares[j][i]!.getColor()) matchColorCnt++;
          if (baseForm == this.boardState.squares[j][i]!.getForm()) matchFormCnt++;
          if (baseHeight == this.boardState.squares[j][i]!.getHeight()) matchHeightCnt++;
        } else {
          break;
        }
      }

      if (
        matchHoleCnt == 4
        || matchColorCnt == 4
        || matchFormCnt == 4
        || matchHeightCnt == 4
      ) {
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
    let matchHoleCnt = 1;
    let matchColorCnt = 1;
    let matchHeightCnt = 1;
    let matchFormCnt = 1;

    // 判定のベース取得
    if (this.boardState.squares && this.boardState.squares[0][0] !== null) {
      baseHole = this.boardState.squares[0][0].getHole();
      baseColor = this.boardState.squares[0][0].getColor();
      baseHeight = this.boardState.squares[0][0].getHeight();
      baseForm = this.boardState.squares[0][0].getForm();
    } else {
      return false;
    }

    for (let i = 1; i < 4; i++) {
      if (this.boardState.squares[i][i] !== null) {
        if (baseHole == this.boardState.squares[i][i]!.getHole()) matchHoleCnt++;
        if (baseColor == this.boardState.squares[i][i]!.getColor()) matchColorCnt++;
        if (baseForm == this.boardState.squares[i][i]!.getForm()) matchFormCnt++;
        if (baseHeight == this.boardState.squares[i][i]!.getHeight()) matchHeightCnt++;
      } else {
        return false;
      }

      if (
        matchHoleCnt == 4
        || matchColorCnt == 4
        || matchFormCnt == 4
        || matchHeightCnt == 4
      ) {
        return true;
      }
    }

    return false;
  }

  // 結果判定(右上斜め)
  public getResultRightUpDiagonal(): boolean {
    let baseHole;
    let baseColor;
    let baseHeight;
    let baseForm;
    let matchHoleCnt = 1;
    let matchColorCnt = 1;
    let matchHeightCnt = 1;
    let matchFormCnt = 1;

    // 判定のベース取得
    if (this.boardState.squares && this.boardState.squares[0][3] !== null) {
      baseHole = this.boardState.squares[0][3].getHole();
      baseColor = this.boardState.squares[0][3].getColor();
      baseHeight = this.boardState.squares[0][3].getHeight();
      baseForm = this.boardState.squares[0][3].getForm();
    } else {
      return false;
    }

    for (let i = 1; i < 4; i++) {
      if (this.boardState.squares[i][3 - i] !== null) {
        if (baseHole == this.boardState.squares[i][3 - i]!.getHole()) matchHoleCnt++;
        if (baseColor == this.boardState.squares[i][3 - i]!.getColor()) matchColorCnt++;
        if (baseForm == this.boardState.squares[i][3 - i]!.getForm()) matchFormCnt++;
        if (baseHeight == this.boardState.squares[i][3 - i]!.getHeight()) matchHeightCnt++;
      } else {
        return false;
      }

      if (
        matchHoleCnt == 4
        || matchColorCnt == 4
        || matchFormCnt == 4
        || matchHeightCnt == 4
      ) {
        return true;
      }
    }

    return false;
  }

  // ピースを作成
  public createPiece(): void {
    this.pieces[0] = new Piece(
      0,
      PieceHole.YES,
      PieceColor.DARK,
      PieceHeight.HIGH,
      PieceForm.CIRCLE,
    );
    this.pieces[1] = new Piece(
      1,
      PieceHole.YES,
      PieceColor.DARK,
      PieceHeight.HIGH,
      PieceForm.RECTANGLE,
    );
    this.pieces[2] = new Piece(
      2,
      PieceHole.YES,
      PieceColor.DARK,
      PieceHeight.LOW,
      PieceForm.CIRCLE,
    );
    this.pieces[3] = new Piece(
      3,
      PieceHole.YES,
      PieceColor.DARK,
      PieceHeight.LOW,
      PieceForm.RECTANGLE,
    );
    this.pieces[4] = new Piece(
      4,
      PieceHole.YES,
      PieceColor.LIGHT,
      PieceHeight.HIGH,
      PieceForm.CIRCLE,
    );
    this.pieces[5] = new Piece(
      5,
      PieceHole.YES,
      PieceColor.LIGHT,
      PieceHeight.HIGH,
      PieceForm.RECTANGLE,
    );
    this.pieces[6] = new Piece(
      6,
      PieceHole.YES,
      PieceColor.LIGHT,
      PieceHeight.LOW,
      PieceForm.CIRCLE,
    );
    this.pieces[7] = new Piece(
      7,
      PieceHole.YES,
      PieceColor.LIGHT,
      PieceHeight.LOW,
      PieceForm.RECTANGLE,
    );
    this.pieces[8] = new Piece(
      8,
      PieceHole.NO,
      PieceColor.DARK,
      PieceHeight.HIGH,
      PieceForm.CIRCLE,
    );
    this.pieces[9] = new Piece(
      9,
      PieceHole.NO,
      PieceColor.DARK,
      PieceHeight.HIGH,
      PieceForm.RECTANGLE,
    );
    this.pieces[10] = new Piece(
      10,
      PieceHole.NO,
      PieceColor.DARK,
      PieceHeight.LOW,
      PieceForm.CIRCLE,
    );
    this.pieces[11] = new Piece(
      11,
      PieceHole.NO,
      PieceColor.DARK,
      PieceHeight.LOW,
      PieceForm.RECTANGLE,
    );
    this.pieces[12] = new Piece(
      12,
      PieceHole.NO,
      PieceColor.LIGHT,
      PieceHeight.HIGH,
      PieceForm.CIRCLE,
    );
    this.pieces[13] = new Piece(
      13,
      PieceHole.NO,
      PieceColor.LIGHT,
      PieceHeight.HIGH,
      PieceForm.RECTANGLE,
    );
    this.pieces[14] = new Piece(
      14,
      PieceHole.NO,
      PieceColor.LIGHT,
      PieceHeight.LOW,
      PieceForm.CIRCLE,
    );
    this.pieces[15] = new Piece(
      15,
      PieceHole.NO,
      PieceColor.LIGHT,
      PieceHeight.LOW,
      PieceForm.RECTANGLE,
    );
  }
}
