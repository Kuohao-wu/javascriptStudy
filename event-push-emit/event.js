(function() {
  // 事件容器
  var __EventData__ = {}

  /**
   * 对目标对象监听给定类型的事件，并且绑定处理函数
   * @name _on
   * @function
   * @grammar EventMemory.on(target, eventType, handler)
   * @param {Object} target 监听目标对象
   * @param {String} eventType 事件类型名
   * @param {Object Function} handler 处理函数
   * @return {Object | Boolean} 记录绑定信息的对象(成功的情况) | 布尔值flase, 标志失败(失败的情况)
   */
  
  // 这个target是为了方便传入的函数可以使用this，所以要显式指定上下文
  var _on = function(target, eventType, handler) { 
    if (!(Object.prototype.toString.call(handler) === "[object Function]")) {
      console.log("handler must be function")
      return false
    }
    eventType = String(eventType)
    if (!__EventData__.hasOwnProperty(eventType)) {
      __EventData__[eventType] = []
    }
    var _eventMemoryObj = {
      target: target,
      handler: handler,
      eventType: eventType,
      destroy: __destroy
    }
    __EventData__[eventType].push(_eventMemoryObj)
    return _eventMemoryObj
  }

  /**
   * 派发给定类型的事件, 会触发到此操作执行时所绑定的该类型事件的所有处理函数, 
   * 并且提供一个可选参数作为附加数据, 可以传递至处理函数的回调参数event.data中(什么? 一个附加参数嫌少? MDZZ还有一个参数解决不来的东西么?)
   * @name _emit
   * @function
   * @grammar EventMemory.emit(eventType[, additionalData])
   * @param {String} eventType 事件类型名
   * @param {Object} additionalData 可选参数 附加的数据对象
   */
  var _emit = function(eventType, additionalData) {
    if (__EventData__.hasOwnProperty(eventType)) {
      // 如果传递过来的数据不存在则给默认值为空
      additionalData = additionalData ? additionalData : {}
      var _event = {
        type: eventType,
        data: additionalData
      }
      // 执行事件队列
      __EventData__[eventType].forEach(item => {
        // call改变函数运行时的上下文
        item.handler.call(item.target, _event) 
      })
    }
  }

  /**
   * 绑定监听的数据对象私有方法, 可以注销该数据对应的监听操作(对应那一个对象, 对应的那一个事件, 对应的那一个处理函数)
   * @name __destroy
   * @function
   * @grammar {eventMemoryObj}.destroy()
   */
  var __destroy = function() {
    // indexOf也是可以搜索对象的，但是需要相同的引用
    var currentEventType = this.eventType
    var _index = __EventData__[currentEventType].indexOf(this)
    if (_index != -1) {
      __EventData__[currentEventType].splice(_index, 1)
    }
  }
  // 将Event挂载在window
  window.event = {
    on: _on,
    emit: _emit
  }
})()