---
title: VSCodeの拡張機能を作った
id: made-vscode-extension
tags:
  - TypeScript
  - VSCode
date: 2016-12-22 19:31:47
---


半年くらい前から作業用のエディタをAtomからVSCodeに切り替えた。
TypeScriptに最適化されていてとても快適なのだが、Atomで常用していたあるプラグインの代替となる拡張機能が無かった。

[atom-regex-railroad-diagrams](https://github.com/klorenz/atom-regex-railroad-diagrams)というプラグインで、正規表現をダイアグラムとして表示してくれるというもの。
かなしいことに私は正規表現が苦手で、書いたパターンが実際にどんな文字列にマッチするのかイマイチイメージできないのだが、このプラグインを使うと視覚的にわかりやすい形で書いたパターンを確認できていた。

VSCodeに移行してからも、正規表現を書くときだけAtomを起動してダイアグラムを確認するような生活を送っていたのだが、それもかなしいのでVSCode向けに同じような機能を持った拡張機能を作ってみることにした。

[vscode-regex-railroad-diagrams](https://marketplace.visualstudio.com/items?itemName=kogai.regex-railroad-diagrams)

同じElectronベースのエディタということで中核となる実装はほとんどそのまま流用しつつ、VSCodeとの橋渡しに成るインタフェースを作った感じだ。
作ってみて思ったのが、同じElectronベースのエディタとはいえ、結構APIに違いがあるようだった。

特にAtomは直接プラグインのコードでDOM要素に手を触れることができるようだが、VSCodeではそういったインタフェースはないようで、特定のライフサイクルの時に呼ばれる関数にHTMLとして評価できる文字列を渡すことで細かくスタイリングしたHTML要素を描画した。
あと、Atomでは正規表現部分を囲むCSSクラスがあるので正規表現を表す文字列を簡単に取得できていたのだが、VSCodeではそういう風にはなっていなかったので、正規表現部分を抽出するコードを書く必要があった。

Atomだとこういう感じ
![Atomだとこういう感じ](/images/made-vscode-extension/atom-regex.png)

VSCodeだとこういう感じ
![VSCodeだとこういう感じ](/images/made-vscode-extension/vscode-regex.png)

よかったら使ってみて下さい。