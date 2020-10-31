export default class Player {
    public playerId: string;

    public pieceId?: number;

    constructor(playerId: string) {
      this.playerId = playerId;
    }
}
