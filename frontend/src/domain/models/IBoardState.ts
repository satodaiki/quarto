import Piece from './IPiece';

export default class IBoardState {
  public squares: Array<Array<Piece | null>> = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
}
