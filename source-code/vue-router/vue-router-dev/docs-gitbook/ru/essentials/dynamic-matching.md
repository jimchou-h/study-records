# Динамические пути

Очень часто требуется сопоставить компонент с множеством путей по указанному шаблону. Например, мы можем использовать компонент `User` для всех пользователей в соответствии с их ID. Во `Vue-router` мы можем указать динамический сегмент в пути для этой цели:

``` js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // динамические сегменты начинаются с двоеточия
    { path: '/user/:id', component: User }
  ]
})
```

Теперь все URL вида `/user/foo` или `/user/bar` соответствуют одному пути.

Динамический сегмент обозначается двоеточием `:`. При совпадении пути, значение динамического сегмента можно получить через `this.$route.params` для каждого компонента. Например, мы можем отобразить ID текущего пользователя, немного изменив шаблон:

``` js
const User = {
  template: '<div>Пользователь {{ $route.params.id }}</div>'
}
```

Посмотреть на пример вживую можно [здесь](https://jsfiddle.net/yyx990803/4xfa2f19/).

Может быть несколько динамических сегментов в одном пути. Для каждого сегмента появится соответствующее свойство в `$route.params`. Например:

| Шаблон | Совпадающий путь | $route.params |
|---------|------|--------|
| /user/:username | /user/evan | `{ username: 'evan' }` |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

Помимо `$route.params`, объект `$route` также позволяет получить доступ к другой полезной информации, например `$route.query` (если URL содержит строку запроса), `$route.hash`, и т.д. Подробнее в [справочнике API](../api/route-object.md).

### Отслеживание изменений параметров

Важно отметить, что при переходе от `/user/foo` к `/user/bar` **будет повторно использован тот же самый экземпляр компонента**. Поскольку оба пути указывают на один и тот же компонент, этот подход эффективнее, чем уничтожение и повторное создание экземпляра. **Но это означает, что хуки жизненного цикла компонента при этом вызваны не будут**.

Чтобы отследить изменения параметров пути в рамках компонента, нужно просто установить наблюдение за объектом `$route`:

``` js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // обработка изменений параметров пути...
    }
  }
}
```

Или можно воспользоваться хуком `beforeRouteUpdate`, добавленным в версии 2.2:

``` js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // обработка изменений параметров пути...
    // не забудьте вызывать next()
  }
}
```

### Продвинутые возможности

`Vue-router` использует [path-to-regexp](https://github.com/pillarjs/path-to-regexp) в качестве движка для проверки совпадения путей, что позволяет задействовать многие продвинутые возможности, включая опциональные динамические сегменты и регулярные выражения. [Документация библиотеки](https://github.com/pillarjs/path-to-regexp#parameters) содержит информацию об этих возможностях роутинга, а [этот пример](https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js) — о том, как использовать их совместно с `Vue-router`.

### Приоритетность при совпадении путей

Иногда один и тот же URL может совпасть с несколькими путями. В таких случаях приоритет определяется порядком определения путей: чем раньше определён путь, тем выше у него приоритет.