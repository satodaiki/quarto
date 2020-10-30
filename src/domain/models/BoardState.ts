import Piece from './Piece';

export default class BoardState {
  public squares: Array<Array<Piece | null>> = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  // ボードに置かれているか
  public isBoardIn(width: number, height: number): boolean {
    return !!(this.squares && this.squares[height][width] == null);
  }
}
