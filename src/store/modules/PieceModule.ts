import { getModule, Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store';
import Piece from '@/store/modules/models/Piece';

@Module({ dynamic: true, store, namespaced: true, name: 'gameField' })
export default class PieceState extends VuexModule {
    public pieces: Piece[] = [];
}