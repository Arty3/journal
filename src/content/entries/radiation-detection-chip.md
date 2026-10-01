---
title: Radiation Detection Chip
description: CERN-obyl — a crappy radiation pun :)
tags:
  - hardware
  - asic
  - rtl
  - physics
  - radiation
draft: false
written: september 2026
project: october 2026 - present
status: ongoing
---

> [!IMPORTANT]
> Hey! If you want to skip the papyrus of backstory and get straight into the nitty gritty, click [here](#the-success-criteria). However, please note that the project is still ongoing, so there is no ending yet.

## A Peculiar Job Posting

At the end of the [lg-npu](https://journal.lucagoddijn.com/entries/lg-npu/) entry, I left this story at a job posting.

I had joined the Tiny Tapeout Discord because I was trying to get a tiny descendant of my NPU manufactured and needed somewhere to ask questions when the ASIC tooling inevitably did something I did not understand. One of the channels happened to be for job postings.

Sometime near the end of May, somebody posted a position there for a **Digital ASIC Design Engineer at CERN**:

<img src="../../assets/entries/radiation-detection-chip/discord-post.png" width="60%" style="border-radius: 16px;" />

I read it and instantly thought that this was fake. I mean, CERN is one of the most selective and bureaucratic institutions on Earth, a job posting on a random Discord server is far out of character for them.

Still, I checked, and to my disbelief, it was real!

I remember when I first came across the post: I had just come off a conversation with a student doing their Master's in the physics of ASIC engineering. And on the very next day, I was on my roof, spending the afternoon diving into the rabbit hole of ASIC engineering and the physics revolving around it.

The role involved digital ASIC design, FPGA work, open-source EDA, radiation hardening, and electronics for detector readout. The exact kind of stuff I was just dipping my toes into.

Naturally, the person they were looking for was specifically a recent master's graduate with the corresponding background in electronics and hardware.

I on the other hand, had been writing RTL for a few months.

I did not have a master's degree. I did not even have the bachelor's degree which normally comes before it. My education was Codam, a software school, and virtually all of my professional experience was within the bounds of software.

On paper this was not a subtle mismatch, and beyond that, it was also CERN.

That made it very easy to look at the post as something curious rather than something relevant to me. CERN belonged in roughly the same mental category as various semiconductor companies and research labs I would occasionally read about: places full of people doing extremely specialised technical work, usually in fields where I could not yet follow half the terminology.

The annoying part was that the actual work sounded fascinating.

By this point hardware had already stopped feeling like a temporary side project. lg-npu had started because I wanted to test whether I could move into a completely new technical domain, but somewhere during the process I had begun seriously wondering whether I wanted to stay there. ASIC design combined a lot of things I already loved about low-level software with an entire set of constraints I had never had access to before: timing, physical implementation, electrical behaviour, radiation hardening, and eventually the fact that the thing you design has to become an actual tangible object.

The CERN role was very close to the direction I had suddenly found myself looking, though, with a much cooler aura.

It was just several years of conventional education away from where I actually stood.

There was no version of this where I thought I was a reasonable candidate. This was a complete hail mary. I had a few months of hardware experience, virtually no electronics background, no conventional degree, and I was looking at a position intended for someone who had just finished a master's in the field. If I had been estimating my chances rationally, I would have put them somewhere very close to zero.

But, I had an itch. So I decided to call my dad.

I asked him whether there was any point applying to jobs where the education requirement was that far beyond me. His answer was basically no.

That was not unreasonable advice. If a role asks for a master's graduate and you are missing the degree entirely, there is an obvious interpretation of that requirement. There are also presumably plenty of applicants who do satisfy it.

Still, I did not quite want to leave it there.

Applying directly would have been ridiculous, but the person who had posted the role was an ASIC engineer working at CERN. Even if the answer to the job itself was an immediate no, advice from somebody in that position would be far from useless. I had only recently started trying to understand what a path into hardware could actually look like for someone coming from software without a conventional electrical-engineering background.

So instead of applying, I wrote him an email.

## The Email

The goal was to be completely explicit about the situation. I did not want to dress a few months of hardware work up as years of experience, and I did not want the email to read like an application disguised as a request for advice. I honestly just wanted to get some feedback.

I explained that my background was mostly software and AI, that I had only recently started working seriously on digital hardware, that I was building lg-npu, and that I had a Tiny Tapeout design going toward fabrication. I was also completely explicit about my education and the fact that I did not have the conventional academic background for the field.

That detail matters in retrospect. There was never a point where he could have mistaken me for an electrical-engineering graduate with several years of hardware experience. The weird background was part of the conversation from the very first email:

<img src="../../assets/entries/radiation-detection-chip/first-email.png" width="60%" style="border-radius: 16px;" />

What I wanted to know was what somebody like me would realistically need to do to become credible for work like that. If the answer was "go get the degree," that would at least be useful information from somebody actually inside the field. If projects mattered, I wanted to know which kinds. If software experience transferred, I wanted to know how much.

Writing the email was easy enough. Sending it was not.

I sat there staring at the send button for something like half an hour.

This was a little strange because I was not even asking for a job. The worst realistic outcome was probably no reply.

But up to that point almost all judgment of my hardware work had happened inside a very safe loop. I could show friends what I was building, and they would be happy for me, but most of them were not hardware engineers. I could put the NPU through tests and synthesis tools, but I had chosen the tests and interpreted the results. I could decide that building a fairly large accelerator after a few months was good progress.

This was different.

I was about to send the work to someone who did this professionally, at a place I respected enormously, and ask for an opinion I could not control.

After a healthy amount of overthinking and reading it over and over, I eventually sent it.

Honestly, I expected that to be approximately the end of the story, but instead, the very next morning, I got a reply.

It was thoughtful and much more detailed than I expected. He explained some of what the field normally looked for and how he saw my background. Then, near the end, he told me I should be bolder and send him a CV. He made no promises, and he was clear that the posting asked for a recent master's graduate, but he thought a bachelor's or equivalent might be acceptable and offered to check with his supervisor and HR.

I was at work when I read it. I remember the silence of everyone focusing in the office, and how much I wanted to break it.

I felt a rush of adrenaline as well as a few other unnameable emotions.

I called my parents, I texted friends, I reread that paragraph repeatedly because the situation had moved from "CERN engineer gives me some career advice" to something with a very small but definitely non-zero chance attached to it.

That did not suddenly make me qualified for the role. He had not offered me anything. There was not even a formal application process.

But he had seen the background I was certain would disqualify me and had asked to see more anyway.

That meant a lot to me.

## The First CV

So, as soon as I got home, I got busy.

I spent about six hours making the CV. Yeah.

Two pages should not take six hours, but this did.

I went through the ordering, every bullet point, which projects deserved space, how to explain hardware work without pretending I had more experience than I did, how much of my software background was useful, whether the page visually looked balanced, and whether every sentence actually demonstrated something rather than just naming a technology.

I was proud of it, but the result still looked like the CV of the person I had been a few months earlier.

At the top I was an **AI Systems Engineer**.

My professional software and AI work came first because that was where the overwhelming majority of my real experience was. Hardware appeared as a recent expansion: lg-npu, Tiny Tapeout and the work I had started doing around ASIC flows.

One of the lg-npu bullets even contained my glorious roughly 800,000-cell synthesis number, which I still thought was evidence that the design was large rather than evidence that I had accidentally synthesised memory into a small city.

That would get corrected later.

Here is that CV:

<div align="left">
 <img src="../../assets/entries/radiation-detection-chip/cv1-1.png" width="45%" style="border-radius: 16px;" />
 <img src="../../assets/entries/radiation-detection-chip/cv1-2.png" width="45%" style="border-radius: 16px;" />
</div>

> [!NOTE]
> Sorry for the heavy redactions, I know this is starting to look like *certain* collection of files.

After another healthy 30 minutes of overthinking, I sent the CV.

Then GitHub decided I looked like a spammer.

I had recently reactivated LinkedIn, cleaned up parts of my GitHub profile and made several changes in preparation for putting my work in front of people. Apparently I triggered something automated, because the account became restricted at almost exactly the moment I had sent a CERN engineer a CV containing links to my repositories.

The timing was incredible. Talk about signs from the universe.

I mirrored the important projects to GitLab, contacted GitHub support and sent another email explaining that the links I had just provided might temporarily not work.

Thankfully, he replied something like two minutes later to tell me it was fine.

Talk about speed.

After a very long sigh of relief, I went on with my day.

After that there was not much I could do. So as usual, I found something else to build.

## A Tiebreaker

Around this period I made a small hybrid noise-cancelling hardware project.

I had been interested in audio for years, so the DSP problem was genuinely interesting to me, but there was also a much more strategic thought running in parallel.

If this ever became a real application and somebody looked at two unusual candidates who were otherwise difficult to separate, perhaps one more relevant hardware project would help.

In my head, it was somewhat of a tiebreaker.

I built most of it in roughly a day. It combined feed-forward and feedback ideas around active noise cancellation and gave me another excuse to work through fixed-point DSP and RTL.

I do not think it is one of my major projects. lg-npu and the Tiny Tapeout design are much more substantial and interesting. But this entire period had changed the way I was treating hardware. A few months earlier I had been making circuits because I was curious. Now there was a possible professional direction attached to that curiosity, however unlikely.

Then there was silence.

The last contact had been around the end of May. Days became weeks, and by the middle of June I was starting to assume that the opportunity had probably reached its natural conclusion.

That would still have been fine.

I had cold-emailed an engineer at CERN asking for advice and instead been asked for a CV. That alone was already a far better result than I had expected while staring at the send button.

Eventually I sent a short follow-up.

Then there was more silence.

Normally the replies had come fairly quickly, so after a few days I started doing the usual thing where you pretend you are not waiting for something while being extremely aware that you are waiting for it.

If another week passed, I figured I could probably derive the answer myself.

## The First Checkpoint

I was on my roof again. I had taken most of the day for myself, reading about hardware when the notification appeared.

I remember the immediate stomach-drop feeling before I had even opened it, with my face probably looking like that of a shocked owl.

The message explained that things had been busy and the process was moving slowly. There was not yet a precise timeline.

Then it said that I had passed the initial screening, and that the procedure was now starting formally.

This was much bigger for me than the original request for a CV.

Until then, I could interpret the whole thing as one engineer being unusually generous with his time. Passing an initial screening meant the background had actually been considered in relation to the work and had survived at least one real filter.

I was — and am as of writing this — twenty-one, I had only been doing hardware for a few months and did not have anywhere near the degree the eventual role was expected to require.

Somehow I was still there; I remember feeling like I was beating the odds in some kind of dream and waiting for something to drag me back to reality.

The message suggested there would still be three to four weeks before the formal process and interviews, which gave me time to prepare.

I intended to use all of it.

## The Thing I Was Afraid Of

I had a fairly clear idea of what could go wrong in an interview.

Nobody reading my CV was going to mistake me for someone with years of ASIC experience. I had been explicit about when I started. The interesting question was whether the projects represented actual understanding or whether I had simply learned enough tools and patterns to make complicated things move.

That distinction bothered me because I knew there was a weakness in the way I had learned the first version of lg-npu.

I could explain the architecture: how a command moved through the machine, why the memories were separated, how convolution was sequenced, how the software interacted with the device, and why I had made most of the high-level design decisions.

I was considerably less happy when I kept asking *why* underneath the primitives.

I knew a flip-flop stores a bit.

Why?

I knew incomplete combinational assignments could infer a latch.

Why does retaining the old value imply storage physically?

I knew setup and hold times mattered.

What exactly stops working when they are violated?

I knew clock-domain crossings were dangerous.

What is metastability actually doing inside the circuit?

There were answers in my head, but they ended in "because that is the rule". And unfortunately, that was enough to build lg-npu, but certainly not enough for the interview I imagined.

If somebody substantially better than me was going to tear into the design, I wanted them to reach a point where I genuinely did not know something, not a point where I discovered that the first layer underneath one of my confident explanations was empty.

So I started again.

## Going Back to the Bottom

The curious thing is that my thought process always reasons from first principles and primitives. Therefore I find it especially important to understand these fully. I actually regret not addressing this issue earlier.

I'm actually pretty confident in my ability to reason through a majority of problems as long as I have the fundamental building blocks to do so.

With domains in which I'm more familiar, my approach is certainly more disciplined, but I suppose hardware was so new to me that with all of the exploration opportunities pulling me in different directions, I never slowed down to consolidate those primitives.

This is certainly a lesson learned for me.

In any case, for the next few weeks I spent a lot of my free time rebuilding the fundamentals underneath what I had already built.

Usually that meant three or four hours after work. I deliberately took a break every couple of days rather than doing what I normally do when I become obsessed with something and turning sleep, hobbies, and the rest of my life into acceptable losses.

This time I wanted discipline rather than intensity.

I went back through combinational logic, latches, flip-flops, timing, setup and hold, clock skew, clock-domain crossing, metastability, memory, ASIC implementation and enough basic electronics that the digital abstractions had something physical underneath them.

Some of the topics were embarrassingly introductory compared with the scale of the RTL I had already written.

That was fine. I think that was much more important than mastering some new fancy mechanism.

Honestly, if you looked at me as I was studying, I probably looked like a crazy person. I would attack principles for quite a while.

By attack I mean specifically question. I would question every doubt, every "why can't it be this", every paradigm.

This is certainly part of my method, I've learned to do this thoroughly in past projects, and I find this strategy to be powerful. By attacking principles, abstractions, paradigms, and conventions, you grow an understanding of the years of engineering preceeding you. I think that is valuable.

The latch became my favourite example of my insanity.

Consider:

```system-verilog
always_comb begin
	if (whatever)
		out = 1'b1;
end
```

The problem is easy to describe in RTL terms: `out` is not assigned on every path, so the design requires it to retain its previous value when `whatever` is false. That implies storage, and the synthesiser may infer a latch.

I already knew that rule. Nothing complex about it.

What bothered me was the word **retain**.

In software, "do nothing" can naturally mean that a variable still contains whatever was already there. The storage mechanism exists underneath the language and I barely need to think about it.

In combinational hardware, saying "leave the output alone" does not explain anything. If nothing drives a new value, what physically preserves the old one? A wire is not a magical memory cell. There has to be some actual mechanism maintaining state, generally through feedback in the storage element.

This wasn't necessarily obvious to me. Honestly I understood this, but there was an everlasting something bugging me. It took me a lot of back and forth through obvious textbook explanations to realize I was contradicting a deeply rooted software intuition.

I effectively spent the last seven years or so training my brain to assume that everything implicitly has memory. But that is only true for software, there is hardware that has to give you memory.

Now, logically, a flop will just drive that memory, the sequential property of a flop is what gives us basic memory, and that is a symptom of the mechanism, not the principle.

That aside, it might seem quite intuitive to say then that while a flop is driving Q (the output), then all the wiring logic after it will just hold, but then what is the latch for? that is exactly the type of insane question that kept resurfacing in my mind.

Eventually I came to the conclusion that I had just built a mental model that worked especially well with software, but was fundamentally assuming incorrect things in hardware.

That is the very thing I needed to destroy and rebuild.

Once the mechanism clicked, I could not lose it in the same way I could lose a memorised rule. `latch inferred` stopped meaning "the linter is angry because I forgot an `else`" and started referring to an actual storage requirement I had accidentally described.

Timing went through a similar transition. Signals do not teleport through combinational logic. They propagate through gates and wires, like water through a garden hose, and the destination register needs the result to arrive early enough relative to the next clock edge. Suddenly clock frequency was not a number I put in a configuration file; it was a claim about how quickly the physical implementation could move information between state elements.

Clock-domain crossing got stranger again because the digital model itself begins to leak. If one clock samples a changing signal from another domain at just the wrong moment, a flip-flop can enter a metastable analogue state before eventually resolving. The nice world of zeros and ones temporarily stops being sufficient to describe what is happening.

This was the level I wanted to reach before the interview.

Not because I expected somebody to ask me to derive a flip-flop transistor by transistor on a whiteboard, but because stronger primitives made unfamiliar questions much more straightforward.

This is maybe the part of learning something new which I value most.

## Studying on Holiday

Partway through this, I went to Italy for about a week.

My mum has a house by the beach. Under more normal circumstances that sentence would imply that I spent a reasonable amount of time at the beach.

Not as much as I could have.

I studied during the transfers. I studied on the plane. Most days after arriving, I spent another few hours every other day studying.

The routine continued almost exactly as it had in Amsterdam.

I do not remember this feeling particularly unhealthy at the time. If anything, it was one of the more controlled periods of intense learning I have had. I was taking breaks deliberately, sleeping more sensibly than I often do when a project catches, and working through subjects in a much more structured way than my normal "find question, disappear into hole" method.

There was also a very concrete reason for it.

Somewhere in the near future, I expected to sit down with people who could actually evaluate the work.

That made studying feel very different from preparing for an exam where I wanted to reproduce enough material to get a mark. Every concept had an adversarial quality to it: if I claimed to understand timing, somebody might ask a question which made it immediately obvious whether I did.

## Radiation

Eventually my preparation wandered into a subject which made the entire situation feel slightly absurd when I looked at it from far enough away: radiation.

The role was focused on detecting radiation for CERN's new safety system, so this was very relevant. I started reading about single-event effects, transient disturbances and single-event upsets, where an energetic particle can deposit charge in a device and disturb stored state.

I will dive deeper into this later, but generally these can lead into redundancy, hardened storage, error detection and all of the other techniques needed when "the bit may randomly change because a particle hit the circuit" is part of the actual threat model.

I found this unbelievably cool.

At some point I remember becoming aware of the situation as a whole.

A few months earlier I had been biking to the supermarket, and because I was bored, I thought learning hardware might be interesting.

Now I was sitting there studying radiation effects in semiconductor circuits because there was a chance I might be interviewed to work on ASICs at CERN.

What happened?

## The NPU Was Wrong

The most useful part of the preparation was eventually going back through my own projects.

If somebody wanted to challenge the CV, lg-npu was the obvious place to start. It was the largest hardware design I had, and I had made plenty of architectural and performance claims about it.

I knew there were going to be issues, but frankly not as many as I ended up encountering.

I went through the datapaths slowly and tried to explain each important piece from first principles.

That is when I found the accumulator problem I described in the lg-npu entry.

I had claimed that the convolution PE could sustain one dependent MAC per cycle. Once I actually traced the feedback path register by register, I realised the accumulated value passed through two clock boundaries before returning to the PE.

The arithmetic was correct, but the throughput claim was not. It was one MAC every two cycles.

My entire regression suite had missed it because the tests were checking numerical correctness rather than the performance property I had assumed.

The mistake itself was not what affected me most.

What affected me was that **I found it**.

A few months earlier I had written that circuit and thought it was fine. Now I knew enough to attack myself.

That was probably the point where I stopped being afraid of the technical interview.

Not because I suddenly thought nobody could find something I did not know. They obviously could. I expected them to, and by then I actively wanted them to.

I wanted somebody substantially better than me to attack the design. Pick an architectural decision and ask why. Find something stupid and make me explain what I had been thinking. Keep digging underneath an answer until either the reasoning held up or it didn't. If something was wrong, I did not want to bluff my way through defending it; I wanted to be able to recognise why it was wrong and update the model underneath it.

What changed was that I trusted my judgement much more. I did not need to be absolutely correct. I needed to be able to reason honestly from what I understood, recognise where that reasoning failed, and learn from whatever was on the other side.

Honestly, by then I wanted the interview probably more than I wanted the job itself. The job would have been life-changing, obviously, but the interview was the test I had spent weeks preparing for.

Strangely, I wanted the confrontation.

## Waiting Again

Then July arrived.

I felt ready, but I was only met by silence.

The process was still moving slowly, and for a while there was not much to do beyond continue preparing and wait for the formal position to open.

On July 22nd I finally got another message. The job was going live formally, and I was asked to register through CERN's application system.

I decided to rebuild the CV again, I figured it was worth doing so given the tie breaker project, and a second look is always good.

The difference between the two versions is one of my favourite records of what had happened over the previous months.

The original one said:

**AI Systems Engineer**

Hardware was something new underneath that.

The revised one said:

**Digital ASIC Design & AI Engineer**

The project section moved above most of the software experience. lg-npu was described in terms of RTL, verification, synthesis and physical implementation. Tiny Tapeout was there as an actual submitted ASIC design. The professional AI work was still important, but it was no longer the only identity the document was organised around.

Some of that was obviously tailoring. If I am applying for an ASIC role, it would be idiotic to lead with irrelevant software purely to prove some philosophical point about identity.

But the change was not *only* tailoring.

There were more concrete differences too. The glorious 800,000-cell lg-npu had disappeared. By then I had worked out that I had accidentally allowed the SRAMs to expand into ordinary logic, fixed the physical memory implementation, and brought the design down to roughly 33,928 standard cells alongside the actual SRAM macros.

The first CV had presented the huge number as an achievement. The second one quietly removed it because I now understood why it had been nonsense.

I spent another couple of hours on the CV and a couple more going through the formal application.

There was one problem.

The education section did not have a clean way to describe Codam as the bachelor-equivalent education I had completed. The options were based around formal diplomas, and the choice which matched the literal documentation I possessed was essentially:

**I don't have any diploma.**

I selected it and used the free-text areas to explain the situation.

Then I submitted the application.

A few months earlier I had not known RTL existed. Now I had formally applied to design ASICs at CERN.

Anyway, here is that second CV:

<div align="left">
 <img src="../../assets/entries/radiation-detection-chip/cv2-1.png" width="45%" style="border-radius: 16px;" />
 <img src="../../assets/entries/radiation-detection-chip/cv2-2.png" width="45%" style="border-radius: 16px;" />
</div>

## Not Eligible

The rejection arrived very quickly.

I recall going into bed that evening, having just submitted the application. I opened my phone to see an email notification, and while I assumed it was a confirmation email, it was instead a rejection email.

Looking at it, it described me as not eligible for the position.

I emailed the engineer I had been speaking with because the timing and wording made me wonder whether the application had simply hit an automatic eligibility filter.

He soon wrote back to say that it was curious, and that he would check with his team and get back to me as soon as possible.

So I waited. Given his wording, I didn't assume it was over; instead I waited to see what the response was.

Soon after, that response arrived.

The explanation was that the team and HR read the degree requirement differently. The team would have considered my education equivalent to the required standard. HR applied its eligibility rules strictly, and under those rules I did not qualify. The degree requirement was final, so the team could not proceed.

Then the email said this:

<img src="../../assets/entries/radiation-detection-chip/final-email.png" width="70%" style="border-radius: 16px;" />

This may just be one of the most meaningful emails I've ever received. So much so that I got it framed!

But the part I keep coming back to is what it said about everything *other* than the degree.

The team had evaluated the application extremely positively. Despite the few months of hardware experience, the software background, and the missing conventional education, the work itself had held up.

That distinction landed hard, because I had spent months assuming the biggest risk was technical.

I was preparing for somebody to look at lg-npu, find out that I did not actually understand what I had built, and expose the whole thing as much less impressive from inside the field than it looked from outside.

Instead, the thing that stopped me was the one part of the application I could not improve by studying harder that month.

That was a very strange result to process.

There were many questions that I wanted answered, but unfortunately, I never got to the interviews. Still, in retrospect, I believe I probably found those answers on my own. All except one, which is why this entry exists.

To be honest, I was crushed.

There is not much point cleaning that sentence up.

I had allowed myself to care about the possibility by then. I had imagined the work. I had imagined moving. I had imagined what it would be like to spend every day in an environment where I was the idiot. Most of all, I had spent weeks preparing for the opportunity to finally put the work under serious scrutiny.

Then it disappeared for a reason which had almost nothing to do with what I had spent those weeks improving.

The technical side had not been what killed the application. The people involved had taken the work seriously. My weird and unusual background had made it much farther than I had any reason to expect when I sent the first email.

That mattered enormously to me.

## So What Now?

Honestly, I wasn't crushed for long. I remember allowing myself the rest of the day to be sad about it, but the next day I got right back to it.

I started interpreting what the experience proved, where I should go from there, what resolve was still missing, and generally how I could turn this experience into something fruitful.

> [!NOTE]
> Fun fact: this experience is the catalyst for the creation of this journal.

ASIC design already has a much stronger relationship with formal education than software does, for understandable reasons. I had found one of the most interesting directions I had encountered in years, and almost immediately run directly into the part of my background which is hardest to change quickly.

The obvious response would have been to accept that this particular experiment had ended inconclusively.

I could tell myself I had done well, point out that I had gone much farther in the process than expected, or even take the encouraging technical feedback as evidence that the hardware work was respectable.

All of that was true, but it was still unsatisfying.

The original lg-npu question had been whether the way I learned and solved problems transferred outside software. I had managed to get a reasonable answer to that by actually entering another field and building something.

The question CERN created and left unanswered was different:

> **Could I have done the work?**

Could I take the kind of problem I would have been hired to work on, with the background I actually have now, and make something real out of it?

There was no longer going to be an interview or experience which answered that for me.

So I started thinking about another way to ask it.

The role was not abstract. It existed because there was actual hardware to design.

I knew roughly what kind of work it was, and I had spent weeks studying specifically because I wanted to be prepared to do it.

There is nothing stopping me from trying to build my own version.

If I fail, for whatever reason, that is more useful than not even trying. I am all about failing after all.

And if I succeed, also great.

So that is what this entry is about.

Not the CERN application, exactly. That is just how I got here, and I feel strongly about it enough to dedicate such a large chunk of the entry to it.

The actual project starts now.

## The Success Criteria

Alright, step 1.

If I want to take this seriously, I have to establish what the project succeeding actually looks like.

I will keep this broad. This is because the details that define success will likely change as I learn and grow throughout the process, so defining the minute details now is unreasonable.

So, very simply:

**Success is defined by a chip designed end-to-end, from RTL to a complete ASIC flow, which I would be willing to pay to manufacture if I had the money.**

I cannot fabricate it or put it in front of a beam, so the criteria have to stop earlier than the real world does. That means being precise about what stands in for it.

First, a written specification, frozen and dated before the design grows around it: what the chip detects, what it receives from the detector front-end, what it exposes to the outside, how fast it has to respond, and what radiation environment it is assumed to live in. The project succeeds against that document, not against whatever the design happens to do.

Second, the chip has to survive the thing it measures. Hardening against single-event effects is part of the design, and it is verified by fault injection: flipping stored bits at random, at rates derived from a stated flux, over enough runs to say what fraction of upsets are masked, detected, or silently corrupt the output, with error bars. Simulation can validate the mitigation. It cannot validate the physics assumptions underneath it, and I will say so when I present the numbers.

Third, enough verification to trust the behaviour: an independent reference model, randomised stimulus that models realistic detector input and noise, stated coverage targets, and formal checks on the safety-critical control paths. For a safety system, a missed alarm and a false alarm are different failures, so each gets its own budget and its own curve.

Fourth, "willing to pay for it" has to be measurable, so it means clean against the signoff checks available in the selected flow, rather than merely flow-complete: timing closed at every corner with margin, physical checks clean, power within budget, a floorplan I can defend, and a design that fits a shuttle slot I can actually price.

Fifth, a design review by somebody who does this professionally, with the spec, the verification report and the signoff results handed over as a package. That is the nearest thing to the interview I did not get. Of course, this means that the design has to hold up.

And finally, a written list of everything it does not do and everything I know is wrong with it. The limitations I can name are worth more than the ones I have not found yet.

If the result meets all of that, I will consider the question answered. If it does not, I will at least know exactly which part I could not do, which is still a better answer than the one I have now.
