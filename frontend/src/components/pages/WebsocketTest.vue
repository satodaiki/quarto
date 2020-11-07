<template>
  <v-container>
    <v-text-field
      label="Room ID"
      v-model="roomId"
    />
    <v-btn @click="send">送信</v-btn>
    <v-row v-for="chat in testChatList" :key="chat">
      <div>{{ chat }}</div>
    </v-row>
    <v-overlay :value="loading"></v-overlay>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import io from 'socket.io-client';

@Component({
  name: 'WebsocketTest',
})
export default class extends Vue {
  private socket?: SocketIOClient.Socket;

  private testChatList: string[] = [];

  private roomId = '';

  private loading = false;

  created() {
    this.socket = io.connect('http://localhost:3000');
  }

  private send() {
    this.socket?.emit('create_room', this.roomId);
    this.socket?.on('room_person_count', (count: number) => {
      this.loading = true;
      if (count === 2) {
        this.loading = false;
        this.$router.push('/main');
      }
    });
  }

  private zeroPadding(num: number, length: number) {
    return (Array(length).join('0') + num).slice(-length);
  }
}
</script>
