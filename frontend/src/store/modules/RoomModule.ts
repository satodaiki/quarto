import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import store from '@/store';
import shortid from 'shortid';
import axios from 'axios';

@Module({
  dynamic: true,
  store,
  namespaced: true,
  name: 'room',
})
export default class Room extends VuexModule {
  public roomId: string | null = null;

  public isUserTurn = false;

  public userId: string | null = null;

  public userName: string | null = null;

  @Mutation
  public CREATE_USER_ID() {
    this.userId = shortid.generate();
  }

  @Mutation
  public SET_USER_NAME(userName: string) {
    this.userName = userName;
  }

  @Mutation
  public CREATE_ROOM_ID() {
    this.roomId = shortid.generate();
  }

  @Mutation
  public SET_ROOM_ID(roomId: string) {
    this.roomId = roomId;
  }

  @Mutation
  public SET_USER_TURN(isUserTurn: boolean) {
    this.isUserTurn = isUserTurn;
  }

  @Action({ rawError: true })
  public async createRoomId() {
    try {
      const res = await axios.get(`${process.env.VUE_APP_API_BACKEND_URL}count_rooms`);
      const count = Number(res.data.count);

      let temp = count;

      let alphabet = '';
      let result = 0;
      let remainder = 0;
      let tempAlphabet = '';

      while (true) {
        result = Math.floor(temp / 26);
        remainder = (temp % 26) + 10;

        tempAlphabet = remainder.toString(36);

        alphabet = tempAlphabet + alphabet;

        if (result === 0) break;

        temp = result;
      }

      const roomId = alphabet.toUpperCase();

      this.SET_ROOM_ID(roomId);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const RoomModule = getModule(Room);
