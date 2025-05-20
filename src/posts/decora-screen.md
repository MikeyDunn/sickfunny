---
layout: post.njk
eleventyComputed:
  title: "decora screen"
date: 2025-05-05
tags:
  - hardware
  - smart home
readTime: "2 minutes"
author: sickfunny
description: >
  Filling the empty void, or at least the space where the I-don't-know-what-this-does switch was. Another screen in my life sounded like a good idea and I've been on a smart home kick. Why not see if I can piece together an e-ink screen running completely inside my light switch box?
---

Filling the empty void, or at least the space where the I-don't-know-what-this-does switch was. Another screen in my life sounded like a good idea and I've been on a smart home kick. Why not see if I can piece together an e-ink screen running completely inside my light switch box?

### PARTS LIST
[E-Ink ESP32](https://www.amazon.com/dp/B07RM1BBVF)  
[Waveshare 2.13inch E-ink Display](https://www.amazon.com/dp/B071VNB96D) 
[USB Type C Pigtail](https://www.amazon.com/dp/B0DCGN8ZG3)  
[3W AC/DC Module](https://www.amazon.com/dp/B09Z253MQ2)   
[3D Printing Service](https://craftcloud3d.com/)

### BABY'S FIRST 3D MODEL
With the window shopping done, the first hurdle is designing the adapter plate. I learned the style of light switch cover I have is decora, which seemed like a standard dimensions. I was hoping I could find a premade blank to save me some time as I have very little experience with 3D modeling. And Glen Bayley to the rescue with his [decora blank insert](https://www.printables.com/model/1198667-decora-blank-insert-fusion-360-file). Now with some basic measurements from the waveshare display diagram I simply needed to cut a hole in the blank. Back to the very little experience part, I spent a few hours in fusion360 before uninstalling and almost calling it quits. I stumbled about another tool called [TinkerCAD](https://www.tinkercad.com/) which I can only imagine was designed for young children to play with. Evidenced by the fact there is a minecraft mode for building your models. But for me this was good enough to put a hole in a plate. [My Struggle](/public/decora-adapter.stl).

### POWERING THE BOARD
Now with the goal of fitting this project inside a light switch box we needed to power the usb-c configured esp32 board with the ac wires ran. The hardware here uses very little amperage, so I found the smallest ac/dc module I could which was also happened to be available on amazon. Correct soldering on the USB pigtail and some junction wires to the other end, we were set to ~~start a fire~~ get this thing running.

### PUTTING IT TOGETHER
The only notes here is that I hot glued the waveshare screen into the adapter. Please check your National Electrical Code for proper installation.

### SOFTWARE AND HOME ASSISTANT
Build the hardware and the ideas will come