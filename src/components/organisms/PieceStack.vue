<template>
    <v-container>
        <v-row>
            <v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Piece } from '@/components/pages/Main.vue';

@Component({
  name: 'PieceStack',
})
export default class extends Vue {
    @Prop()
    private pieces: Piece[] = []

    mounted() {
        console.log(this.pieces);
    }
}
</script>