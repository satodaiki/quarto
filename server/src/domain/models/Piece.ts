export const PieceHole = {
  YES: 'yes',
  NO: 'no',
} as const;
type PieceHole = typeof PieceHole[keyof typeof PieceHole];

export const PieceHeight = {
  LOW: 'low',
  HIGH: 'high',
} as const;
type PieceHeight = typeof PieceHeight[keyof typeof PieceHeight];

export const PieceColor = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;
type PieceColor = typeof PieceColor[keyof typeof PieceColor];

export const PieceForm = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
} as const;
type PieceForm = typeof PieceForm[keyof typeof PieceForm];

export default class Piece {
    public readonly id: number;

    private hole: PieceHole;

    private color: PieceColor;

    private height: PieceHeight;

    private form: PieceForm;

    public constructor(id: number,
      hole: PieceHole,
      color: PieceColor,
      height: PieceHeight,
      form: PieceForm) {
      this.id = id;
      this.hole = hole;
      this.color = color;
      this.height = height;
      this.form = form;
    }

    public getHole() {
      return this.hole;
    }

    public getColor() {
      return this.color;
    }

    public getHeight() {
      return this.height;
    }

    public getForm() {
      return this.form;
    }
}
