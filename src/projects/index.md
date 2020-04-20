---
layout: post.hbs
title: Projects
---

Sometimes I have some free time and urgent desire to code something different. I really like to do experiments and learn new stuff. And sometimes small experiment evolves into a project. I do also have a [Github profile](https://github.com/megaboich).

---

### Linked graph

<img class="project-card-img" src="https://github.com/megaboich/linked-graph/raw/master/docs/linked-graph-demo-optimized.gif">
</img>

[Linked graph](https://github.com/megaboich/linked-graph) is a demo Web application which allows to build, edit and view linked graph data structures. One of important functionalities is a live layout which adjusts positions of objects based on link constraints between them. This layout calculation is provided by nice [WebCola](https://github.com/tgdwyer/WebCola) JavaScript library with is used in direct combination with React rendering. Awesome library [D3](https://d3js.org/) was intentionally not used here.

Features:

- Adding new objects and connections.
- Move object with drag and drop.
- Editing of objects and managing connections.
- Automatic live graph force layout.
- Displaying link directions and text.
- Zooming and panning.
- Mobile friendly.
- Possibility to undo 5 last operations.

---

### Logo playground

<img class="project-card-img" src="https://raw.githubusercontent.com/logolang/logo-playground/master/content/images/square-logo-160.png">
</img>

[Logo playground](https://github.com/logolang/logo-playground) is an online IDE for LOGO programming language with ability to write and execute programs directly in web browser.

LOGO was my first programming language which I learned when I was 10 years old, so I decided to create a decent own-made environment to fulfill my nostalgia and have some fun during the process.

This project turned to be quite long lasting, initially I started it to try different ways of organizing React frontend application. I refactored it several times trying different architecture approaches experimenting with reactive event model [RxJS](https://rxjs-dev.firebaseapp.com/) or dependency injection with [Inversify](http://inversify.io/) library. At last I settled on "classic" React + Redux combination with Redux-thunk middleware.
I still dream of writing some sort of documentation wrap-up for this project.

---

### 2048 game

<img class="project-card-img" src="https://github.com/megaboich/2048/raw/master/2048-demo.gif">
</img>

2048 is a single-player sliding block puzzle game. You need to
move blocks in order to combine the same tiles. The goal is to
reach 2048 or a maximum you can.

This is just another implementation of [2048 Game](https://github.com/gabrielecirulli/2048) initially written by Gabriele Cirulli.
Fun project to get my hands to work with some technologies.

Demo is deployed here: [https://megaboich.github.io/2048/](https://megaboich.github.io/2048/).

Main goal of this project was to make me more familiar with TypeScript programming. Also here I used amazing JavaScript library for canvas rendering [PixiJS](https://www.pixijs.com/).

---

### Javascript Map Parser

<img class="project-card-img" src="https://raw.githubusercontent.com/megaboich/js-map-parser/master/site/npp/npp.png">
</img>

[JavaScript map parser](https://github.com/megaboich/js-map-parser) is an extension for Visual Studio and Notepad++ to show panel with hierarchy structure of your JavaScript file. I created this tool to improve navigation over monstrous spaghetti-styled legacy JavaScript codebase.

Now this extension is mostly obsolete unless you are stuck in previous era and still working with ES5.
