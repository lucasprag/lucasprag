---
title: What is software architecture?
date: 2020-02-19
excerpt:
  I've been reading a lot about software architecture lately, mostly George Fairbanks, Piotr Solnica, David Bryant Copeland, Martin Fowler and Michael Keeling, here are some lessons I learned so far.
tags:
  - architecture
  - design
layout: post
---

I've been reading a lot about software architecture lately, mostly [George Fairbanks](https://www.georgefairbanks.com/), [Piotr Solnica](https://solnic.codes/), [David Bryant Copeland](https://naildrivin5.com/), [Martin Fowler](https://martinfowler.com/architecture/) and [Michael Keeling](https://www.neverletdown.net/), here are some lessons I learned so far.

### What is software architecture?

Software architecture is described by Martin Fowler as the important part, whatever that is. While this definition sounds true, it is also quite vague if you don't have more context.


George Fairbanks shared in this [video](https://www.georgefairbanks.com/blog/software-architecture-vs-design/) that the software architecture of a system is the set of structures needed to reason about the system, where "set of structures" are models that we create to represent parts of the system.

We need these models because building a system, like building a house, is too complex for us to think on all possible failures and changes that this system might encounter. We create models to focus on what is most likely to happen and hide the rest.

Bringing to the example of a house, if you design a house where the inner walls are easy to change, which means not having much electric cables, fireplace, etc on them, your house is more prepared for changes if you need to add a room for example. The same thing happens if you want to sell the house, it's more likely for someone else to buy it if it's easier to change the inner walls. These both situations are very likely to happen in a house.

But if you don't make the inner walls easy to change, this decision is not easy to revert after you finish building the house.

**That is what architecture is: a way of representing different parts of a system and managing risk of failure and change.**

I wonder where my understanding of software architecture is going to go as I read and study more on the subject.

If you are also interested on the subject, liked this example or think I'm crazy and totally wrong, please reach out on twitter or in the comments bellow.