<template>
  <v-img
    :contain="true"
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
