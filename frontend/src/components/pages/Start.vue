<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-text-field
              label="Player Name"
              v-model="playerName"
              :rules="[() => !!playerName || 'This field is required']"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="justify-center">部屋作成</v-card-title>
          <v-card-text class="text-center">
            <v-btn @click="createRoom">Create</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title class="justify-center">部屋に入る</v-card-title>
          <v-card-text class="text-center">
            <v-text-field
              label="room id"
              v-model="inputRoomId"
            />
            <v-btn @click="joinRoom">Join</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-container fill-height>
        <v-row justify="center">
          ルームIDは「{{ roomId }}」です。
        </v-row>
      </v-container>
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { WebSocketStateModule } from '@/store/modules/WebSocketStateModule';
import { RoomModule } from '@/store/modules/RoomModule';

@Component({
  name: 'Start',
})
export default class extends Vue {
  private loading = false;

  private playerName?: string;

  private inputRoomId = '';

  get socket() {
    return WebSocketStateModule.socket;
  }

  get roomId() {
    return RoomModule.roomId;
  }

  private async createRoom() {
    RoomModule.CREATE_ROOM_ID();
    RoomModule.CREATE_USER_ID();
    RoomModule.SET_USER_NAME(this.playerName!);
    this.socket.emit('joinRoom', RoomModule.roomId, RoomModule.userId, RoomModule.userName, true);
    this.socket.on('roomPersonCount', (count: number) => {
      this.loading = true;
      if (count === 2) {
        this.loading = false;
        this.$router.push('/main');
      }
    });
  }

  private async joinRoom() {
    RoomModule.SET_ROOM_ID(this.inputRoomId);
    RoomModule.CREATE_USER_ID();
    RoomModule.SET_USER_NAME(this.playerName!);
    this.socket.emit('joinRoom', RoomModule.roomId, RoomModule.userId, RoomModule.userName);
    this.$router.push('/main');
  }
}
</script>
