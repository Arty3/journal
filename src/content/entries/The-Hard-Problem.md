---
title: The Hard Problem
description: Knowing less, more often
tags:
  - philosophy
  - paper
  - cows
draft: false
written: Aug 2026
project: March 2026
status: Concluded
---

## A Lovely Trip

In March 2026 I went on a week-long trip to Glasgow, Scotland. I went to see my dear friend and to take some time off work:

<div align="left">
  <img src="../../assets/entries/the-hard-problem/cows.jpg" width="30%" style="border-radius: 16px;" />
  <img src="../../assets/entries/the-hard-problem/castle.jpg" width="30%" style="border-radius: 16px;" />
</div>

Other than the majestic cows and the beautiful castles and lochs, the trip gave me quite a lot of insight into my own personal philosophy — mainly how messy and rationally flawed it was, and probably still is.

See, my friend is an artist and a creative person at her core. She loves to wonder and dream, and spending a week with her again influenced me to do the same.

One day she asked if she could interview me for her own project, so she brought me to an amazing vista with a singular bench looking out over part of the city.

Using my insane GeoGuessr skills, I was actually able to find it again:

<iframe src="https://www.google.com/maps/embed?pb=!4v1786376337350!6m8!1m7!1s6SfNyjIIkq6tS0ejnPmG2g!2m2!1d55.86754667298792!2d-4.268658701797349!3f284.4910865240263!4f2.6321009755701823!5f1.9499225504335294" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>

The place looks a little different now since Google Maps is outdated, but I thought it might be a nice touch to embed the street view here.

In any case, the interview was quite, well, "existential". Throughout the 30 minutes we spent sitting there and talking, I noticed I was being unusually conservative with what I said. We spoke about whether the world we live in might be a simulation, the flow of time, and various other unimaginably difficult concepts you might naturally decide to discuss with your friends and a beer.

The point is that I made a mistake: part of my argument relied on a paper I'd heard about, but never actually bothered to read.

That was why I was so insecure in what I was saying. I simply wasn't sure whether I actually understood the thing I was arguing from.

I don't believe the principles I spoke about were necessarily wrong, but I don't think my argument would have stood much of a chance against serious skepticism. Thankfully though, the interview was received well amongst the few people who listened to it.

Still, it bothered me.

## Do We Live in a Simulation?

[This](https://arxiv.org/pdf/2507.22950) paper doesn't think so.

The paper went somewhat viral around late 2025 for effectively claiming that we don't live in a simulation, with the media often taking that even further and presenting it as a mathematical "proof".

To be fair to the authors, the simulation conclusion is actually in the paper, so this isn't something the media simply invented. The issue is more that a fairly controversial chain of reasoning was compressed into the much stronger statement that "scientists mathematically proved we don't live in a simulation".

A well put together reel / short / article / video, showing a bunch of fancy space visuals, name dropping a university here and a study there, is apparently more than enough to pass a claim as fact to the general audience, e.g.:

<img src="../../assets/entries/the-hard-problem/media.png" width="50%" style="border-radius: 16px;" />

I made exactly that mistake by taking it for granted.

The thing is that I was already beginning to realize my mistake as I spoke further and further with my friend during that interview. I was trying to reconstruct the concept and thesis in real time, but it frankly just didn't hold up once I pushed it into the broader argument I thought I understood.

> [!IMPORTANT]
> Before I continue, I want to explicitly state that I am no philosopher, no academic, or expert on any of these topics, so please take what I say with a grain of salt, or two.

The paper does contain an interesting synthesis, but I think its strongest advertised conclusions substantially outrun what its premises establish.

The narrow result is basically this: if you model a sufficiently expressive Theory of Everything as a consistent, effectively axiomatized formal system capable of arithmetic, then Gödel-style incompleteness applies. Such a theory will contain statements that it cannot prove from within itself.

The important distinction, however, is that this establishes a limit on formal derivation, not necessarily on computation or simulation. A Turing-computable system can evolve entirely according to an algorithm while still giving rise to propositions about its behavior that no algorithm can decide in general.

In other words, the existence of undecidable truths *about* a system does not imply that the system itself is non-computable. A Turing machine may still be perfectly capable of simulating its evolution without being capable of answering every possible question about that evolution.

This is essentially the distinction between **provability and execution**.

For the simulation conclusion to really follow, you would need something stronger: the actual evolution of the universe itself would have to require some non-computable operation. Gödel incompleteness alone does not establish that.

So I don't think the paper is meaningless by any means. There is something genuinely interesting in asking how formal incompleteness constrains what an ultimate Theory of Everything could even look like. I just don't think the strongest conclusion holds up nearly as well as the presentation surrounding it suggests.

Once I was back from the trip, I found myself on a nice bike ride by the water, still thinking about this exact problem. I couldn't really drive my mind away from applying the same general structure elsewhere.

## The Limit to Explaining Consciousness

After a lot of thinking and trying to wrap my small brain around all of these concepts, I came to this idea:

> *If we separate consciousness — as the raw subjective experience of being aware — from rational and emotional thinking, can we apply the same idea to define a limit beyond which we cannot crack the hard problem of consciousness?*

In other words, say our consciousness were almost some kind of awareness kernel within who we are. We could separate the rest of our thinking into its own domain and then, if our thinking and explanatory tools were entirely algorithmic, perhaps apply a similar limitation to trying to understand and define consciousness itself.

Now, taking a step back, there are many problems with that statement, and I was well aware of that. The "awareness kernel" idea is also a very crude way of thinking about consciousness.

Once I started reading into the subject, I found the already established distinction between **phenomenal consciousness** and **access consciousness**, largely associated with Ned Block.

Phenomenal consciousness is essentially the subjective aspect of experience: the "what it is like" to experience something. Access consciousness is more concerned with information being available for reasoning, reporting, decision-making, and controlling behavior.

That distinction was much closer to what I had actually been trying to describe. The thing I cared about wasn't intelligence, memory, rational thinking, or even whether somebody could report seeing something. It was the question left behind after you explain all of that:

Why does any of it feel like anything?

That gave me a much more concrete target.

I was so excited by this that I decided to commit to pursuing it further: formalize the work, scrutinize it, and write something I actually believed in.

The reason for my excitement was primarily genuine curiosity; I thought there might actually be real substance to the argument, and I wanted to see how far it could survive being pushed. At the same time, there was something more personal underneath it. I could not quite stand the thought that what I had been saying in that interview might amount to little more than ungrounded, make-believe speculation, and I wanted to know whether I actually believed any of it for good reason.


## Writing The Paper

Here is the paper in its final form:

<object class="pdf-embed" data="/assets/entries/the-hard-problem/paper.pdf" type="application/pdf" aria-label="Final Paper (PDF)"><p>Your browser can't display PDFs inline — <a href="/assets/entries/the-hard-problem/paper.pdf">download the paper</a> instead.</p></object>

I come from a background where I've never gone to University, or a formally recognized institution, so this was my first time writing a paper end-to-end. I had attempted something similar before, for instance when I worked on [lgmalloc](https://journal.lucagoddijn.com/entries/lgmalloc/), but I had never actually concluded one.

I should mention that this paper is also not fully finished in any academic sense, since it never underwent review from an expert, nor has it ever been published — and that's probably a good thing given what I wrote.

So I simply started by developing my ideas, first in a regular markdown document like this one, and later in a more formal LaTeX paper. The central framework eventually became:

Let $\A$ denote algorithmic theories, $\E$ denote admissible explanations, and $C$ denote phenomenal consciousness as defined above.

```math id="092u2a"
\begin{align*}
A1 &: \E \subseteq \A \\
A2' &: \neg \exists T \in \A \; \text{such that} \; \CaptureStr(T,C) \\
A3 &: \text{A theory completely explains } C \text{ only if } \CaptureStr(T,C)
\end{align*}
```

Already some problems here, so let's break this down.

First, the paper is covered in logical math like this, and a lot of it is mostly cosmetic. The thing is that I naturally reason in this kind of structure; math gives me a way to transcribe it formally. Since philosophy is largely built around constructing and attacking logical arguments, I figured this was a good way to write everything down.

In reality, there is no need for most of it.

Writing an implication in mathematical notation does not make the assumptions behind that implication any better justified. In quite a few places I am effectively translating English into symbols and then translating the symbols back into English again.

The second, much more important problem is that the assumptions themselves require an unfathomable amount of work to support. That is where most of the actual substance of the paper sits.

Now, I knew this, and this framework was only my starting point. All three assumptions are fragile, but A2' is especially important because most of the substantive work behind the theorem depends on it.

Before doing any of that though, I first had to define consciousness and, more importantly, what exactly I was trying to explain. As I mentioned earlier, I adopted the distinction between phenomenal and access consciousness and restricted the paper specifically to phenomenal consciousness.

The other important thing I needed to define was what it actually means to "capture" consciousness. I ended up defining three levels: **weak capture**, **structural capture**, and **strong capture**.

Weak capture is essentially the ability to reliably correlate with or predict conscious states. Structural capture goes further by modelling important structures or relationships within consciousness. Strong capture is where things become much more demanding:

A theory strongly captures consciousness if it achieves explanatory closure and its scope includes the relevant truths about consciousness, where the theory must explain **why phenomenal consciousness exists at all**, rather than merely correlating with or modelling its structure.

This is the level required for what I call complete explanation.

From there I broke strong capture into three conditions that would all need to hold simultaneously: **representability**, meaning the relevant truths about phenomenal consciousness must admit formal representation; **algorithmic realizability**, meaning the explanatory relationships connecting phenomenal and physical or functional descriptions must be algorithmically derivable; and **explanatory closure**, meaning the theory must actually explain why phenomenal consciousness exists rather than merely redescribing its structure.

If any one of these fails, complete strong algorithmic capture fails with it.

This is probably the most important part of the framework.

A2' is then essentially the claim that no existing algorithmic theory has currently achieved complete strong capture of phenomenal consciousness. A2 is something much stronger:

> Complete strong algorithmic capture of phenomenal consciousness is impossible in principle.

These aren't the same thing.

If A2 is true, then A2' obviously follows. If something is impossible in principle, unsurprisingly nobody will currently have achieved it.

The difficult part is trying to go the other way.

The work pushing from A2' toward A2 is essentially the "parsimonious" interpretation of the field at the time. I look at the three conditions needed for strong capture, the different lines along which each currently fails, and argue that one principled limitation might explain their persistent failure better than treating each as an independent gap that merely happens to remain unresolved.

Importantly, the paper does not claim that this proves A2. The conclusion is explicitly inductive and defeasible.

Still, as we'll get to, this is one of the biggest problems with the whole paper.

Along the way, the scope also grew dramatically. I started looking at Global Workspace Theory, Integrated Information Theory, Recurrent Processing Theory, higher-order theories, whether human cognition itself is algorithmic, Gödel and Lucas–Penrose, the Church–Turing thesis, artificial consciousness, the distinction between simulation and instantiation, type-A and type-B physicalism, illusionism, mathematical consciousness science, and more.

You can probably see where this is going.

## The Problem

As I developed the paper further, I constantly found myself working backward from a larger concept into a smaller, more definable scope.

That is the problem: the paper is simply doing too much.

It defines a framework and a theorem, defends them, applies the framework to existing theories, engages with other literature, interprets the state of an entire field, discusses artificial consciousness, and then keeps branching outward from there. The thesis arguably needs one paper to define the framework properly, another to support it, another to engage seriously with the surrounding literature, and so on.

Trying to do all of this in one relatively short paper means that none of those things can really be treated with the depth they deserve.

The second problem, after scope, is that the paper makes a very ambitious inductive jump from current explanatory failure to possible principled impossibility. I explicitly distinguish A2' — no current algorithmic theory achieves strong capture — from A2 — the stronger claim that complete algorithmic capture is impossible in principle.

I do acknowledge that this is defeasible and resembles a pessimistic meta-induction, which I think is fine, but the parsimony argument is still much weaker than the surrounding formal presentation makes it feel. Three persistent problems do not necessarily become evidence for one underlying impossibility merely because that explanation is simpler.

There is another issue here as well. The paper treats representability, algorithmic realizability, and explanatory closure as largely independent lines of failure, and that independence matters to the parsimony argument.

I'm no longer convinced they are independent enough for that.

If phenomenal consciousness is difficult to formally represent because of its first-person or perspectival nature, that may also be closely related to why third-person physical descriptions fail to achieve explanatory closure. Likewise, if something cannot be formally represented, that obviously constrains whether it can be manipulated algorithmically.

They are still conceptually distinct, but describing them as three genuinely independent failures is doing quite a lot of work.

Beyond that, "strong capture" partly builds the hard problem into the success criterion. I define complete explanation as requiring explanatory closure, specifically explaining why phenomenal experience accompanies the physical structure.

Once that criterion is adopted, the various theories I engage with almost inevitably fail because they generally weren't constructed to solve the problem in exactly that Chalmers/Levine sense. So part of the result risks becoming:

> *If complete explanation requires solving the explanatory gap, theories that don't solve the explanatory gap aren't complete explanations.*

This is true, but much less informative than the formal presentation makes it appear.

A defender of one of those theories could simply argue that the requirement itself is wrong, or that I've imposed a definition of explanation they don't accept.

The theorem itself is also doing very little work. This was my starting point, and I knew from the start that the theorem was weak and didn't do much. I've deliberately kept the paper candid about this issue: once A1, A2', and A3 are assumed, the conclusion follows almost immediately.

The interesting work lies entirely in whether those premises are justified. That makes the theorem look more substantial than it really is, and ties directly into my criticism of the cosmetic mathematics: the formal notation often restates philosophical claims rather than deriving surprising consequences from them.

A1 is a particularly large assumption. Extending a limitation on algorithmic theories into a limitation on admissible explanation itself requires the claim that admissible explanations are algorithmic.

I admit this myself in the paper: the algorithmic status of cognition and explanation is underdetermined. So the most dramatic form of the conclusion depends on one of the least secure premises.

Another thing I'm less convinced by now is how much evidential weight I place on the state of consciousness science itself. The paper points toward hundreds of theories, continued fragmentation, and major competing theories failing to converge despite empirical progress. I use this as evidence that weak and structural capture continue progressing while explanatory closure remains stuck.

That is interesting, but there are obviously many other explanations. The field could simply be young. We might lack the right conceptual tools. The experiments might not yet be good enough to distinguish competing theories properly. The problem might simply be extraordinarily difficult — hence the name: **The Hard Problem**.

A fragmented field does not necessarily imply a structural barrier.

Now, there are many more critiques I have, but they are smaller, and frankly barely worth mentioning considering the larger gaping holes.

## How I View The Paper Now

As of writing this, I'm actually somewhat proud of what I was able to accomplish.

I had never really bothered formalizing any of my thoughts, nor had I ever attacked my own work to this degree. I'm proud because I realized my mistake and pursued the thread until I could conclude that I had been mistaken in my day-to-day methodology, assumptions, and more.

I learned how to develop thoughts into ideas, ideas into work, and work into something I could formally present.

I think this is valuable.

I also don't think every idea in the paper is necessarily bad. I still like the distinction between weak, structural, and strong capture. I think separating prediction, simulation, structural reproduction, and actual instantiation is useful as well.

Where I think I went wrong was in taking those distinctions and trying to build something dramatically larger on top of them without nearly enough support.

The scope is simply too large to cover meaningfully within what I can do in a weekend.

This was also the first paper I ever finished writing entirely, albeit of course without review.

And as a souvenir, here is my first draft:

<object class="pdf-embed" data="/assets/entries/the-hard-problem/first_draft.pdf" type="application/pdf" aria-label="First Draft (PDF)"><p>Your browser can't display PDFs inline — <a href="/assets/entries/the-hard-problem/first_draft.pdf">download the paper</a> instead.</p></object>

Yes, this is really messy, covers even more rough ideas, defines many useless things, and even uses the wrong format.

But still, I have a soft spot for it in my heart. This was a busy day of thought for me, crammed into one paper.

Perhaps the most important lesson I learned, which has now become something of a habit, is not to take anything at face value. Give yourself the time to dig into what you present as fact, and even what you present as belief. Validate your thoughts, attack them, and remain humble in this ever-vast and confusing world.

The entire thing started because I had spoken confidently about a paper I hadn't actually read. I then went and read it, found problems with the argument I thought I understood, applied the underlying idea somewhere completely different, and eventually found myself attacking my own version of the same kind of reasoning.

I think that's quite funny.

In fact, my own personal beliefs have shifted away from concrete ideas and increasingly toward:

> "I don't know."

I like this, it keeps the door open to an infinite number of possibilities, which I find much more exciting than a fixed idea of what is and isn't.

But that's just my current personal take. You may not agree with it, nor may I a year from now.

I might one day revisit the ideas this paper builds on, but in a very different shape, context, or direction. I don't think they are necessarily bad or wrong; they simply need much, much more work before I would consider them concrete.

But as always, no guarantees.

Anyway, thank you for reading through!
