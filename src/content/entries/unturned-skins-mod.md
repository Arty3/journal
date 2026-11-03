---
title: Unturned Skins Mod
description: For what it's worth
tags:
- c#
- rust
- modding
- reverse engineering
- economics
draft: false
written: november 2026
project: january 2025 - march 2025
status: completed
thumbnail: /assets/entries/unturned-skins-mod/example_ingame.png
---

## A Peculiar Little Economy

Between 2021 and 2023, I spent a fairly unreasonable amount of time trading virtual items in a free-to-play zombie survival game.

That game was [Unturned](https://store.steampowered.com/app/304930/Unturned/), which I've already spoken about extensively in my [graphics overhaul entry](https://journal.lucagoddijn.com/entries/unturned-graphics-overhaul/). For a few years, it was a pretty significant part of my life, and one of the more unusual corners of that experience was its skin trading community.

Now, I know what you're thinking. Virtual cosmetics? Really?

Yah. And I actually managed to make a surprisingly profitable little business out of them.

But before I get into that, I should explain how Unturned's skin economy works, because it's a little different from what you might be familiar with in games like Counter-Strike.

Like many games, Unturned has cosmetic skins which can be obtained by opening boxes. These boxes contain a predetermined selection of items, each with different rarities, and occasionally you'll receive something particularly special: a *mythical*.

Mythicals are ordinary skins with an additional particle effect attached to them. These effects range from fire, electricity, floating objects to all kinds of weird things like floating bananas. Some look terrible, others look actually pretty good, and naturally, people are willing to pay considerably more for the good ones.

People actually went pretty crazy with this stuff, and the combinations felt endless. Here are a few examples:

<div class="img-grid">
  <img src="../../assets/entries/unturned-skins-mod/sets-1.png" />
  <img src="../../assets/entries/unturned-skins-mod/sets-2.png" />
  <img src="../../assets/entries/unturned-skins-mod/sets-3.png" />
  <img src="../../assets/entries/unturned-skins-mod/sets-4.png" />
</div>

*(Thanks to Lonely V for the screenshots)*

However, there's another way to obtain them.

Unturned has a crafting system where you can scrap unwanted skins into crafting materials. At the time, you could exchange 1,000 of these materials for a randomly generated skin with a particle effect.

This is where things get interesting.

When you open a box, you can only receive combinations of the skins and mythical effects available within that particular box. The possible outcomes are therefore relatively limited.

Particle crafting, on the other hand, can produce essentially any combination of applicable weapon skins and particle effects.

That means you can end up with combinations which have never existed before, and may never exist again.

I remember calculating the number of possible combinations at the time, and I believe it was somewhere around 70,000. Don't quote me on that, though. It's been years, and the number will have changed considerably since then.

Most of the time, you'd get absolute garbage. You'd spend a considerable amount of money, press a button, and receive some awful combination that nobody in their right mind would want. But every now and then, something genuinely special would come out.

A beautiful combination of an already desirable skin with a matching mythical effect. Something that was quite possibly the only example of its kind in existence, and would likely remain that way for years.

These were called one-of-one crafts, or simply 1/1s, and they were the things I loved collecting. Here are a couple of examples:

<img src="../../assets/entries/unturned-skins-mod/crafts-1.png" width="40%" style="border-radius: 16px;" />
<img src="../../assets/entries/unturned-skins-mod/crafts-2.png" width="40%" style="border-radius: 16px;" />

There was something particularly appealing about the uniqueness of these items. Unlike an ordinary expensive skin, which might have hundreds of identical copies, these were effectively individual objects with their own histories.

You could know exactly who crafted one, who had owned it, how much it had sold for, and so on. And because the community was relatively small, those histories actually mattered.

At the time, the trading scene probably consisted of a few thousand people, perhaps 2,000-3,000 by my estimate. It was small enough that, after spending enough time there, you started recognising everyone.

People would spend hours looking through inventories, discussing trades, gossiping about other traders, and watching each other unbox and craft.

I genuinely loved that little community, or at least, the non-toxic positive part of it.

## A Small Business

Let's return to those 1,000 crafting materials.

Normally, the cheapest skins on the Steam Community Market were commons, which sold for around €0.03 each. Scrapping a common would yield one crafting material, an uncommon two, and so on up to a mythical yielding ten.

So, if you wanted to generate a single particle craft using commons purchased from the Steam market, you'd need to spend €30. All for one completely random skin that was far more likely to be worthless than desirable.

Naturally, people were looking for cheaper ways to get crafting materials, and so was I.

At the time, Unturned had a mechanic where every two hours of playtime, you'd receive a random skin drop, usually a common and occasionally an uncommon, yielding one or two scrap. This worked even in single-player. And so I ran an army of bots.

Simply put: they would launch the game, sit in single-player, and slowly accumulate skins through the playtime reward system. Over enough time, this generated a surprisingly large supply of crafting materials.

I was one of only a couple of people doing this at first, but it didn't take more than a year to catch on, and soon enough I was nowhere close to the only one.

In fact, it became such a widespread problem that Unturned's player count was significantly inflated by bots. As I understood it at the time, the problem eventually attracted Steam's attention as well, leading Nelson, the game's creator, to permanently disable the playtime skin drops.

There was also another little trick I took advantage of, specifically early on.

Steam's community market had a minimum price of approximately three cents in euros, largely because of the fees involved in each transaction. However, when purchasing with certain currencies that had considerably less value, the effective minimum price could become lower. This meant I could buy common skins in bulk for less than their already tiny market price. I believe the loophole has since been patched, and for good reason.

Between those purchases and the automated drops, I accumulated hundreds of thousands of crafting materials.

That sounds ridiculous now, but at the time it was a relatively straightforward operation. Once everything was running, the supply largely took care of itself. It would maybe take a couple of weeks to generate a significant amount of stock.

I could then sell the crafting materials at a significant discount. Sometimes I'd sell 1,000 materials for as little as €5, compared to the €30 someone would otherwise spend buying commons directly from the market. Eventually, this stabilised around €7 to €9 per 1,000 materials.

That was already a decent little business, but it wasn't the whole business.

I was primarily interested in collecting one particular kind of skin: Maplestrikes. The Maplestrike was essentially the dominant assault rifle in Unturned's PvP scene. If you played PvP, chances were you used one, and naturally, desirable skins for it were especially valuable.

For example, the most expensive skin in the whole game is the Energized Hypertech Maplestrike:

<img src="../../assets/entries/unturned-skins-mod/energized_hypertech.png" width="60%" style="border-radius: 16px;" />

To be fair, it isn't because the skin is "better"; that's incredibly subjective, and it simply isn't true. The real reason was the hype that built up around it over the years it had been in circulation.

Anyway, I wanted to collect as many unique Maplestrike crafts as I could.

So I built a system around that: all the crafting materials I sold went through a centralised trading account, separate from my main account. Whenever someone purchased scrap from me, their Steam profile would be added to a database.

If you're wondering how large the database became, I believe it was somewhere around 500-600 from scrap sales alone. Of course, I also kept track of other traders in general, so the total number was probably somewhere around 2,000.

In any case, my system would then periodically monitor their inventory.

If their inventory was private, there wasn't much I could do, but if it was public, I could see when they spent the crafting materials and what they got in return.

And if they happened to craft a Maplestrike? Then, I'd be among the first people to know, and so I'd then approach them from my main account to try to buy it.

Often, they'd be willing to sell it relatively cheaply, especially if they weren't particularly interested in the Maplestrike themselves.

Over time, this allowed me to accumulate a fairly substantial collection of unique crafts.

I kept my own inventory private at all times, deliberately. While other traders could look through public inventories to see what people owned, mine was effectively hidden. I was also known primarily as a collector, rather than someone who was constantly buying and selling, and I used that reputation to my advantage.

Whenever I wanted to sell something, I'd announce that I was willing to part with it, usually for a relatively high price. Almost always, people would decline. Fair enough. I'd simply keep it.

Then, a few months later, I'd occasionally announce the same thing, this time asking for a slightly higher price, and surprisingly often, they'd agree.

Obviously, this is just impulse buying, but I think a large part of this actually came from the perceived scarcity of the items. If I was a collector who didn't really want to sell, and the skin was genuinely one of a kind, then refusing the offer meant potentially never getting another opportunity. This was especially reinforced because I didn't always attempt to sell it again.

There's an interesting resemblance here to the diamond market, particularly in how scarcity, perceived value, and the willingness to withhold supply can influence prices.

Of course, I wasn't controlling an entire market, and unlike diamonds, these skins really could be unique combinations. But the psychology was not entirely different. I just managed to be in an era where there was less absolute supply to begin with, working to my advantage.

Anyway, all of this worked pretty well. In fact, it was profitable enough that I eventually paid for my PC with the money I made from trading.

I think this was probably the first time I took such a systematic approach to a market and actually made it work. And a fun fact: my whole system around skins was actually my first proper software project. The code was terrible, but it worked, it was practical, and it holds a special place in my heart. It is maybe one of the earliest relics of my learning loop actually working.

Looking back, some of the methods were certainly questionable, particularly the bot farming and currency loopholes. But I was a 16 year old fascinated by the systems behind the economy, and I genuinely enjoyed collecting the items themselves.

I didn't really think of it as running a business at the time. It was mostly something I did for fun that happened to make money.

Eventually, though, I moved on.

By 2023, I had largely stopped trading. The community gradually changed, supply grew, my interests shifted elsewhere, and I simply didn't feel the same desire to keep collecting.

The entire skin economy was also changing. With the automated drops gone, fewer cheap skins were entering circulation, slowly crippling the supply, which made crafting increasingly expensive.

The recipe was eventually reduced from 1,000 materials to 750, but even that hasn't really solved the underlying problem.

Still, even after leaving the trading scene, I remained in contact with several friends from those years, and one of them eventually gave me an idea.

## A Few Years Later

Fast-forward to January 2025.

One of my closest friends, whom I've known for seven or eight years now, was still very much involved in the trading scene.

We'd originally got into skin trading together, starting at roughly the same time. But while I moved on, he stayed. He invested considerably more time and money than I ever did and eventually became a much more prominent figure in the community.

He also loved crafting. And when I say loved, I mean he'd sometimes sit down and craft 200 skins in under an hour. If you're keeping track, that's thousands of euros.

Now, crafting is effectively a form of gambling. You spend money for an uncertain outcome, with the hope that you'll receive something worth considerably more than what you put in.

My friend also mentioned how certain server administrators would create private skin-changing plugins, allowing themselves to use whatever cosmetics they wanted on their own servers. This wasn't something the game allowed. Which got me thinking: What if I could replicate the crafting system, but remove the financial aspect entirely? The player would still press the button, receive a random craft, watch the result appear, and inspect the item. But there would be no money involved, and, more importantly, no actual reward. Effectively, a crafting simulator.

I found the idea interesting, primarily because I was curious whether I could actually implement it, but also because I simply wanted to enjoy it myself for 20 minutes as well.

At this point, I should mention that I was already decently familiar with Unturned's internals. I'd been developing server plugins for years, which was actually how I originally learned C#, and reverse engineering was a pretty ordinary part of that work.

However, I'd never attempted anything quite like this. Server plugins generally operate within systems the game already provides. What I wanted to do involved directly manipulating the game's economy, inventory, and UI, all while making it look and behave as though nothing had changed.

And so I got to work.

## Picking Apart the Game

Now, I wish I could tell you that I had some particularly clever method for reverse engineering the game. I did not. For the most part, I sat in Visual Studio, searched for words that sounded relevant, and slowly pieced things together.

I'd search for something like "steam", look through all the references, find a method that seemed promising, and decompile it. Then I'd read through it, try to understand what it was doing, follow other method calls & code paths, inspect the surrounding classes, and repeat. Again and again and again.

Unturned is a fairly large game, and its decompiled source was not particularly pleasant to navigate. There were enormous classes, similarly named methods, and multiple code paths that appeared to do almost exactly the same thing. I mean look at this:

<img src="../../assets/entries/unturned-skins-mod/code_example.png" width="60%" style="border-radius: 16px;" />

What the hell is this.

Obviously, looking at this for more than 10 seconds, you understand what is roughly going on, but imagine stuff like this across a large maze of files, where you have no source tree to follow either. Messy becomes the norm.

In any case, sometimes I'd spend a while understanding a method, only to realise that it wasn't actually the one being called. That was pretty frustrating.

When I wasn't sure which code path was executing, I'd occasionally write a quick Harmony patch that logged whenever the method was called, launch the game, and see what happened.

For those unfamiliar, [Harmony](https://github.com/pardeike/Harmony) is a library that allows you to modify the behaviour of .NET applications at runtime.

Rather than editing the original game assembly, you can attach additional code to existing methods.

For example, a prefix runs before a method, while a postfix runs afterwards. Prefixes can also prevent the original method from executing, allowing you to replace its behaviour entirely.

This is extremely useful when working with software whose source you don't control.

In my case, Harmony allowed me to intercept several parts of Unturned's economy and UI systems, including inventory refreshes, cosmetic equipment, and crafting-related functionality.

Here's an example from the project:

```csharp
[HarmonyPostfix]
[HarmonyPatch("refreshInventory")]
public static void Postfix_refreshInventory(TempSteamworksEconomy __instance)
{
	ItemPersistenceManager.RestoreGeneratedItems();
}
```

This particular patch runs after Unturned refreshes the player's Steam inventory. Why? Because the items I generated didn't actually exist on Steam's servers, and that was pretty important.

The real crafting system generates items server-side. When you craft something, the game communicates with Steam's inventory services, which ultimately determine and grant the resulting item.

I obviously couldn't ask Steam to generate arbitrary real items for me, so I had to recreate that part locally. Fortunately, once I understood how Unturned represented inventory items internally, the solution was relatively straightforward.

The game uses structures such as `SteamItemDetails_t`, which contain information about an item, including its definition, quantity, and unique instance ID. I could construct these structures myself and insert them into the local inventory. The trick was making sure they didn't conflict with genuine items. For that, I started the instance ID counter at `ulong.MaxValue` and counted downwards. Since real Steam inventory items have their own identifiers, generating mine from the upper end of the 64-bit range made collisions extremely unlikely. It was a simple solution, but it worked.

Once the item existed locally, I could call the same methods Unturned normally used to display crafting results, open the item inspection screen, and equip cosmetics.

The game would happily render everything as though the item had been obtained legitimately. Of course, it wasn't actually yours, but visually, it was the same:

<img src="../../assets/entries/unturned-skins-mod/items_in_inventory.png" width="60%" style="border-radius: 16px;" />

There was one annoying problem, though. Whenever Unturned refreshed the inventory, it would naturally replace its local state with whatever Steam reported, and since Steam had no idea my generated items existed, they would disappear.

To combat this, I wrote the `ItemPersistenceManager`, which kept a cache of the generated items and reinserted them whenever the inventory refreshed. It also tracked equipped cosmetics and their particle effects so that they could be restored correctly. This was persistence within the running game session, not permanent storage across launches. Closing the game meant losing the generated items, which was perfectly fine for a tool intended for experimentation.

Again, not particularly elegant, but it did the job.

### Recreating the Economy

The other major problem was figuring out what items could actually be generated. Unturned stores a considerable amount of economy information locally, in a file called `EconInfo.bin`. This contains definitions for the game's cosmetic items, including their names, identifiers, types, and other properties. I wrote a loader to parse this file and construct collections of the various types of items I was interested in. And by wrote I mean: figure out how the game does it, and do the exact same thing with the exception of a few if statements.

That provided most of the information I needed. Unfortunately, it didn't provide everything.

The actual crafting logic was server-side, and there wasn't a particularly convenient way to retrieve all the rules governing mythical effects and their valid combinations.

So I ended up maintaining enormous dictionaries of effect names, IDs, colours, and other information.

There's actually a comment in the source which sums up my feelings about this well:

> Unholy sins ahead...

And another one explaining why I didn't have a better solution:

> I could go and parse all the mythical .dat files but because there is no distinction between head mythicals and applicable crafting effects, I can only hardcode them, since the crafting logic is server-sided. :(

I still don't particularly like this solution.

It was a maintenance burden, because whenever new effects or skins were added, I had to update the dictionaries manually. But at the time, I couldn't think of a significantly better approach that wouldn't require considerably more effort.

There was another interesting distinction I had to account for: Unturned doesn't represent every mythical skin in quite the same way.

Some combinations already exist as individual mythical item definitions. Others, particularly particle crafts, are represented using an ordinary skin definition with additional properties describing the effect.

So, when generating a specific combination, my code would first check whether a corresponding mythical definition already existed. If it did, great. I could simply use that definition. Otherwise, I'd use the base skin and attach the desired particle effect through the item's dynamic economy properties.

Of course, for crafting itself, I had to override this behaviour: a particle craft of a combination is a distinct item from the boxed mythical of that same combination, so even when a standard mythical definition existed, the craft had to be generated as the base skin with the effect attached.

These properties are effectively strings containing additional information about an item. For example:

```text
particle_effect:16;
```

Here, `16` identifies the Energized effect.

And that's how I could start generating combinations which didn't have their own item definitions.

There was still a small problem: Unturned needed to know which effect to render when the item was inspected or equipped.

For that, I patched `TempSteamworksEconomy.getInventoryMythicID()` using a Harmony prefix.

Normally, this method retrieves the mythical effect associated with an item. My patch could instead look up the effect I'd attached to the generated item and return that value to the game.

If it found the appropriate effect, the prefix would provide the result and skip the original implementation. And just like that, the rest of the game could render the combination through its existing systems.

The randomness itself was relatively straightforward. I'd select from the appropriate pool of skins and effects, construct the resulting item, and pass it through the same local UI flow.

I don't know whether my distribution perfectly matched the one used by Steam, since I couldn't inspect the original server-side selection logic, but the available outcomes and the behaviour of the simulated crafting system were sufficiently faithful that, to the naked eye, the difference wasn't noticeable.

And so:

<img src="../../assets/entries/unturned-skins-mod/example_craft.png" width="40%" style="border-radius: 16px;" />

I also made a smaller change to the game's economy functionality: Unturned normally imposes country-specific restrictions on certain randomised item operations. Since those restrictions were checked through properties exposed by the economy service, I could override the relevant values using reflection.

This allowed the original box-opening and crafting interfaces to remain available in circumstances where those country restrictions would otherwise prevent them from being used.

In retrospect, this isn't entirely ethical, as those regulations are there for a reason. But I knew that everyone just used a VPN anyway, so this would just be slightly more convenient.

I did end up reporting this to Nelson, and of course he knew about this already, but as he mentioned there was nothing he could do as Steam hadn't properly addressed this on the server side yet, and other games such as TF2 applied this same approach.

## A Skins Sandbox

The original crafting simulator was only the beginning. Once the basic system worked, I started thinking about everything else I could do with it.

One of the things I loved about Unturned's skins was simply exploring what was possible.

Sometimes you'd want to inspect a particular skin in-game without buying it. Other times, new skins would be added to the game's files before an update was officially released, meaning that people who knew how to manipulate those files could inspect them early.

There were also special cosmetics that ordinary players couldn't obtain, such as items reserved for staff members, and all kinds of combinations that were technically possible to render but couldn't normally be generated.

Historically, people who wanted to experiment with these things would often have to modify their game files, replace existing skins, or use some other workaround. I thought that was a bit ridiculous.

If I already had the ability to generate arbitrary cosmetic items, why not make a complete sandbox for them?

So the project gradually grew beyond its original purpose.

I added a menu where you could browse every available skin, search for specific items, select particle effects, generate random mythicals, and create combinations that normally wouldn't exist. And, of course, you could use the resulting skins in-game, or more accurately: in single-player.

The menu was accessible directly from the game's existing inventory interface through a new button:

<img src="../../assets/entries/unturned-skins-mod/menu_button.png" width="30%" style="border-radius: 16px;" />

Clicking it would open the skin generation menu:

<img src="../../assets/entries/unturned-skins-mod/example.png" width="60%" style="border-radius: 16px;" />

One particularly fun part was allowing people to select effects independently of the item. Remember how I mentioned earlier that particle crafting normally generated combinations of weapon skins and effects? Well, I didn't have to stop there.

Why not generate particle crafts for cosmetics as well? Or combine items and effects which could never normally appear together?

The original crafting system followed its own rules, but the sandbox allowed for more. If you wanted to try some ridiculous combination, you could.

For instance:

<img src="../../assets/entries/unturned-skins-mod/example_impossible.png" width="29.3%" style="border-radius: 16px;" />

<img src="../../assets/entries/unturned-skins-mod/sacrificial_antlers.png" width="60%" style="border-radius: 16px;" />

This would normally be impossible in the base game, since antlers are from one of the first boxes, and sacrificial came much later. Like trying to mix dinosaurs with the iPhone.

It wasn't just about getting something expensive for free. It was about exploring possibilities that the original economy would never ordinarily produce.

There was a problem though. Searching for items can be a pain, and needing to type in the exact name or part of the name for the skin you want makes it even worse. This is because sometimes you just want to see, say, all Maplestrikes without doing some weird filtering menu stuff.

So I implemented a fuzzy search system using a Burkhard-Keller tree, or BK-tree. This is a data structure which organises strings according to their edit distance, allowing you to find approximate matches rather than requiring an exact search.

In my implementation, I used Levenshtein distance alongside prefix and substring matching, so you could search for skins without remembering their exact names.

It was probably a little excessive for a catalogue of only a few thousand items, but I enjoyed implementing it.

I'm actually quite happy with the implementation; I think it's clean and works well. Here's the class:

```cs
using System;
using System.Linq;
using System.Collections.Generic;

using Unturned.SystemEx;
using SDG.Provider;

using static SkinsModule.ModuleLogger;

namespace SkinsModule
{
    /*
        BKTree class for efficient fuzzy string search.
        For the econInfo dict which has a constrain of < 3000 entries (probably),
        the search time is O(log n) so decently fast while balancing matching features
    */
    public class BKTree
    {
        private class Node
        {
            public UnturnedEconInfo         Info;
            public Dictionary<int, Node>    Children;

            public Node(UnturnedEconInfo info)
            {
                Info        = info;
                Children    = new Dictionary<int, Node>();
            }
        }

        private class SearchResult
        {
            public UnturnedEconInfo Info    { get; set; }
            public double           Score   { get; set; }
        }

        private Node         root;
        private HashSet<int> foundItems;

        public BKTree(IEnumerable<UnturnedEconInfo> data)
        {
			Log("Building EconInfo BKTree...");
			foreach (var info in data)
                if (!EconInfoLoader.isAchievementItem(info.itemdefid))
                    Add(info);

            foundItems = new HashSet<int>();
        }

        private int LevenshteinDistance(string a, string b)
        {
            int[,] dp = new int[a.Length + 1, b.Length + 1];

            for (int i = 0; i <= a.Length; ++i) dp[i, 0] = i;
            for (int j = 0; j <= b.Length; ++j) dp[0, j] = j;

            for (int i = 1; i <= a.Length; ++i)
                for (int j = 1; j <= b.Length; ++j)
                    dp[i, j] = Math.Min(
                        Math.Min(
                            dp[i - 1, j] + 1, 
                            dp[i, j - 1] + 1),
                        dp[i - 1, j - 1] + (
                        (a[i - 1] == b[j - 1]) ? 0 : 1)
                    );

            return dp[a.Length, b.Length];
        }

        public void Add(UnturnedEconInfo info)
        {
            if (root == null)
            {
                root = new Node(info);
                return;
            }

            Node current = root;
            while (true)
            {
                int distance = LevenshteinDistance(info.name, current.Info.name);
                if (!current.Children.ContainsKey(distance))
                {
                    current.Children[distance] = new Node(info);
                    break;
                }
                current = current.Children[distance];
            }
        }

        private double CalculateScore(string query, string name, int distance)
        {
            return 1.0 - ((double)distance / Math.Max(query.Length, name.Length));
        }

        private List<SearchResult> FastPrefixSearch(string query, int desiredResults)
        {
            List<SearchResult>  results = new List<SearchResult>();
            Stack<Node>         stack   = new Stack<Node>();

            stack.Push(root);

            while (stack.Count > 0 && results.Count < desiredResults)
            {
                Node node = stack.Pop();
                if (!foundItems.Contains(node.Info.itemdefid) &&
                    node.Info.name.StartsWith(query, StringComparison.OrdinalIgnoreCase))
                {
                    results.Add(new SearchResult
                    {
                        Info = node.Info,
                        Score = 1.0 + (1.0 / node.Info.name.Length)
                    });

                    foundItems.Add(node.Info.itemdefid);
                }

                foreach (Node child in node.Children.Values)
                    stack.Push(child);
            }

            return results;
        }

        private bool IsGoodMatch(string query, string name, int maxDistance, out int distance)
        {
            name = name.ToLowerInvariant();
            distance = maxDistance + 1;

            if (name.Contains(query, StringComparison.OrdinalIgnoreCase))
                return true;

            string[] words = name.Split(' ');
            foreach (var word in words)
            {
                distance = LevenshteinDistance(query, word);
                int allowedDistance = query.Length <= 4 ? 1 : maxDistance;

                if (distance <= allowedDistance &&
                    Math.Abs(word.Length - query.Length) <= maxDistance + 1)
                    return true;
            }

            return false;
        }

        public List<UnturnedEconInfo> Search(string query, int maxDistance, int itemsPerPage)
        {
            Log("Searching EconInfo BKTree...");

            if (root == null || string.IsNullOrEmpty(query))
                return new List<UnturnedEconInfo>();

            query = query.ToLowerInvariant();

            List<SearchResult> results = FastPrefixSearch(query, itemsPerPage);

            if (results.Count >= itemsPerPage)
                return results.OrderByDescending(r => r.Score)
                              .Take(itemsPerPage)
                              .Select(r => r.Info)
                              .ToList();

            Stack<Node> stack = new Stack<Node>();
            stack.Push(root);

            while (stack.Count > 0)
            {
                Node node = stack.Pop();

                if (foundItems.Contains(node.Info.itemdefid))
                    continue;

                string name = node.Info.name.ToLowerInvariant();

                if (IsGoodMatch(query, name, maxDistance, out int distance))
                {
                    results.Add(new SearchResult
                    {
                        Info = node.Info,
                        Score = CalculateScore(query, name, distance)
                    });

                    foundItems.Add(node.Info.itemdefid);
                }

                foreach (var pair in node.Children)
                        stack.Push(pair.Value);
            }

            foundItems.Clear();

            return results.OrderByDescending(r => r.Score)
                          .Select(r => r.Info)
                          .ToList();
        }
    }
}
```

And so, finally, this worked:

<img src="../../assets/entries/unturned-skins-mod/example_search.png" width="60%" style="border-radius: 16px;" />

Crazy, the stuff we take for granted.

The result felt much more like an actual part of the game, rather than a collection of debugging tools. Or at least, that was the goal, and getting there was considerably more frustrating than I expected.

## The UI Problem

I think the UI was probably the single most time-consuming part of the entire project.

Unturned has its own UI framework, called Sleek, which is what I used to build the interface.

To be fair, it was useful having an existing system to work with. Much of my menu closely resembled Unturned's original inventory interface, so I could reuse its components, textures, and layout ideas.

But actually working with it was a nightmare (sorry Nelson).

The code was messy, positioning elements was tedious, and I constantly had to account for different UI scales, button interactions, visibility states, and all kinds of other little details.

The worst part was the iteration time: every time I wanted to see a change, I had to compile the module, drop in the DLL, and relaunch the game. And launching Unturned took a minute or more.

So imagine spending a minute waiting for the game to open, just to discover that a button would look slightly better if it were two pixels to the left. And so on for hours.

I am not exaggerating when I say that a significant amount of the development time was spent doing exactly this.

Nelson had mentioned plans to overhaul the game's UI systems on the code side years earlier, but that overhaul never really materialised. I know other developers were disappointed about this as well.

And after working with Sleek for this project, I understood why.

If you look through [`GenerateUI.cs`](https://github.com/Arty3/Unturned-Skins-Mod/blob/main/src/internal/GenerateUI.cs), you'll find hundreds of lines dedicated almost entirely to constructing UI elements, setting their positions, configuring interactions, and managing their visibility.

Like what the hell is this:

<img src="../../assets/entries/unturned-skins-mod/ui-code.png" width="40%" style="border-radius: 16px;" />

I'd rather do it in XML at this point.

Thankfully, eventually, after enough trial and error, it worked.

And I was genuinely happy with how it looked. I wanted people to feel like the skin generation menu belonged in Unturned, rather than being some external tool awkwardly attached to it. I think I succeeded in that.

## Making It Easy to Use

There was still one problem: actually getting the mod to run was inconvenient.

Unlike a conventional Steam Workshop mod, this project used Unturned's module system. A module requires a particular directory structure inside the game's installation, along with the compiled DLLs, metadata files, and other supporting files. And because BattlEye doesn't permit these kinds of modules to run normally, you also had to disable it. Otherwise, you'd get kicked after roughly fifteen minutes.

Now, imagine explaining all of this to someone who just wants to generate a few skins.

I could have written a Python script to automate it, but I wanted something that felt a little more approachable.

People are already suspicious enough of programs that modify game files. Asking them to run some unfamiliar script wasn't going to help.

So I decided to make a launcher: an executable that would handle everything automatically.

I could have written it in C or C++, which were my usual choices for this sort of thing, but I decided to use Rust instead. Why? I felt like it.

The launcher would locate the Steam installation, find the game files, create the module directory, copy the required DLLs, write the metadata, and temporarily disable BattlEye.

It would then launch Unturned through Steam and monitor the game's logs, forwarding the relevant output to its own console.

Once the game closed, it would remove the module and re-enable BattlEye.

Effectively, the entire process was reduced to running a single executable. Much nicer.

There was also an important reason for keeping everything strictly local.

I deliberately avoided making the generated items interact with Steam's inventory services or Unturned's servers. The purpose was to inspect cosmetics and simulate crafting in single-player, not to give people items they could actually use online or trade. Not that Steam's servers would ever let that happen, but in theory, with some server-side magic, a purely visual multiplayer setup could work.

The launcher also made sure the game ran without BattlEye, avoiding the problem of having the anti-cheat interfere with the module.

That distinction became important once I released the project.

But before we get there, there's one small feature I should mention.

## A Favour From Nelson

If you've spent enough time around Unturned, you'll probably know that Nelson, the game's creator, is a distinctly kind person.

Over the years, he has been incredibly accommodating towards the community. I've personally had a lot of interactions with him, from reporting bugs and vulnerabilities to asking questions about the game, and I've always appreciated how much time and attention he gives people.

Unfortunately, people sometimes take advantage of that kindness.

For years, there was a rather amusing situation in the skin trading community: people would spend large amounts of money opening boxes, receive absolutely nothing worthwhile, and then email Nelson directly about it.

And because Nelson was Nelson, he'd sometimes make an exception and generate a random mythical for them.

Naturally, people started abusing this, so eventually, it stopped.

I found the whole situation pretty funny, in a slightly sad way. So I made a little joke video recreating it. The video essentially shows Nelson reading an email, generating a random mythical, and responding, accompanied by somewhat melancholic Minecraft music.

You can watch it [here](https://youtu.be/qOYjgwPlG6k) if you feel like it.

To make the video, I added a button which would simply generate a random mythical:

<img src="../../assets/entries/unturned-skins-mod/example_mythical.png" width="30%" style="border-radius: 16px;" />

This is actually quite different from the crafting simulator. Normally, mythicals obtained from boxes come from opening those boxes, with their own animations, anticipation, and limited possible outcomes. My button didn't do any of that. It just generated a random mythical item that could normally come from a box. You pressed it, and there it was.

Unsurprisingly, this wasn't nearly as satisfying as the actual experience of opening boxes. But it served its purpose for the video. And afterwards, I just decided to keep the button.

I think it's a nice little reminder that not everything in a project needs some elaborate justification.

## Out Into the World

In March, I released the first version of [Unturned Skins Mod](https://github.com/Arty3/Unturned-Skins-Mod).

By that point, I'd been working on it for roughly two months here and there.

The crafting simulator worked, the skin generation menu existed, and most of the functionality described above was already implemented.

I hadn't released any early prototypes or screenshots, and there weren't any public testers involved in development. From the community's perspective, one day the project simply didn't exist, and the next day it did.

Of course, that didn't mean the initial release was perfect. Versions 1.0 and 1.1 had their fair share of bugs, and I released version 1.2 only two days later, fixing quite a few issues and improving the functionality.

I shared it in a dedicated skin trading Discord, where many of the traders I'd known over the years were still active.

Interestingly, by this point, most people didn't actually know who I was. I'd changed my online name since my trading days, and apart from a few prominent traders I remained friends with, nobody really associated me with my old trading account.

So, understandably, the few people who saw it and weren't my friends were suspicious.

Over the first few months, I received plenty of questions about whether the tool was safe to use, particularly whether people could get banned for running it.

I explained that the mod was designed entirely for single-player use, that generated items never reached Steam's servers, and that the launcher explicitly disabled BattlEye while the module was active.

Another common question was whether it would work in multiplayer.

Nah.

Fortunately, people gradually started trying the mod.

As people saw others using it successfully, the initial suspicion started fading, and word of mouth did most of the work.

My friend also started using the mod in a couple of his YouTube videos, and another friend introduced it to the Chinese trading community.

And the reception was genuinely positive.

One of my favourite memories is watching that same friend who helped inspire the idea spend hours experimenting with different skin and effect combinations.

He'd generate something interesting, share it with a small group of friends, and they'd all start discussing what looked good, what looked ridiculous, and what they wanted to try next.

It was exactly the sort of thing I'd hoped people would do, and probably one of the most enjoyable things you can experience as the creator of something.

And people could take those skins into the game itself, rather than being limited to the inventory inspection screen:

<img src="../../assets/entries/unturned-skins-mod/example_ingame.png" width="60%" style="border-radius: 16px;" />

I know some people spent hours doing little more than generating combinations and looking at them. And I thought that was wonderful. But something else happened, too.

Remember the original motivation behind the crafting simulator?

I wanted to see whether the excitement of crafting could survive without the money or actual rewards.

Surprisingly, the excitement of crafting didn't really survive without the money or actual rewards. Initially, people would spend a fair amount of time crafting. They'd generate one item, then another, then another, chasing the same rare combinations they would normally be spending money to obtain.

But eventually, the excitement would fade.

Without an actual reward, the experience became significantly less compelling. A rare result was no longer particularly special, because you hadn't risked anything to obtain it, and you couldn't actually own or trade it afterwards.

I actually know of people who stopped crafting altogether after spending time with the simulator. And genuinely, I liked seeing that.

I don't want to make any grand claims about gambling psychology based on a handful of anecdotes, but I found the observation genuinely interesting.

## Keeping It Alive

After the initial release, I continued making smaller updates.

Version 1.1 added assets from the Brazil map, version 1.2 fixed various issues, and later versions added support for new cosmetics introduced with Limestone and California II.

The last public update was in May 2026.

Most of the maintenance was exactly what I expected: adding new skin or effect definitions, fixing minor issues, and occasionally adjusting the code when something changed. In fact, updating those dictionaries was probably the one part of the project I consistently disliked, although it didn't require much effort overall.

As of writing this, in November 2026, the mod has actually been broken for a couple of months. This time, it appears to be related to changes in Unturned's assemblies, meaning some of the references and patches need to be updated. I do intend to fix that eventually, but I suspect it'll be the last update I make.

The trading community is considerably smaller now than it was during my time. Again, I don't have exact figures, but I'd estimate perhaps 100-500 active traders today, compared with the 2,000-3,000 I remember from the earlier years.

Most of the people I knew have moved on, and even when the mod was still working, it wasn't being used that much anymore.

That's fine by me, I think it has served its purpose.

And honestly, as I mentioned in my other Unturned entry, I think my chapter with Unturned has come to an end as well.

## Looking Back

There's something about this project that has stuck with me: the pragmatism.

If you look through the source code today, you'll quickly notice that the architecture isn't exactly a masterpiece.

There are Harmony patches scattered across the project, UI elements managed from different files, plenty of direct calls into game internals, and those lovely hardcoded dictionaries.

It wasn't some carefully planned, beautifully abstracted system. It was a collection of solutions to problems I encountered as I went along, and I'm perfectly happy with that. In fact, I was happy with it at the time, too.

I knew I was the sole developer, that I would probably be the only person who ever seriously maintained the code, and that the scope of the project was relatively limited.

I wasn't building some enormous software product that needed to support a team of developers for years. I was building a tool for a relatively small community, largely for fun.

Spending weeks designing a more elaborate architecture wouldn't necessarily have made the project any better for the people using it.

And the maintenance history largely supports that decision.

The code worked, it was relatively easy for me to understand, and the only recurring maintenance burden was updating the economy data when new cosmetics came out.

The eventual compatibility issues were caused by changes in the game itself, rather than the internal architecture collapsing under its own weight.

Now, I'm not saying that writing messy code is good engineering, but I do think a large part of an engineer's responsibility is knowing when to be pragmatic, when to invest in a better foundation, which tools and abstractions to use, and when to stop and reconsider an approach before it becomes expensive to change. Tradeoffs.

Tradeoffs and decisions like that have consequences, particularly when other people depend on your work. This is something I pay considerable attention to professionally nowadays.

In my current work, one of my responsibilities is maintaining existing projects while helping establish the foundations for new ones. A decision that seems convenient today can become months or years of technical debt if the surrounding circumstances aren't considered properly.

I've seen how easily that can happen when delivery takes priority over everything else. But I've also seen the opposite: spending far too much time engineering something that doesn't actually need to be complicated. I think knowing the difference is one of the more important skills an engineer can develop.

For this particular project, I still believe I made the right decisions.

There's another aspect I appreciate when looking back, too: I wrote the entire thing manually.

This was before I started using AI coding assistants, and long before the current wave of increasingly capable coding agents became part of my, and almost everyone else's, everyday workflow.

Nowadays, with Unturned's source code publicly available and modern coding agents able to navigate and modify large codebases, I suspect recreating something similar would be considerably easier.

And that's largely a good thing, but I do sometimes miss that slower process.

I think it's nice to occasionally slow down, struggle, and write code yourself, even when there are faster ways to get the same result. Not because doing everything manually is inherently better, or because productivity is a bad thing. Simply because the process can be enjoyable in its own right. And I think that's something worth remembering in a world where software development is becoming increasingly focused on how quickly we can produce the result.

There's a final little irony to all of this: I don't really care about skins anymore.

Not just in Unturned, but in games generally.

Even in something like Counter-Strike, where cosmetics have considerably more monetary value, I don't feel much of an attraction towards them. I suspect working on this project had something to do with that.

After spending so much time understanding how cosmetics were represented, generated, rendered, and manipulated, a lot of their original allure disappeared. Once you've spent hours producing arbitrary mythical combinations with a button, it's a little harder to be impressed by the idea of owning one.

Which, frankly, is probably a good thing. One less thing to spend money on.

Anyway, as always, thanks for reading!

You can find the repository here: [Unturned Skins Mod](https://github.com/Arty3/Unturned-Skins-Mod).
