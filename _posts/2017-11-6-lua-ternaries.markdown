---
layout: post
title:  "Lua Ternaries"
date:   2017-11-6
categories: lua
tags: lua semantics
comments: true
image: ternary.png
---

Lua, a familiar, kind, and gentle programming language. Its simplistic and textual syntax make it a great first language. It is all this, and thanks to years of work, it can also be blazing fast, especially when running under the Just In Time compiler LuaJIT. However, a seasoned programmer may have trouble finding some of the many common features included in most languages today. One of these things is the presence of a dedicated ternary operator.

If you are not familiar with the ternary operator, it is an operator (like `+` or `-`) that allows for inline conditional statements. In many languages today, it is represented as the construct `a ? b : c`. Think of it the way it looks, it says: If `a`, then `b` or else `c`. This is a very nice statement to use for convenience so that you do not have to write a lengthy `if/else` structure for the expression. Here are some example use cases (in Java syntax):
{% highlight java %}
// Different values based on a boolean
log(boolValue ? "Bruh, truuue!" : "Sorry but that was false!");

// Get the smaller number
int minVal = (a < b) ? a : b;

// Absolute value
int absVal = (a < 0) ? -a : a;

// Change behaviour based on settings
int delay = animationsOn ? 50 : 0;

// Or add clarity
log("You have " + game.score + " point" + (game.score > 1 ? "s" : "") + "!");
// score = 3: You have 3 points!
// score = 1: You have 1 point!
{% endhighlight %}

Basically ternaries are a very useful tool that can make a programmer's life a heck of a lot easier while making the source much cleaner and organized. (That is as long as you use them responsibly, using things like nested ternaries can just add confusion to the code, be smart!)

So I can hear you yelling out, "wOw! So can I do that in Lua!?" And thankfully, the answer is a resounding Yes! But there's a catch. Now that I've finished teaching you up on how ternaries are all about that `a ? b : c` syntax, forget it. In Lua it is written: `a and b or c`. Unfortunately, this syntax is a little less clear; however, this is not entirely the language designers fault.

Some examples in Lua:
{% highlight lua %}
print(boolValue and "Bruh, truuue!" or "Sorry but that was false!")

local minVal = (a < b) and a or b

local absVal = (a < 0) and -a or a

local delay = animationsOn and 50 or 0

print("You have " .. game.score .. " point" .. (game.score > 1 and "s" or "") .. "!")
{% endhighlight %}

You see, this ternary structure was not entirely intentional (ternaries themselves were not intended). It is merely a side-effect of how Lua's logical operators `and` and `or` were implemented. Lua is a dynamically typed language, meaning that you don't have to explicitly tell Lua what type of value you are putting into your variable. If you say, for example, `local x = 5`, you don't tell Lua that you are using `x` as an int, or a double, or even a number! Lua figures all of this out by itself, in the background. As a result of this, many types are coerced when used together, for example, when `print("Score: " .. 17)` is called, you tell Lua to print the concatenation of `"Score: "` and `17`, two bits of data that have different types, one is a String and one is a Number, but we want a String in the end, so Lua coerces the Number `17` into the String `"17"`. This is cool, but the behavior we are interested in is how Lua coerces variables into the boolean datatype. In Lua, everything (with the exception of `false` and `nil`) is 'truthy', meaning that if it needs to be coerced into a boolean it gets coerced into `true`. This is why if you write `if not object then`, the if statement is only entered if `value` is falsey (`false` or `nil`).

Now, lets break down a ternary in Lua, so `a and b or c`. This really is `(a and b) or c`. Lets look at the first part, lua sees `a` first, if `a` is a truthy value, then it follows the controlling `and` and reaches `b`, which if it is a truthy value, it returns it, because Lua always returns the last expression evaluated. It does NOT evaluate `c` because there is an `or` in front of it, and like a smart language, it says "I already have `a` and `b` which was truthy, so the `or` cannot change the truthyness (its a word) of the expression, so lets just return early. And conversely, if `a` was a falsey value, then the `and` would have cut short, because it says "a was false so b cannot change the truthyness of that part of the expression, skip it", Lua would have jumped to the `or c` and returned `c` because it was the last thing evaluated.

So lets recap what we learned today, Lua is awesome, Ternaries are awesome, Lua has support for ternaries so it's even awesomer now, and there is a reason that the ternaries in Lua look so weird. Ternaries are a very powerful, and useful tool, and should be used where applicable, but it is wise to know when to stop. Avoid nesting ternaries like so:
{% highlight lua %}
local value = a and b or (c and (d and e or f) or g) and h or i
{% endhighlight %}
That was a valid statement, but it looks horrible, and is very difficult to follow. In this case, either spread it out over multiple statements, or create an `if/else` structure for it.

I do encourage you to experiment with Lua's `and` and `or` operators now, and see if you can come up with some interesting control structures using their quirks. But that's all for now. Happy Hacking! :)