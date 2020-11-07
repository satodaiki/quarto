import {
  VuexModule,
  Module,
  getModule,
  Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import shortid from 'shortid';

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
}

export const RoomModule = getModule(Room);
