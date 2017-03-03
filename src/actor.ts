/**
 * Actor，致敬Erlang，Scala的akka的Actor model
 * Actor, 独立计算的执行单元
 * 我们不共享状态(share state), 只去transform state
 */
import { OrderedMap } from 'immutable'

type IMap = OrderedMap<string, any>;
type Route = {
  [name: string]: (state: IMap, params?: any) => IMap
};

export default class Actor {
  //记录当前的路由信息
  _route: Route;

  /**
   * 定义actor的默认状态
   * @returns {{}}
   */
  defaultState(): Object {
    return {};
  }

  /**
   * actor的mode的receive,被store在dispatch的时候调用
   * @param msg
   * @param state
   * @param param
   * @returns {Object}
   */
  receive(msg: string, state: IMap, param?: any): IMap {
    //this._route是在@Action标记中初始化完成
    const route = this._route || {};
    //获取处理的函数
    const fn = route[msg];

    //如果可以处理返回处理后的结果，否则直接返回state
    return fn ? fn.call(this, state, param) : state;
  }
}
