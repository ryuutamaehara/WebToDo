// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

var vm = new Vue({
  el: '#todo',
  data: {
    todos: []
  },
  methods: {
    // ToDo 追加の処理
    doAdd: function(event, value) {

      var comment = this.$refs.comment

      // 入力がなければ何もしないで return
      if (!comment.value.length) {
        return
      }

      // オブジェクトを todos リストへ push
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
      })

      // フォーム要素を空にする
      comment.value = ''
    }
  },
  watch: {
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる?
      deep: true
    }
  },
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  },
  // 削除の処理
  doRemove: function(item) {
    var index = this.todos.indexOf(item)
    this.todos.splice(index, 1)
  }
 
})
