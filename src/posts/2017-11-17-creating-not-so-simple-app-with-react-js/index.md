---
layout: post.hbs
title: "[Draft] Создание не самого простого Web-приложения с помощью TypeScript, ReactJS и более чем 20 вспомогательных библиотек."
date: 2017-11-17
collection: posts
tags:
  - React
  - JavaScript
  - TypeScript
---

Эта статья задумана как некая попытка собрать в одном месте набор инструментов и
подходов которые я сейчас использую для создания веб-приложений. Будет описан процесс создания клиентской части веб-приложения, а в качестве
серверной части будут использоваться публичные открытые API различных сервисов
таких как Google, Imgur и Gist. <!--cut-->

План:

- Введение и постановка задачи.
- Скелет и структура приложения: TypeScript, Webpack, React, Mocha.
- Внедрение зависимостей с Inversify (Dependency injection).
- Конфигурация и сохранение пользовательских настроек.
- CSS фреймворк Bulma + стили Bulmaswatch.
- GoldenLayout.
- CodeMirror.
- LogoJS.
- Markdown-it.
- Google API sign in.
- Локализация.

//TODO: finish this someday
