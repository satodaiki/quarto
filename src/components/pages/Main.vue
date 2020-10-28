<template>
  <v-container>
    <v-row>
      <v-col>
        <Board />
      </v-col>
      <v-col>
        <PieceStack />
      </v-col>
    </v-row>
    <!-- <Piece :pieceId="4" /> -->
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from '@/components/organisms/Board.vue';
import PieceStack from '@/components/organisms/PieceStack.vue';
import Piece from '@/components/atoms/Piece.vue';

@Component({
  name: 'Main',
  components: {
    Board,
    PieceStack,
    Piece,
  },
})
export default class extends Vue {}
</script>
cxvbn
