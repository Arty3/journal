---
title: Stardew Valley Mod
description: Pixel by Pixel
tags:
  - c#
  - modding
  - pixel art
draft: false
written: november 2026
project: november 2026
status: completed
thumbnail: /assets/entries/stardew-valley-mod/thumbnail.png
---

## Visual Art

I am terrible at anything visually artistic. I know, great way to start, but it's true.

During high school, I actually took visual arts as a class, and while I did enjoy it, I was god-awful at it. I think the teacher was a really nice lady, so I'm sure a big part of why I enjoyed it was that she didn't let my failure go to waste. So, if you're ever reading this, thank you!

Nevertheless, I barely had passing grades — for art, mind you — so I knew early on to stick to something else. This is actually maybe the best thing I drew back then, by far:

<img src="../../assets/entries/stardew-valley-mod/pig.png" width="40%" style="border-radius: 16px;" />

I'm actually still really proud of this.

Still, that doesn't mean I don't enjoy art, or that I don't enjoy what other people have made. Sometimes it's not about the results, which makes grading art in school that much worse. And you know, I still find myself drawing occasionally. Not that much, though, maybe a few times per year. Here's the last thing I made:

<img src="../../assets/entries/stardew-valley-mod/Extend.png" width="60%" style="border-radius: 16px;" />

If you're wondering, this is inspired by Outer Wilds, one of my favourite games ever. I really recommend you play it (spoiler-free).

Oh, and while I have the chance, here's something else I made:

<img src="../../assets/entries/stardew-valley-mod/clay-monster.png" width="40%" style="border-radius: 16px;" />

I know, I know, not drawing-related, but it's still "visual"? Anyway, I just wanted to show this off. It took me hours, and I'm really proud of it. Even if he's fugly, he speaks to me — in a non-schizo way.

In any case, now that I've introduced you to my peak, let me introduce you to my average:

<img src="../../assets/entries/stardew-valley-mod/portrait-drawing.png" width="40%" style="border-radius: 16px;" />

This is not abstract art. This is genuinely my best attempt at a portrait sketch. Thankfully, the girl I was dating at the time was extremely kind, so she just laughed it off, but I'm fairly certain this contributed at least partly to the breakup.

Now I know, practice makes perfect, blah, blah. But have you seen that thing?

If you haven't guessed yet, today's entry is about me redeeming myself.

## An Idea

Not too long ago, I was writing about [an emerald ring](https://journal.lucagoddijn.com/entries/an-emerald-ring/), a gift I made a year ago. As I was writing, I remembered another project I'd been working on: a Stardew Valley mod.

This was some time before the ring, though the connection here is that both projects were gifts. At the time, I was playing a lot of Stardew Valley with my friend, and with her birthday coming up, I thought it might be nice to create a mod that put her into the game as an NPC.

Now, programming, not a problem. Drawing, as we know, mega problem.

Stardew Valley, in case you don't know, is an indie cosy farming game that's taken the internet by storm due to how good it is. Famously, it was made by just one guy, ConcernedApe. The art, music, and code for the game, all made by one guy. That's impressive, especially considering that the game looks like this:

<img src="../../assets/entries/stardew-valley-mod/stardew-showcase.png" width="60%" style="border-radius: 16px;" />

The game is huge, by the way, and it's now far more than just farming. Of course, this happened over time, but still, every single thing you see in the game was hand-drawn by him (for the most part; I heard he got some help with the game recently).

That is just daunting.

So, to make a high-quality mod, I'd have to do the same, albeit on a much smaller scale.

You might be thinking, "Oh, just one small character, how bad could that be?" The answer is bad.

Every character needs a detailed pixel-art portrait for dialogue. Not one, not two, but many. If you want a character to, you know, talk, they need a portrait. If you want them to have emotions, they need one per emotion. Then there's the actual animated sprite walking around in the world, written dialogue, likes and dislikes, daily behaviour, and heart events (cutscenes).

The programming was something I knew how to approach. The rest, not so much.

So I got to researching.

## The First Steps

The game is generally modded via [SMAPI](https://smapi.io/), an open-source modding framework, loader, and API specifically for Stardew Valley. This was good news for me, since it makes the process much simpler. Conveniently, there's a NuGet package as well.

So I set up a Visual Studio project, installed SMAPI, made a simple hello world, and bam, I had officially modded the game.

Now. At this point, I knew I had to start with the art.

So I mostly just sat around being excited about the idea, getting nothing concrete done. Once I realised that wasn't gonna get me very far, I started to analyse. I went in-game, walked around, and looked at the textures, trying to understand what made them feel like part of the game. I wish I could tell you some bright lightbulb lit up above my head, but the truth is that while I was noticing details, I still had no idea how to do anything.

For the sake of the entry and privacy, let's call my friend "Emily". Now, Emily is very blonde. Armed with that vital information, I had the genius idea of looking at characters already in the game who might resemble her. And thankfully, the stars aligned, because the game has Haley!

I got Haley's sprite out of the game files, opened it in Paint 3D, and once again, just kinda stared at it. Occasionally, I'd change a pixel or two, but it instantly looked horrible. I had a reference, I had a plan, and I was getting absolutely nowhere.

At this point, my memory isn't the best. What I remember is spending hours in Paint 3D — yes, this whole process has been painstakingly done by hand, pixel by pixel, in Paint 3D — and after all that work, it still wasn't looking right.

I knew of a website where you could make your own "Stardew Valley character portrait", which you can find [here](https://jazzybee.itch.io/sdvcharactercreator), so I went there to see if I could take something from it. The website works by stacking premade components on top of each other to create a portrait. It's convenient, but the results are pretty distinguishable, and not the best. That's not to say the website is bad. On the contrary, to some degree it was my lifeline, but I couldn't just make a portrait there and call it a day.

I distinctly remember taking the main facial features from the website:

<img src="../../assets/entries/stardew-valley-mod/character-maker.png" width="40%" style="border-radius: 16px;" />

I know, stuff of nightmares, but keep this in mind.

Look, it just worked, and I was struggling. I think I can get a pass this time.

The website gave me colour and shape. More importantly, it gave me something to start working *from*, rather than staring at an empty canvas. After some more hours in Paint 3D, I came up with something that genuinely gave me a nice rush of dopamine:

<img src="../../assets/entries/stardew-valley-mod/first-portrait.png" width="40%" style="border-radius: 16px;" />

Suddenly, I had something that looked like it belonged in Stardew Valley. And, at least to me, it looked like Emily.

So I copy-pasted the portrait a few times to create a sheet and started changing expressions. Another few days at my desk, pixel by pixel, and I had a whole menu of portraits, each with a different emotion or reaction:

<img src="../../assets/entries/stardew-valley-mod/portrait-1.png" width="40%" style="border-radius: 16px;" />

<img src="../../assets/entries/stardew-valley-mod/portrait-2.png" width="40%" style="border-radius: 16px;" />

I'm actually insanely proud of this. While I initially took a large chunk from the website, it unlocked so much for me. Everything that came after was hours and hours of indecisive, pixel-by-pixel progress, far outside my comfort zone. And to this day, these portraits haven't changed.

But, soon, there was a problem:

<iframe width="560" height="315" src="https://www.youtube.com/embed/c7BVtGnlxT8?si=GnqMgfpqVNCAvGM9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

At this point, I hadn't worked on the project in a couple of weeks, and coincidentally, I started dating someone.

So obviously, I left it behind. How would you feel if your boyfriend was going through all this effort making something for his friend (who is also a girl)?

And so, not long after, I completely forgot about it.

## Until Last Week!

The first thing I did after finishing the ring entry was open up the project again. At this point, it was an empty Visual Studio project with one sprite sheet, but opening it again reminded me how proud I'd been of those portraits. I wanted to finish the thing.

And this time, there was no getting around the sprites.

I opened Haley's sprite sheet in Paint 3D again, copy-pasted the first row of walking animations, brought it into a new project, and got to work. On one screen I had Emily's portrait; on the other, the sprites. My approach was simple: reshape Haley to look like Emily, then sample the colours from the portrait to colour the animated sprites correctly.

Now, I just compressed four or five hours of work into a sentence or two, but trust me, the process resembled a strong combination of stupidity and insanity.

Still, after some time, I had this:

<img src="../../assets/entries/stardew-valley-mod/first-sprite.png" width="50%" style="border-radius: 16px;" />

And honestly, up close, I was very happy with it. I did make one gargantuan mistake, though.

I never zoomed out.

Once I had a row of sprites, I felt confident enough to write some code. A few beep boops later, and the NPC could be spawned in-game:

<img src="../../assets/entries/stardew-valley-mod/first-npc.png" width="50%" style="border-radius: 16px;" />

Ew, what the hell is that.

That was my reaction, anyways (sorry Emily). I'd spent hours staring at a handful of pixels blown up to enormous proportions, without once checking how they would actually look in-game. Which feels incredibly dumb in hindsight, but hey, we live and we learn. Up close it could pass as a somewhat mediocre attempt at stylised shading. From far away, it just looked flat-out bad.

And so the long iteration process began.

## Discovering Fire

The most obvious problem was the heavy contour in the hair. I tried a lot of different combinations and eventually settled on pink and orange-ish outlines:

<img src="../../assets/entries/stardew-valley-mod/iter-1.png" width="50%" style="border-radius: 16px;" />

Which I thought looked pretty good.

<img src="../../assets/entries/stardew-valley-mod/iter-1-ingame.png" width="50%" style="border-radius: 16px;" />

Something still felt off. I couldn't quite explain it, but the dress seemed to disappear into the rest of the sprite. So I tried changing the colours, mostly just to see what would happen:

<img src="../../assets/entries/stardew-valley-mod/iter-2.png" width="50%" style="border-radius: 16px;" />

And okay, wow. Suddenly, the dress popped so much more. In contrast, the face was now the thing that looked flat.

This was maybe the most important thing I learned about pixel art throughout the whole project:

> *Contrast -> Depth -> Shape -> Definition*

Or at least some variation of this.

Now, I'm sure that if you're an artist at all, you'll just be like, "duh". But this was like discovering fire for me, so please bear with me.

I had been treating the colours mostly as colours. Purple for the dress, pink for the hair, something skin-coloured for the face. What I wasn't really understanding was how much the difference between those colours determined whether you could even make out the shapes, especially at the size you actually see them in-game.

That didn't mean I suddenly knew what I was doing. It did mean I finally knew what I was looking for.

I went back to the dress. It needed to be purple to match the portraits, but it also needed enough contrast to stand out without turning into the blue dress again. I made it richer, then tried a much stronger purple-like outline around the face and arms:

<img src="../../assets/entries/stardew-valley-mod/iter-3.png" width="50%" style="border-radius: 16px;" />

<img src="../../assets/entries/stardew-valley-mod/iter-3-ingame.png" width="50%" style="border-radius: 16px;" />

Already much better. The problem was that now the arms stood out too much. I couldn't understand why, because Haley's sprites used much the same technique, and to an even stronger extent.

Looking more closely, I noticed Haley's skin colour was slightly more tanned, which helped bridge the gap between the light skin and the darker outline. I tried it:

<img src="../../assets/entries/stardew-valley-mod/iter-4.png" width="20%" style="border-radius: 16px;" />

<img src="../../assets/entries/stardew-valley-mod/iter-4-ingame.png" width="50%" style="border-radius: 16px;" />

Significantly improved. Unfortunately, Emily isn't that tanned. She's whiter than me — once again, sorry Emily, please don't kill me.

So I tried keeping the lighter skin and changing the shadows instead, making the border a much darker purple:

<img src="../../assets/entries/stardew-valley-mod/iter-5.png" width="20%" style="border-radius: 16px;" />

My first reaction was, "Wow, this looks great!"

<img src="../../assets/entries/stardew-valley-mod/iter-5-ingame.png" width="50%" style="border-radius: 16px;" />

In-game, this looked terrible.

Other than the minor rendering bug in that screenshot, where one border isn't as dark, the whole concept was a flop. Not all of it, though. The darker skin shadow was useful, so I kept that part.

By now, the problem wasn't just finding a palette I liked. The shapes themselves were competing for attention. The face almost looked like it had a beard, the arms had these incredibly obvious borders, and the hair wasn't helping either. I went back to the pink hair outline, fixed the face shape, and mixed colours from the hair and body outlines to smooth things out:

<img src="../../assets/entries/stardew-valley-mod/iter-6.png" width="50%" style="border-radius: 16px;" />

And in-game:

<img src="../../assets/entries/stardew-valley-mod/iter-6-ingame.png" width="50%" style="border-radius: 16px;" />

Finally, this felt a lot closer to what I had in mind. Not because every pixel was perfect, but because the character actually read properly at game size.

OH MY GOD, I just looked at this screenshot and realised the fourth animation has a few skin-shadow pixels that I didn't recolour. I thought, "Oh, this must just be something I fixed." I checked the final sprite sheet. I did NOT fix it. fuck.

At least I caught it now.

Anyway, now that I had a front-facing sprite I was happy with, I could start on the other directions. I'm going to keep it short here, as I don't have too many WIP screenshots, and I think you've had enough insanity for now.

Here's more or less what I came up with for the side view:

<img src="../../assets/entries/stardew-valley-mod/first-side.png" width="50%" style="border-radius: 16px;" />

A few issues still needed to be ironed out, but a really strong start. Before long, I'd made all the walking animations:

<img src="../../assets/entries/stardew-valley-mod/sprite-sheet-1.png" width="50%" style="border-radius: 16px;" />

Ah, so nice, so beautiful, I'm finally done.

...

...

<img src="../../assets/entries/stardew-valley-mod/tutankhamun.png" width="50%" style="border-radius: 16px;" />

OH MY GOD WHAT IS THAT

(accurate representation of events.)

I was looking at the front-facing sprites when I noticed something was off compared to the other views. And then I saw it: the highlight in the hair, next to the eyes, looked weird. My brain just decided to fire off some Tutankhamun neurons. I swear I'm not on psychedelics, but this is just what happens when you stare at this stuff for hours.

So I started messing about and came up with a different highlight:

<img src="../../assets/entries/stardew-valley-mod/hairvshair.png" width="30%" style="border-radius: 16px;" />

On the left is the new proposed hair; on the right, the existing hair.

I honestly sat and stared at this for maybe an hour or two. Over something almost anyone would overlook. I remember I was on a call with my mum, and she was very obviously growing frustrated with this dilemma.

The problem was that I couldn't just look at the front view on its own. The highlight had to make sense with the shape of the hair in the other directions, too. Some versions looked too banded; others felt bunched up, and moving the highlight by a single pixel genuinely seemed to make a difference. Still, in the end the right looked like Tutankhamun, and the left looked like a gladiator helmet. Honestly, I don't know.

Eventually I decided I'd been looking at it for too long and had a couple of friends vote. The vote was a decisive win for the left, so I made the changes, checked it in-game, and finally stopped staring at it.

The new hair:

<img src="../../assets/entries/stardew-valley-mod/hair-new.png" width="50%" style="border-radius: 16px;" />

And in-game:

<img src="../../assets/entries/stardew-valley-mod/hair-new-ingame.png" width="40%" style="border-radius: 16px;" />

I think it looks alright.

Now, if you have a keen eye, yes, the portrait has a flower in the hair, while the sprite sheet doesn't. And yes, I did try adding it:

<img src="../../assets/entries/stardew-valley-mod/flower.png" width="20%" style="border-radius: 16px;" />

You can barely tell it's there up close, and from far away it just looks bad. So, to avoid spending another three hours on five pixels, I decided to leave it as is for now. Tradeoffs.

All in all, here's the finished sprite sheet (after I fixed those skin-shadow pixels):

<img src="../../assets/entries/stardew-valley-mod/animation.png" width="50%" style="border-radius: 16px;" />

It's strange looking at that next to the portrait sketch at the start of this entry. I know pixel art and portrait drawing aren't the same thing, and I certainly didn't do any of this without references. But I had started the project convinced that the art would be the thing I couldn't do, and somehow I ended up with a set of sprites I was actually happy to put in the game.

Now I just had to make her do something.

## The Code

Alright, now that the art was in place, the biggest challenge was over. Time for something I was much more familiar with: code.

<img src="../../assets/entries/stardew-valley-mod/terrible-code.png" width="70%" style="border-radius: 16px;" />

...

<img src="../../assets/entries/stardew-valley-mod/fish-horrified.png" width="30%" style="border-radius: 16px;" />

Yeah, so coding this thing together wasn't so pleasant after all. As far as I understand, a large portion of NPC code is just working with strings, weird string-formatting rules, and all of the above. At least, that's the API I used. Maybe I'm dumb and there's a better way to do this.

One of the first things I did was set up gifts. NPCs in Stardew have items they like, dislike, or are indifferent about, with universal rules that you can override for individual characters.

Now, I'd like to think that after years of knowing Emily, I know more or less what she likes. For instance, I know she hates fish since she's allergic to it. Simultaneously, I know she adores cooking. So logically, I made Emily love all complex dishes (except fish-related dishes) and hate everything fish-related. I also made her love bombs, why not? There are plenty more preferences, but I'm not gonna bore you with them.

Asset loading was fairly straightforward, mainly just this:

<img src="../../assets/entries/stardew-valley-mod/asset-code.png" width="70%" style="border-radius: 16px;" />

Also, I find it hilarious that the game has an enum to give NPCs social anxiety:

<img src="../../assets/entries/stardew-valley-mod/npc-social-anxiety.png" width="70%" style="border-radius: 16px;" />

Like damn, that's just cruel.

Then came the actual behaviour, primarily controlled by a clocked `EmilyBrain` class, which I find to be a pretty funny name. It's a gigantic class that controls all of Emily's decisions and behaviour. Obviously, in a non-creepy, NPC way.

When we played together, she'd generally spend all her time in the forest foraging. So that's exactly what I made the NPC do. During the day, Emily leaves the mine entrance, walks to the forest, and just kinda forages all day. It's a peaceful life.

At night, she goes back to the mine entrance, where I made her stand in a corner. This was due to my laziness: I never figured out the whole house thing, because that's just a lot of work.

I also added a small chance of finding her on a floor of the mines. If you find her, you get a few forage items as a "reward". It doesn't happen too often.

Then there's winter. In case you haven't noticed, I drew Emily wearing a dress, not winter clothing. To solve this issue, I just made her stay in the mines for the entirety of winter. During that time, she feeds on cave carrots.

To make it "lore accurate", I also made the mine encounter chance a bit higher during winter.

Of all the code, the part I actually found most interesting to write was the tile finder. I needed to figure out where she could stand or wander without ending up inside something, both in the mines and in the forest. That meant checking which tiles were walkable, searching nearby tiles, flood-filling reachable areas, and checking whether the pathfinding could actually get her where she needed to go.

I enjoyed making this. It really brought me back to my computer science bachelor's. We used to have projects and challenges focused around exactly this kind of 2D problem. I once even got a nickname: "The bitmap guy". This was because I tried to solve the problem using bitmaps without realising it didn't work. Eventually I did figure it out, but I was so stubborn to make it work that I kept going even though I understood the principle was wrong. This caused me to fail the project entirely. Whoops. So now I hate that nickname. Also, if you're wondering, my reasoning was just that I saw Stockfish handling chess positions in bitmaps, so my dumb brain decided to try and fit a square into the triangle hole for a whole week. Risk and reward, I suppose.

Detour aside, I've included the code here for anyone who wants to look through it; otherwise, you can skip straight to the dialogue.

<details>
<summary>TileFinder implementation (click to expand)</summary>

```cs
using System;

using System.Linq;
using System.Collections.Generic;

using Microsoft.Xna.Framework;

using StardewValley;
using StardewValley.Pathfinding;

using xTile.Dimensions;

using Rectangle = Microsoft.Xna.Framework.Rectangle;

namespace EmilyMod
{
    internal static class TileFinder
    {
        private static readonly Point _preferredMineSeat = new Point(25, 4);

        private const int _mineRoomRadius = 14;

        public static bool IsWalkable(GameLocation location, int x, int y, Character who)
        {
            if (location.map == null || !location.isTileOnMap(new Vector2(x, y)))
                return false;

            if (!location.isTilePassable(new Location(x, y), Game1.viewport))
                return false;

            if (location.doesTileHaveProperty(x, y, "Water", "Back") != null)
                return false;

            Rectangle box = new Rectangle(x * 64 + 8, y * 64 + 16, 48, 32);

            return !location.isCollidingPosition(box, Game1.viewport, false, 0, false, who);
        }

        public static Point? FindNearestWalkable(GameLocation location, Point start, int maxRadius, Character who)
        {
            for (int r = 0; r <= maxRadius; ++r)
            {
                for (int dy = -r; dy <= r; ++dy)
                {
                    for (int dx = -r; dx <= r; ++dx)
                    {
                        if (Math.Max(Math.Abs(dx), Math.Abs(dy)) != r)
                            continue;

                        int x = start.X + dx;
                        int y = start.Y + dy;

                        if (IsWalkable(location, x, y, who))
                            return new Point(x, y);
                    }
                }
            }

            return null;
        }

        public static Point? FindMineSeat(ModConfig config, Character who)
        {
            if (config.MineTileX > 0 || config.MineTileY > 0)
                return new Point(config.MineTileX, config.MineTileY);

            GameLocation mine = Game1.getLocationFromName("Mine");

            if (mine == null || mine.map == null)
                return null;

            if (IsWalkable(mine, _preferredMineSeat.X, _preferredMineSeat.Y, who))
                return _preferredMineSeat;

            List<Warp> exits = mine.warps.Where(w => w.TargetName == "Mountain").ToList();

            Point entry = exits.Count > 0
                        ? new Point((int)Math.Round(exits.Average(w => w.X)), exits.Min(w => w.Y) - 1)
                        : new Point(18, 12);

            Point? start = FindNearestWalkable(mine, entry, 4, who);

            if (start == null)
                return null;

            List<Point> room = _FloodFill(mine, start.Value, _mineRoomRadius, who);

            if (room.Count == 0)
                return start;

            int top = room.Min(p => p.Y);

            return room
                .Where(p => p.Y <= top + 1)
                .OrderByDescending(p => p.X)
                .ThenBy(p => p.Y)
                .First();
        }

        public static List<Point> FindMineRoom(Point seat, int radius, Character who)
        {
            GameLocation mine = Game1.getLocationFromName("Mine");

            if (mine == null || mine.map == null)
                return new List<Point>();

            Point? start = IsWalkable(mine, seat.X, seat.Y, who) ? seat : FindNearestWalkable(mine, seat, 4, who);

            return start == null ? new List<Point>() : _FloodFill(mine, start.Value, radius, who);
        }

        public static List<Point> FindForageGrounds(GameLocation forest, Character who)
        {
            List<Point> grounds = _ScanTiles(forest, who, (x, y) => forest.doesTileHaveProperty(x, y, "Spawnable", "Back") != null, 1);

            if (grounds.Count == 0)
                grounds = _ScanTiles(forest, who, (x, y) => forest.doesTileHaveProperty(x, y, "Diggable", "Back") != null, 2);

            if (grounds.Count == 0)
                grounds = _ScanTiles(forest, who, (x, y) => true, 4);

            return grounds;
        }

        public static Point? PickForestArrival(GameLocation forest, List<Point> grounds, ModConfig config, NPC who)
        {
            if (config.ForestTileX > 0 || config.ForestTileY > 0)
                return new Point(config.ForestTileX, config.ForestTileY);

            if (grounds.Count == 0)
                return FindNearestWalkable(forest, new Point(60, 60), 25, who);

            double cx = grounds.Average(p => p.X);
            double cy = grounds.Average(p => p.Y);

            List<Point> ordered = grounds
                .OrderBy(p => (p.X - cx) * (p.X - cx) + (p.Y - cy) * (p.Y - cy))
                .Take(40)
                .ToList();

            Point? entry = _EntryTileFromTown(forest);

            if (entry == null)
                return ordered[0];

            foreach (Point candidate in ordered)
                if (PathFindController.findPathForNPCSchedules(entry.Value, candidate, forest, 30000, who) != null)
                    return candidate;

            return ordered[0];
        }

        private static List<Point> _FloodFill(GameLocation location, Point start, int radius, Character who)
        {
            HashSet<Point> seen  = new HashSet<Point> { start };
            Queue<Point>   queue = new Queue<Point>();

            queue.Enqueue(start);

            while (queue.Count > 0 && seen.Count < 4000)
            {
                Point p = queue.Dequeue();

                Point[] neighbours =
                {
                    new Point(p.X + 1, p.Y),
                    new Point(p.X - 1, p.Y),
                    new Point(p.X, p.Y + 1),
                    new Point(p.X, p.Y - 1)
                };

                foreach (Point next in neighbours)
                {
                    if (Math.Abs(next.X - start.X) > radius || Math.Abs(next.Y - start.Y) > radius)
                        continue;

                    if (seen.Contains(next) || !IsWalkable(location, next.X, next.Y, who))
                        continue;

                    seen.Add(next);
                    queue.Enqueue(next);
                }
            }

            return seen.ToList();
        }

        private static List<Point> _ScanTiles(GameLocation location, Character who, Func<int, int, bool> predicate, int step)
        {
            List<Point> result = new List<Point>();

            if (location.map == null)
                return result;

            int width  = location.map.Layers[0].LayerWidth;
            int height = location.map.Layers[0].LayerHeight;

            for (int y = 1; y < height - 1; y += step)
                for (int x = 1; x < width - 1; x += step)
                    if (predicate(x, y) && IsWalkable(location, x, y, who))
                        result.Add(new Point(x, y));

            return result;
        }

        private static Point? _EntryTileFromTown(GameLocation forest)
        {
            Warp warp = forest.warps.FirstOrDefault(w => w.TargetName == "Town");

            if (warp == null || forest.map == null)
                return null;

            int width  = forest.map.Layers[0].LayerWidth;
            int height = forest.map.Layers[0].LayerHeight;

            return new Point(Math.Clamp(warp.X, 1, width - 2), Math.Clamp(warp.Y, 1, height - 2));
        }
    }
}
```

</details>

## Dialogue

Once Emily could walk around the world, she needed something to say.

Stardew keeps an NPC's dialogue in a JSON file, which is a perfectly fine way of doing it, but pretty annoying to write in Visual Studio. Each line also has an associated portrait, so I had to keep track of which expression corresponded to which ID.

More importantly, I needed to write dialogue that fit into the game while still sounding like *her*. That was surprisingly challenging. I spent a couple of hours on the lines, and I think that's okay. Dialogue is vital to get right, especially when the entire point is that the character is supposed to be someone you know.

I also wanted her to be a little aware of the circumstances she was living in. Here are some of my favourite lines:

> *Sometimes people think me and Haley are related. Not sure why.*

> *At least Linus has a tent...*

> *Don't say anything, he might be watching. I despise him for not drawing me winter clothing.*

> *The Governor asked what I do. I said 'mushrooms'. He asked 'what kind of mushrooms?'. I didn't say anything else.*

> *Ugh. Wtf Luca. No.*

The last one is for when she receives a gift she hates. She says stuff like that sometimes, so I thought it would be funny to include.

I also added a few references to "Diego", her friend, who is no one in the game, or real life for that matter. So it's up to interpretation. Mine is that she's gone crazy in the caves.

In the final heart event, I let the player ask:

> *Can you finally tell me who Diego is?*

And then she just keeps on talking, ignoring you.

Now, you're definitely not gonna catch me writing movies for Hollywood anytime soon, but the dialogue is fairly extensive, and I think I did alright.

There was one part, though, where I wanted the dialogue to do more than make her feel like a believable Stardew character.

## Heart Events

No NPC is complete without heart events.

Briefly, these are cutscenes that play as your friendship level with an NPC rises. I decided to make four for Emily, at two, four, six, and eight hearts. Thankfully, I didn't need to make any more art, just write the scenes and do a bit of coding to wire them up.

The first two are fairly simple. At two hearts, you go foraging together. At four, you meet her at the mine entrance after 7 p.m., and she explains why she lives in a cave, just to make it a little more "immersive".

For six and eight hearts, I wanted the scenes to be more tailored to her as a person. It seemed appropriate, since you're gradually becoming closer friends in the game. Again, for privacy, I'm not gonna reveal the details of the six-heart event, but she shares something relevant to her life. Nothing that dramatic or private, but still a wholesome moment.

There was also something missing from the cutscenes: music. They felt awfully quiet without it.

Thankfully, I didn't have to sit there and make a whole piece from scratch, even though I suspect that wouldn't have taken me more than 30 minutes given how simple Stardew music is.

Sometime this summer, I made a Stardew Valley-esque piece that I thought would be perfect. There was a slight problem, though. I also accidentally nuked my music drive this summer, and while I had a backup, it didn't cover that project file. By some miracle, the full render was still in me and my sister's WhatsApp chat.

Here's the piece:

<audio controls preload="metadata" src="../../assets/entries/stardew-valley-mod/mod.mp3"></audio>

It does end a bit abruptly. Admittedly, I didn't render the reverb tail the first time around.

In any case, it coincidentally split up very nicely, with the two sections serving perfectly for the forest and cave events. I split them up, set up the loops, and just like that, the heart events had their own custom music as well, which I thought was pretty neat.

For the eight-heart event, though, I wanted to do something special. I decided that would be the main thing to work towards in the mod.

It starts fairly normally: you enter the mines in the evening, and Emily says she wants to show you something. Then the scene cuts to floor 100 of the mines, which, if you don't know, looks like this:

<img src="../../assets/entries/stardew-valley-mod/floor-100.png" width="50%" style="border-radius: 16px;" />

I thought it'd be pretty cool, like a Star Wars-type scene or something.

Anyway, the cutscene goes on as normal. Emily says a few things, but then I start breaking the fourth wall. It isn't too obvious at first, but it becomes fairly obvious. At that point, I'm not really writing dialogue for an NPC anymore. I'm talking directly to Emily, via Emily.

Kinda weird when I put it that way.

I wanted the scene to acknowledge what the whole project was in the first place: a gift for a friend. And I wanted to end it with my favourite line of dialogue in the whole mod:

> *Thanks for being my friend.*

Of course, that leaves a slight problem. I've just broken the fourth wall in a game where Emily is supposed to be a normal character. So, to glue it back together, she sends you a letter the following morning:

<img src="../../assets/entries/stardew-valley-mod/mail.png" width="50%" style="border-radius: 16px;" />

Which I personally think is hilarious.

So, this is Emily:

<img src="../../assets/entries/stardew-valley-mod/final-result.png" width="50%" style="border-radius: 16px;" />

I guess this is as close to a final result as I can display.

## Playing

All that's left is for me and her to hop into a new save and play. Hopefully she doesn't think it's garbage.

---

It's now been a little over a week. We got to play it yesterday, and overall I think it went well. She seemed very happy, which is always good, I suppose.

There were a couple of issues, though. As always with software, as soon as you bring it outside of a testing environment, something is cosmically bound to break, and this time was no different.

Literally, within the first five or so minutes of playing, as we were having our first look at the NPC, she just decided to walk through a tree, making the tree explode in the process. Emily (the real one) absolutely loved it. She thought it was great and the best thing she'd seen so far; my engineer brain did not share her enthusiasm at first. Still, after the initial "oh shit", I found it funny as well.

The second issue was when the NPC went back to her cave. I completely forgot that in the first few in-game days this is a thing:

<img src="../../assets/entries/stardew-valley-mod/mines-block.png" width="50%" style="border-radius: 16px;" />

Effectively, the mines are blocked off entirely. So imagine my panic when I saw her stuck, walking into the pile of rocks. Thankfully, the game had apparently anticipated this, and just made her walk through the rocks after a few seconds. Like it never happened.

Those two bugs aside, the rest worked great, to my relief.

Emily was happy to see I got her eye colour as well as her likes and dislikes right. Also, in her words: "Look at her hair! She's mogging me!", which was nice to hear.

But maybe my favourite part was following the NPC back to the mines. Emily was expecting a house of sorts, or even a mansion, as she put it. But the NPC walked past every house, so Emily's next guess was "maybe Linus' tent?", only to watch her walk straight into the mines. I thought that was pretty funny.

## Final Thoughts

This project was pretty fun for me. I got to tackle my arch-nemesis for a good cause. I also think I did well, at least in the art department. Which is a problem now, because she wants me to draw her, on paper, by hand. You saw the result of that last time. So that's fairly concerning, but she did say she'll come travel with me to Asia this coming year if I do, so I suppose my hands are tied.

There is something still lingering for me, though. I don't think I reached my own bar for scope. What I think happened was that I was just very excited to share this with her, and I rushed. Normally, I'd spend more time in order to take fewer shortcuts and make sure every loose end is tied up. This time, I feel like I somewhat cheated on the art by leaning on the website and Haley's sprites, and cut it short before adding more features like, you know, a house. The final product is still pretty good, and I am proud of it, but a lesson for next time is that I should slow down.

That aside, I'd call this a success!

Thanks for reading! I won't release the repository this time for privacy reasons.
