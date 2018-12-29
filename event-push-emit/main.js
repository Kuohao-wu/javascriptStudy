;(function() {
  const eventBus = {}
  // 订阅事件
  function _on(eventType, handler) {
    if (eventBus[eventType] === undefined) eventBus[eventType] = []
    const eventObj = {
      handler: handler
    }
    eventBus[eventType].push(eventObj)
  }
  // 发布事件
  function _emit(eventType, data) {
    eventBus[eventType].forEach(item => {
      item.handler(data)
    })
  }
  window.event = {
    on: _on,
    emit: _emit
  }
})()