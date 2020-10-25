<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- board -->
        <v-container>
          <v-row>
            <v-col> </v-col>
          </v-row>
        </v-container>
        <!-- piece stack -->
        <piece-stack :pieces="pieceStack" />
        <Piece />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import PieceStack from "@/components/organisms/PieceStack.vue";
import Piece from "@/components/atoms/Piece.vue";

export const PieceHole = {
  YES: "yes",
  NO: "no"
} as const;
type PieceHole = typeof PieceHole[keyof typeof PieceHole];

export const PieceHeight = {
  LOW: "low",
  HIGH: "high"
} as const;
type PieceHeight = typeof PieceHeight[keyof typeof PieceHeight];

export const PieceColor = {
  DARK: "dark",
  LIGHT: "light"
} as const;
type PieceColor = typeof PieceColor[keyof typeof PieceColor];

export const PieceForm = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle"
} as const;
type PieceForm = typeof PieceForm[keyof typeof PieceForm];

export interface IPiece {
  hole: PieceHole;
  height: PieceHeight;
  color: PieceColor;
  form: PieceForm;
}

@Component({
  name: "Main",
  components: {
    PieceStack,
    Piece
  }
})
export default class extends Vue {
  private pieceStackPieces: IPiece[] = [];
  private boardPieces: IPiece[] = [];

  async mounted() {
    for (const form of Object.values(PieceForm)) {
      for (const color of Object.values(PieceColor)) {
        for (const height of Object.values(PieceHeight)) {
          for (const hole of Object.values(PieceHole)) {
            this.pieceStackPieces.push({
              hole,
              height,
              color,
              form
            });
          }
        }
      }
    }
  }
}
</script>
