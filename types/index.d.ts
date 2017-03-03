import { EventEmitter } from 'events'
import { Map } from 'immutable'
import * as React from 'react'

export = iflux2

declare namespace iflux2 {
  export type IMap = Map<string, any>
  export type Handler = (state: IMap) => void;

  export interface IOptions {
    debug?: boolean;
    ctxStoreName?: string;
  }

  export interface ReduxAtion {
    type: string;
  }

  export class Actor {
    defaultState(): Object;
  }

  export class Store {
    constructor(props?: IOptions);
    dispatch(msg: string | ReduxAtion, params?: any): void;
    batchDispatch(actions: Array<[string, any] | ReduxAtion | string>): void;
    transaction(cb: () => void): void;
    bindActor(): Array<Actor>;
    bigQuery(ql: QueryLang, params: { debug?: boolean }): any;
    state(): IMap;
    subscribe(cb: Handler): void;
    unsubscribe(cb: Handler): void;
  }

  export class QueryLang {
    constructor(name: string, lang: Array<any>);
    id(): number;
    name(): string;
    lang(): Array<any>;
  }

  export function QL(
    name: string,
    lang: Array<any>
  ): QueryLang;

  export const msg: EventEmitter;

  export function Action(msg: string): Function;

  export function Relax<TFunction extends React.ComponentClass<any>>(
    target: TFunction
  ): TFunction;

  type TStore = typeof Store
  type Wrapper<IProps> = React.ComponentClass<IProps>;

  export function StoreProvider<TFunction extends React.ComponentClass<any>>(
    AppStore: TStore,
    opts?: IOptions
  ): (Base: TFunction) => any;
}