---
title: Be aware of this type of requirement and constraints
date: 2020-03-14
excerpt:
  I'm reading Design It by Michael Keeling and I came across the concepts of architecturally significant requirement and technical and business constraints. It's nice to understand them a bit better because it helps us focus on what it is important when discussing a feature.
tags:
  - architecture
layout: post
---

I'm reading [Design It From Programmer to Software Architect](https://pragprog.com/book/mkdsa/design-it) by Michael Keeling and I find it incredibly hard to read, not because the book is bad, but because it's so interesting and it fits perfectly with many situations I've lived in the past that I keep remembering situations at work and connecting the dots.

## Architecturally significant requirements

Architecturally significant requirements are requirements that directly defines the architecture.

The book gives an example of an calculator app that can do simple mathematical operations such as addition, subtraction, multiplication and division, but eventually a stakeholder talks about showing their users history even if they lost their phones.

This new requirement is significant for the architecture because now we have to save their history somewhere and it can't be only a local database on their phone, it needs to be an external database over an API.

It raises more questions regarding availability like what happens when a phone is offline, questions about scale like how many calculator apps do we expect to be running at the same time and sending history inputs, how to map a user to a history, do they need to login?, etc.

See that this functional requirement is significant for the architecture, but for example, adding a new type of operation is also a functional requirement, but not architecturally significant.

Finding architecturally significant requirements is hard because they are not always explicit and stakesholders are not always aware of how much some requirements can change the architecture of a system. They are best found during discussions before implementing features since they can change the overall architecture of a system.

## Constraints

Constraints are unchangeable design decisions, usually given, sometimes chosen. They can make our lives easier because they can simplify our problem and limit our architecture, but they can also make our lives hell doing the opposite.

They are non-functional requirement like the programming language you are going to use, team composition, budget, deadline, etc.

You can see that the nature of these constraints can be different, they can be business or technical constraints.

The interesting part is that sometimes a hard constraint can become much softer if you are able to effectively communicate how it affects the architecture of your system. If the impact of the constraint is high it can raise questions if this constraint is really worthy, but it can only be done if everyone involved understands its impact. This means that all hard constraints need a good reason of implementing it and all stakesholders agree with them.

For example, if we have a technical constraint of only using ruby, but this other programming language have more advantages on specific aspects that are going to drastically help building your feature, it might be worthy bringing the trade-off of using one versus the other to the table. It's important that everyone is aware of the impact of this constraint and everyone together can make the best decision.

The same happens to business constraints like deadlines or how far should we implement a feature. If everyone is aware of the impact, people can see the trade-off and make the best decision.

---

This is quite interesting. Being more aware of this concepts can help us reveal them during discussions and effectively communicating the impact of a constraint or a requirement can help all stakesholders better evaluate its value.

