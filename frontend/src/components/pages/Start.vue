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
          <v-card-title class="justify-center">ランダムマッチ</v-card-title>
          <v-card-text class="text-center">
            <v-btn @click="randomMatch">Matching</v-btn>
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
      <v-container v-if="isRandom">
        <v-row justify="center">Matching...</v-row>
        <v-row justify="center" class="mt-4">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
      </v-container>
      <v-container v-else fill-height>
        <v-row justify="center">
          ルームIDは「{{ roomId }}」です。
        </v-row>
        <v-row v-if="isShareEnabled" justify="center" class="mt-4">
            <v-btn @click="share">Share</v-btn>
        </v-row>
      </v-container>
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { WebSocketStateModule } from '@/store/modules/WebSocketStateModule';
import { RoomModule } from '@/store/modules/RoomModule';
import axios from 'axios';

@Component({
  name: 'Start',
})
export default class extends Vue {
  private loading = false;

  private playerName = '';

  private inputRoomId = '';

  private isRandom = false;

  get socket() {
    return WebSocketStateModule.socket;
  }

  get roomId() {
    return RoomModule.roomId;
  }

  get isShareEnabled() {
    return navigator.share;
  }

  private async randomMatch() {
    this.isRandom = true;

    const res = await axios.get(`${process.env.VUE_APP_API_BACKEND_URL}random_match_waiting_count`);
    const roomCount = Number(res.data.count);

    RoomModule.CREATE_USER_ID();
    RoomModule.SET_USER_NAME(this.playerName);

    if (roomCount > 0) {
      this.socket.emit('randomMatch', RoomModule.userId, RoomModule.userName);
      this.socket.on('indicateRoomId', (roomId: string) => {
        RoomModule.SET_ROOM_ID(roomId);
        this.$router.push('/main');
      });
    } else {
      await RoomModule.createRoomId();
      this.socket.emit('randomMatch', RoomModule.userId, RoomModule.userName, RoomModule.roomId);
      this.socket.on('roomPersonCount', (count: number) => {
        this.loading = true;
        if (count === 2) {
          this.loading = false;
          this.$router.push('/main');
        }
      });
    }
  }

  private async createRoom() {
    await RoomModule.createRoomId();
    // RoomModule.CREATE_ROOM_ID();
    RoomModule.CREATE_USER_ID();
    RoomModule.SET_USER_NAME(this.playerName);
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
    RoomModule.SET_USER_NAME(this.playerName);
    this.socket.emit('joinRoom', RoomModule.roomId, RoomModule.userId, RoomModule.userName);
    this.$router.push('/main');
  }

  private async share() {
    try {
      await navigator.share({
        text: RoomModule.roomId || '',
      });
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
