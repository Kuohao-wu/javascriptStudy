function Person(name, age) {
  this.name = name
  this.age = age
}
// 实例公共方法
Person.prototype.sayHi = function() {
  console.log(this.name)
}

const ming = new Person('ming', 22)

function Student(hobby, ...rest) {
  this.hobby = hobby
  // 使用call进行实例属性继承
  Person.call(this, ...rest)
  // 实例私有方法
  this.getWork = function() {
    console.log('I can study')
  }
}

function Teacher() {
  this.getWork = function() {
    console.log('I am teacher')
  }
}
// 使用create继承Person
Teacher.prototype = Object.create(Person)

const lily = new Teacher('lily', 21)
lily.getWork()

const wang = new Student('wang', 20, 'reading')
console.log(wang)
