import Piece from './Piece';

export default class IBoardState {
  public squares: Array<Array<Piece | null>> = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
}
