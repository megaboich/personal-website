---
layout: post
title: Javascript implementation of custom A-Star algorithm
date: 2013-06-11
readingTime: 3
collection: posts
tags:
  - JavaScript
---

Recently I had a lots of interest in Javascript and decided to implement something funny and interesting.
For me it was a problem of finding a way through the maze.
So, I searched a bit and found that this kind of problems are usually solved with path finding algorithms and one of those is A-Star.<!--cut-->
After sore investigating I found very good article by Patrick Lester ([A-Star Pathfinding for Beginners](http://www.gamedev.net/page/resources/_/technical/artificial-intelligence/a-pathfinding-for-beginners-r2003)).
My interest progressed to this demo implementation, and it is possible to play with it a bit right here.

So, here are the rules:

- Double click on the cells to build / erase walls
- Select cell, then press "Set Start" or "Set Finish" buttons to change start/destination point
- Click on the "Go!" button to calculate a path.

<div class="box">
  <link rel="stylesheet" href="styles.css">
  <div class="field is-grouped is-align-items-flex-end">
    <div class="control">
      <label for="field-width" class="label">Width</label>
      <input id="field-width" type="number" min="1" class="input" style="width: 6em" value="10"/>
    </div>
    <div class="control">
      <label for="field-height" class="label">Height</label>
      <input id="field-height" type="number" min="1" class="input" style="width: 6em" value="10"/>
    </div>
    <div class="control">
      <button id="gen-field-btn" class="button">Generate New Field</button>
    </div>
  </div>
  <div id="field-container"></div>
  <div class="buttons mt-4">
    <button id="set-start-btn" class="button">Set Start</button>
    <button id="set-finish-btn" class="button">Set Finish</button>
    <button id="go-btn" class="button is-success">Go!</button>
  </div>
  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="a-star-algorithm.js"></script>
  <script src="field-designer.js"></script>
  <script src="run.js"></script>
</div>
