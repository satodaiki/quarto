export default class Player {
    public id: string;

    public name: string;

    public pieceId?: number;

    constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
    }
}
