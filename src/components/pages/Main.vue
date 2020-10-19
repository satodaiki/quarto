<template>
    <v-container>
        <v-row>
            <v-col>
                <!-- board -->
                <v-container>
                    <v-row>
                        <v-col>
                        </v-col>
                    </v-row>
                </v-container>
                <!-- piece stack -->
                <v-container>
                    <v-row>
                        <v-col>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Piece {
    hole: 'yes' | 'no'
    height: 'low' | 'high'
    color: 'dark' | 'light'
    form: 'rectangle' | 'circle'
}

@Component({
  name: 'Main',
})
export default class extends Vue {
    private pieces: Piece[] = []
}
</script>
