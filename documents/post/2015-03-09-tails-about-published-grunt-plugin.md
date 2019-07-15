---
title: "Gruntのプラグインを作って公開してみた"
id: create-grunt-plugin
date: 2015-02-12 13:43:41 +0900
tags:
  - node.js
  - grunt
  - npm
---

現在担当している業務で、ちょっとしたタスクが出てきた。
あるJSONファイルのデータを元に、別のJSONファイルを生成するというものだ。

イメージはこんな感じ。

`元のJSONファイルの内容(src.json)`

~~~js
[
  {
    "foo": "bar"
  }
]
~~~

`生成したJSONファイルの内容(dest.json)`

~~~js
[
{
"foo": "bar",
"baz": "foobar"
}
]
~~~

元のJSONファイルを編集するたびに生成先のJSONを編集するとかやってられないので、gruntプラグインで目的に合致しているものがないか探したがなかった。（このプラグインで出来るよというのあったら教えて下さい！）

そこでnode.jsのfsモジュールを使ってJSONファイル(`dest.json`)を生成するコードを書いて、grunt-shellで逐次実行するようにした。

しばらくそれで問題なかったが、よくよく考えるとshellで逐次実行しなくても、gruntプラグインとして直接実行できるのでは？と気付いた。
調べてみると、使っていたnode.jsのコードをちょっと変えるだけでgruntプラグインとして公開出来そうだったので、試してみた。

Qiitaのこの記事を参考にした。
[grunt-pluginの作り方と解剖](http://qiita.com/fnobi/items/5590e7e92b4f2bd81d04)

作ったものがこちら
[grunt-json-extend](https://www.npmjs.com/package/grunt-json-extend)

自分以外に使う人はいなかろう、と思いつつ公開したが、日に数回程はダウンロードされている模様。
ダウンロード結果の解析は見れないっぽいのでどういう目的で使われているのか全然わからないが、誰かの役に立っているのなら嬉しいな。
使ったことある人、もしこのブログを見ていたらどんな使い方をしているか教えて下さい。

ちなみにこのプラグインを公開したちょっと後にgulpを初めて使ってみて`gulpfile.js`の短さに感動してしまったので、
今後の新規案件では`gulp`でタスク処理するようになると思います。