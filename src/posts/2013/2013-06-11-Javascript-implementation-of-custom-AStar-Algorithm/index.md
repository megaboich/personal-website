---
layout: post.njk
title: Javascript implementation of custom A-Star algorithm
date: 2013-06-11
readingTime: 3
collection: posts
tags: JavaScript
---
Recently I had a lot of interest for Javascript and decided to implement something funny and interesting.
For me it was a problem of finding a way through the maze.
So, I searched a bit and found that this kind of problems are usually solved with path finding algorithms
and one of those is A-Star<!--cut-->.
After sore investigating I found very good article by Patrick Lester ([A-Star Pathfinding for Beginners](http://www.gamedev.net/page/resources/_/technical/artificial-intelligence/a-pathfinding-for-beginners-r2003)).
My interest progressed to this demo implementation, and it is possible to play with it a bit right here.

So, here are the rules:

* Double click on the cells to build walls
* Select cell, then press "Set Start" or "Set Finish" buttons to change start/destination point

<div>
  <link rel="stylesheet" href="styles.css">
  
  <button id="gen-field-btn" class="btn btn-default">Generate New Field</button>
  <span class="input-group-addon">Width</span>
  <input id="field-width" type="text" class="form-control" value="10"/>
  <span class="input-group-addon">Height</span>
  <input id="field-height" type="text" class="form-control" value="10"/>
  
  <div class="panel panel-default">
    <div class="panel-body">
      <div id="field-container">
      </div>
    </div>
  </div>
  
  <button id="set-start-btn" class="btn btn-default">Set Start</button>
  <button id="set-finish-btn" class="btn btn-default">Set Finish</button>
  <button id="go-btn" class="btn btn-success">Go!</button>
  
  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="a-star-algorithm.js"></script>
  <script src="field-designer.js"></script>
  <script src="run.js"></script>
</div>