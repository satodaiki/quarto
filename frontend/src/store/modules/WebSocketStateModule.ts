import { VuexModule, Module, getModule } from 'vuex-module-decorators';
import io from 'socket.io-client';
import store from '@/store';

@Module({
  dynamic: true,
  store,
  namespaced: true,
  name: 'webSocketState',
})
export default class WebSocketState extends VuexModule {
  public socket = io.connect('http://localhost:3000');
}

export const WebSocketStateModule = getModule(WebSocketState);
