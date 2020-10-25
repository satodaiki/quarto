import { getModule, Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "@/store";
import PieceState from "./PieceState";
import BoardState from "./BoardState";
import Player from "@/store/modules/models/Player";
import Piece from "@/store/modules/models/Piece";

@Module({ dynamic: true, store, namespaced: true, name: "gameField" })
export default class GameField extends VuexModule {
  public playerA: Player = new Player(0);
  public playerB: Player = new Player(1);
  public currentPlayer: Player | null = null;
  public pieceState: PieceState = new PieceState();
  public boardState: BoardState = new BoardState();
  public pieces: Piece[] = this.createPiece();

  //ボードに置かれているか
  public isBoardIn(width: number, height: number): boolean {
    return this.boardState.squares[width][height] == null ? true : false;
  }

  //ボードにピースをセット
  public setPiece(id: number, width: number, height: number): boolean {
    if (this.isBoardIn(width, height)) {
      this.boardState.squares[width][height] = this.pieces[id];
      if (
        this.getResultHorizontal() ||
        this.getResultVertical() ||
        this.getResultRightDownDiagonal() ||
        this.getResultRightUpDiagonal()
      )
        return true;
    }

    return false;
  }

  //相手プレイヤーに駒を渡す
  @Action({ rawError: true })
  public selectPiece(pieceId: number): void {
    if (this.currentPlayer!.playerId == this.playerA.playerId) {
      this.playerB.pieceId = pieceId;
      this.currentPlayer = this.playerB;
    } else {
      this.playerA.pieceId = pieceId;
      this.currentPlayer = this.playerA;
    }
  }

  //結果判定(横)
  public getResultHorizontal(): boolean {
    let baseHole;
    let baseColor;
    let baseHeight;
    let baseForm;

    for (var i = 0; i < 4; i++) {
      //判定のベース取得
      if (this.boardState.squares[i][0] != null) {
        baseHole = this.boardState.squares[i][0].getHole();
        baseColor = this.boardState.squares[i][0].getColor();
        baseHeight = this.boardState.squares[i][0].getHeight();
        baseForm = this.boardState.squares[i][0].getForm();
      } else {
        continue;
      }

      for (var j = 1; j < 4; j++) {
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

  //結果判定(縦)
  public getResultVertical(): boolean {
    let baseHole;
    let baseColor;
    let baseHeight;
    let baseForm;

    for (var i = 0; i < 4; i++) {
      //判定のベース取得
      if (this.boardState.squares[0][i] != null) {
        baseHole = this.boardState.squares[0][i].getHole();
        baseColor = this.boardState.squares[0][i].getColor();
        baseHeight = this.boardState.squares[0][i].getHeight();
        baseForm = this.boardState.squares[0][i].getForm();
      } else {
        continue;
      }

      for (var j = 1; j < 4; j++) {
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

  //結果判定(右下斜め)
  public getResultRightDownDiagonal(): boolean {
    let baseHole;
    let baseColor;
    let baseHeight;
    let baseForm;

    //判定のベース取得
    if (this.boardState.squares[0][0] != null) {
      baseHole = this.boardState.squares[0][0].getHole();
      baseColor = this.boardState.squares[0][0].getColor();
      baseHeight = this.boardState.squares[0][0].getHeight();
      baseForm = this.boardState.squares[0][0].getForm();
    } else {
      return false;
    }

    for (var i = 1; i < 4; i++) {
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

  //結果判定(右上斜め)
  public getResultRightUpDiagonal(): boolean {
    let baseHole;
    let baseColor;
    let baseHeight;
    let baseForm;

    //判定のベース取得
    if (this.boardState.squares[0][3] != null) {
      baseHole = this.boardState.squares[0][3].getHole();
      baseColor = this.boardState.squares[0][3].getColor();
      baseHeight = this.boardState.squares[0][3].getHeight();
      baseForm = this.boardState.squares[0][3].getForm();
    } else {
      return false;
    }

    for (var i = 1; i < 4; i++) {
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

  //ピースを作成
  public createPiece(): Piece[] {
    return [
      new Piece(0, "with", "black", "high", "circle"),
      new Piece(1, "with", "black", "high", "rectangle"),
      new Piece(2, "with", "black", "low", "circle"),
      new Piece(3, "with", "black", "low", "rectangle"),
      new Piece(4, "with", "white", "high", "circle"),
      new Piece(5, "with", "white", "high", "rectangle"),
      new Piece(6, "with", "white", "low", "circle"),
      new Piece(7, "with", "white", "low", "rectangle"),
      new Piece(8, "without", "black", "high", "circle"),
      new Piece(9, "without", "black", "high", "rectangle"),
      new Piece(10, "without", "black", "low", "circle"),
      new Piece(11, "without", "black", "low", "rectangle"),
      new Piece(12, "without", "white", "high", "circle"),
      new Piece(13, "without", "white", "high", "rectangle"),
      new Piece(14, "without", "white", "low", "circle"),
      new Piece(15, "without", "white", "low", "rectangle")
    ];
  }
}
