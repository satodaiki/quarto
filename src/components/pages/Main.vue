<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- board -->
        <v-container>
          <v-row>
            <v-col></v-col>
          </v-row>
        </v-container>
        <!-- piece stack -->
        <PieceStack />
        <Piece :pieceId="4" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PieceStack from '@/components/organisms/PieceStack.vue';
import Piece from '@/components/atoms/Piece.vue';

@Component({
  name: 'Main',
  components: {
    PieceStack,
    Piece,
  },
})
export default class extends Vue {}
</script>
cxvbn
