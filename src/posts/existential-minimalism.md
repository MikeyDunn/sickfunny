---
layout: post.njk
eleventyComputed:
  title: "existential minimalism via static site generation"
date: 2025-05-15
tags:
  - programming
  - minimalism
readTime: "3 minutes"
author: sickfunny
description: >
  What is the marginal cost of happiness? Each new dependency, each build tool or abstraction, quietly claims a piece of your agency. These decisions are not free. Over time, the stack you build begins to shape the way you think. It narrows your options, calcifies your patterns, and it replaces expression with compliance. The more you add, the less you notice what has been lost. Expression turns into production. The code becomes a weight. At some point, you forget what you were trying to say. When is it enough? What is sick funny?
---

What is the marginal cost of happiness? Each new dependency, each build tool or abstraction, quietly claims a piece of your agency. These decisions are not free. Over time, the stack you build begins to shape the way you think. It narrows your options, calcifies your patterns, and it replaces expression with compliance. The more you add, the less you notice what has been lost. Expression turns into production. The code becomes a weight. At some point, you forget what you were trying to say. When is it enough? What is sick funny?

## THE STACK
Starting this project, the requirements for myself were low code and high performance. Through some serious research (and asking ChatGPT) I landed on the [Eleventy](https://www.11ty.dev/) static site generator for the foundation. Eleventy parses markdown files into nunjucks templates and generates static html files for hosting. And in the constant pursuit to make the magic number go up, I included [eleventy-img](https://www.11ty.dev/docs/plugins/image/) which improved my lighthouse score by optimizing images.

- @11ty/eleventy
- @11ty/eleventy-img
- ~150 lines of hand-rolled CSS
- Markdown + Frontmatter for content writing
- A GitHub Action to build and deploy

Eleventy is a no-config tool, but to handle transformations for the built assets and create a collection of posts some will be necessary. [Pull requests welcome](https://github.com).

## THE ART OF LETTING GO
What is the sacrifice for minimalism? Eleventy provides a small subset of plugins for transformations and utility, but you will quickly need more bloat if you want the modern rich, dynamic client side experience. As a developer you will also miss out on some conveniences—no bundling, no hot module reloads, no batteries included. 

After all it's only a static site generator. The friction is yours to navigate—you'll have to decide what actually matters. And maybe that's the point.

## DELIVERED IN 100ms OR ITS FREE
The final artifacts are hosted in an S3 bucket and served through CloudFront with aggressive caching headers. There's no database, no JS bundle, no loading spinner. Just content rendered ahead of time, sitting quietly, waiting to be seen.

## CONCLUSION
Minimalism isn't about deprivation. It's about clarity. It allows you to free yourself of all but what matters and find yourself in the space left behind. This site is a reflection of that process: a reduction down to the essential. Not just to be efficient, but to be honest.


