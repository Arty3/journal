---
title: Minecraft Server Panel
description: Reloading Old Chunks
tags:
  - ui
  - web
  - fun
draft: false
written: october 2026
project: september 2026
status: completed
thumbnail: /assets/entries/minecraft-server-panel/chest-entrance-1.png
---

## Two Week Minecraft Phase

I've played Minecraft for as long as I can remember. Along with Geometry Dash, it is probably the game I've played over the longest span of time.

My first memory of the game is probably seeing my classmate, and good friend at the time, playing it in the hallway during a parent-teacher afternoon. She was walking through her mines and I remember seeing all the cool ores, with a distinct flash of redstone ore in my memory. If I had to guess, this was somewhere around 2014.

In any case, given how much I loved fossils, crystals, minerals, and virtually everything rock related, the first thing I did when I got home was to beg my mom to buy me Minecraft for my tablet. From there on out, I played a lot. Often.

Some time during 2019, my friend — now one of my best friends — and I started our own world on a server. At the time I was fairly new to programming, so setting up this server was fairly challenging. Nevertheless, I managed to set it up, and we played. That first world was a lot of fun. We played on it for perhaps a year or two, through the Nether Update, and got quite a lot done.

We lived on an island, which, funnily enough, is a recurring theme, and a lot of memories were made. That's also when I really started to build in the game. We've always played together, and we complement each other fairly well, the split has always roughly been that he builds all the technical things like farms and whatnot, and I build all the pretty things, with the occasional overlap. This may seem weird considering the things I do and write about in this journal, but honestly I enjoy it that way.

After that world came our longest-running world together, which lasted about two years. This one was very special to us. Again we lived on a damn island, but by the end of it we had transformed it into a beautiful one, with a large underground base, surrounded by coloured beacons, floating sky islands, and more. We also made a huge pentagon in the ocean, which we drained, and which was supposed to be our "megabase", but it was far too large for us to handle with that kind of discipline. Another fun quirk was the desert area, which is where we placed a lot of farms. Here, I effectively mined out an entire desert. During COVID I would sit in online classes and spend most of them mining sand. Peak entertainment, I know. In the end, I can assure you that the desert was gone, and I had mined somewhere in the millions of sand blocks.

After that world, there were plenty of others, though none as special as that one. They were all complete with fancy witch farms, pretty builds, and so on, but still.

The particularly sad thing is that the worlds are lost, literally all of them. Don't ask me how, I've always been terrible at keeping data through time, backups are a foreign concept to me.

Still, thanks to my friend, a few screenshots survive.

<img src="../../assets/entries/minecraft-server-panel/dusting-off.png" width="60%" style="border-radius: 16px;" />

*(Me pulling out these screenshots)*

---

<img src="../../assets/entries/minecraft-server-panel/old-world-1.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/old-world-2.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/old-world-3.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/old-world-4.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/old-world-5.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/old-world-6.png" width="40%" style="border-radius: 16px;" />

It was an actual archaeological expedition to find these, but at least a few fragments still remain.

Also, here's a fun number:

<img src="../../assets/entries/minecraft-server-panel/enderman-statistic.png" width="60%" style="border-radius: 16px;" />

## The Technical Side

As you might expect, I was always the one to host the server. I remember the first panel I ever used was PufferPanel, which another friend of mine recommended, but that wasn't really for me. So I stuck to systemd and ran it from the command line.

That worked for a while, but after some time I began to grow a bit frustrated with it, for a few reasons: sharing the console and server files with my friend, who isn't as technical, sending console commands, and general quality of life.

So it was back to panels, and this time a bit of research turned up Pterodactyl.

I remember how long it took me to set it up, literal hours for something that would take me ten minutes now. I think that's nice. The satisfaction of working through the commands, the issues and the cryptic messages to finally see the beautiful panel in front of your eyes is something I appreciate about the time before AI.

In any case, that worked fine for years, but it had a problem: it was really ugly.

Look, I hope I don't offend anyone, but it's simply true, I mean, just look at it:

<img src="../../assets/entries/minecraft-server-panel/pterodactyl.png" width="60%" style="border-radius: 16px;" />

## A New Panel

The title of this entry is a lie. I didn't make a whole panel by myself, otherwise the entry would be far longer. Instead, I took an existing panel and tweaked it a bit. I must admit this is more an excuse to talk about Minecraft rather than the panel itself, but hey, I get to do what I want ;)

It had been a couple of years since we last played consistently, but we finally started a new world, one we plan to stick with long term. Frankly, I've been enjoying it quite a lot. Oh and guess what, we are STILL on an island.

Minecraft aside, with a few more years of experience, I've really enjoyed setting up the server properly. In the past we always used PaperMC for performance. It was easy and it just worked. This time I went with Fabric and a set of performance mods.

My current stack looks like this:

- Lithium
- C2ME
- FerriteCore
- Krypton
- ModernFix
- ScalableLux
- ServerCore

Fairly default, but phenomenal for what it needs to do. I even patched Krypton myself for compatibility.

I knew from the start that I wanted a panel again, and a bit of research made Pelican Panel the obvious choice.

Pelican Panel is a relatively new project made by one of the creators of Pterodactyl. It shares much of its feature set and design with Pterodactyl, but with a far more modern interface and codebase.

The thing that made it particularly appealing to me was its plugin support, which meant I could tinker with it.

Here was my starting point:

<img src="../../assets/entries/minecraft-server-panel/pelican-default-dashboard.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/pelican-default-console.png" width="40%" style="border-radius: 16px;" />

Not bad, but we can go further.

## Tweaking The Look

So I started making a plugin to tweak the UI a bit. Unfortunately, plugins have to be written in PHP, because the panel is as well. I'm going to be honest here and say that I'm not a big fan of PHP, though nowhere near the hater many other developers are. I would still much rather have used TypeScript or something.

So I got to work. The vast majority of the work was staring at the panel and noticing what I didn't like, which is funny because that's exactly the same way I build in Minecraft. My eye is naturally drawn to composition and detail. No detail goes unnoticed, and every detail exists to serve the composition.

Because of that, every time I work on a visual project, such as a UI, a graphics project like [this](https://journal.lucagoddijn.com/entries/unturned-graphics-overhaul/) one, or a build in Minecraft, my eye works in the same way, which means everything takes forever to get done. Personally I think the result is always worth it.

In terms of technical challenge, there's nothing really worth getting into too much. The only thing worth mentioning was the server console, which is xterm, and which turned out to be a tangle of small problems rather than one bug: its theme is fixed at construction, the panel can flip between light and dark at runtime, and the WebGL renderer occasionally lost its context and went blank. Making the colours survive all of that took longer than the rest of the plugin combined. Still, nothing out of the ordinary for a software engineer.

After some time of working on it, I decided I was happy with this:

<img src="../../assets/entries/minecraft-server-panel/pelican-new-dashboard.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/pelican-new-console.png" width="40%" style="border-radius: 16px;" />

Honestly, I could've gone further, but I think this is good enough for now, otherwise I can just tweak it later.

This may be weird to say, but there is always a bit of a cosy feeling when you're using your own tools, self-hosted or not. The panel is obviously not mine, but it has a personal touch now, and it runs on my own machine. I think it's nice.

I changed a few other menus too, but nothing worth showing.

## The World So Far

Panel aside, it has been about two weeks since we started playing. I thought I'd show you how the world is doing so far:

<img src="../../assets/entries/minecraft-server-panel/house-3.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/house-2.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/house-1.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/house-4.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/chest-entrance-1.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/chest-entrance-4.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/chest-entrance-3.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/chest-entrance-2.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/creeper-farm.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/minecraft-server-panel/iron-farm.png" width="40%" style="border-radius: 16px;" />

For those that haven't seen Minecraft since the 2010s, yes, this is what vanilla Minecraft looks like now.

In any case, I think it's going well. I've had a lot of fun building, not that I've built much yet, and I have high hopes for this world.

If you want the panel tweaks for yourself, the repository is [here](https://github.com/Arty3/pelican-ui-tweaks).

And as always, thanks for reading!
