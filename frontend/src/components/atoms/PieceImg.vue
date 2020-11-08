<template>
  <v-img
    :contain="true"
    :height="200"
    :width="100"
    :src="require(`@/assets/pieces/${pieceId}.png`)"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'PieceImg',
})
export default class extends Vue {
  @Prop({ required: true })
  public pieceId!: number;
}
</script>
