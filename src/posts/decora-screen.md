---
layout: post.njk
eleventyComputed:
  title: "decora screen"
date: 2025-05-09
tags:
  - hardware
  - smart home
readTime: "4 minutes"
author: sickfunny
description: >
  Filling the empty void, or at least the space where my unused light switch used to be in the living room. I decided to yank it out and replace it with something more honest: an e-ink display embedded inside the switch box. Another screen in my life sounded like a good idea. Build first; provide purpose later.
---

Filling the empty void, or at least the space where my unused light switch used to be in the living room. I decided to yank it out and replace it with something more honest: an e-ink display embedded inside the switch box. Another screen in my life sounded like a good idea. Build first; provide purpose later.

## PARTS LIST
[E-Ink ESP32](https://www.amazon.com/dp/B07RM1BBVF)  
[Waveshare 2.13inch E-ink Display](https://www.amazon.com/dp/B071VNB96D)  
[USB Type C Pigtail](https://www.amazon.com/dp/B0DCGN8ZG3)  
[3W AC/DC Module](https://www.amazon.com/dp/B09Z253MQ2)  
[3D Printing Service](https://craftcloud3d.com/)

## FRUSTRATION 360
With the window shopping done, the first hurdle is designing the adapter plate. Turns out my switch cover style is Decora, which I learned counts as a standard. I was hoping I could find a pre-made blank to save me some time as I have very little experience with 3D modeling. And Glen Bayley to the rescue with his [Decora blank insert](https://www.printables.com/model/1198667-decora-blank-insert-fusion-360-file). Now with some basic measurements from the waveshare display diagram I simply needed to cut a hole in the blank.

Back to the part where I have very little experience... I spent a few hours in fusion360 before uninstalling and almost calling it quits. I stumbled about another tool called [TinkerCAD](https://www.tinkercad.com/), which I can only imagine was designed for young children to play with. Evidenced by the fact there is a minecraft mode for building your models. But for me this was good enough to put a hole in a plate. [My struggle lives here](/public/decora-adapter.stl).

## ELECTROCUTING FOR BEGINNERS
To fit everything inside a light switch box, I needed to power the USB-C based ESP32 directly from the AC wires already in place. The hardware here uses very little amperage, so I picked the smallest AC/DC module I could find—helpfully sold on Amazon. A bit of soldering on the USB pigtail, a couple of junction wires on the other side, and it was ready to ~~start a fire~~ power up.

## PUTTING IT TOGETHER
The only notes here is that I hot glued the waveshare screen into the adapter. Please check your National Electrical Code for proper installation.

## UPLOADING MY DREAMS
I will spare you the scratched together code I am running on this abomination, but you will probably need some _pointers_ to get the display working. This is the important part:

```
// Imports
#include <GxEPD2_BW.h>

// Pin reference
// CS 15
// DC 27
// RST 26
// BUSY 25

// Initialize display driver
GxEPD2_BW<GxEPD2_213_BN, GxEPD2_213_BN::HEIGHT> display(
    GxEPD2_213_BN(15, 27, 26, 25));

void initDisplay() {
  Serial.println("Starting display");
  display.init(115200);
  
  // SPI pin assignments
  SPI.end();
  SPI.begin(13, 12, 14, 15);
  
  // Set display defaults
  display.setRotation(0);
  display.setTextColor(GxEPD_BLACK);
  display.setTextSize(1);
  display.setFullWindow();
  display.firstPage();
  
  // Clear the display
  do {
    display.fillScreen(GxEPD_WHITE);
  } while (display.nextPage());
  
  Serial.println("Display cleaned");
}
```

Now what to do with this new power? A count down of remaining months in your average life (374)? Or maybe you can begin fetching data from your home assistant server, public apis or wherever. Some things that I thought would look cool and maybe partially useful is the weather outside, my total home energy usage, unlocked doors, and intruders; don't try it.

## CONCLUSION
I hope this project inspires you to build something and distract you long enough to forget the quiet dread. Even if just for a second. 

![installed decora screen](/img/decora-screen.jpg){sizes="(max-width: 480px) 320px, 640px"}