---
title: Nilsson and Pelger was not a real simulation
number: 5
claim: "Nilsson and Pelger's famous computer simulation of eye evolution never existed. Their paper has no computer model, no random mutation and no real selection: the authors drew a path to a known end point and assumed evolution would follow it."
attribution: "Berlinski (2003), Commentary; repeated by Sarfati, Refuting Evolution 2, ch. 10."
short_answer: "The label was wrong: Nilsson and Pelger (1994) did a calculation, not a computer simulation, and Nilsson has said so. The calculation is in the paper: resolution worked out at each stage, the 1,829 steps explained, and a standard formula for selection acting on random variation. In 2025 a computer simulation using random mutation and selection found the same route, pinhole first and lens second."
evidence:
  - { label: "Chapter 4, Step by step (section 4.8)", href: "/chapter/4/#48-how-long-would-it-take" }
  - { label: "Claim: What use is half an eye?", href: /claims/what-use-is-half-an-eye/ }
  - { label: "Atlas: Nautilus", href: /atlas/chambered-nautilus/ }
figure_prefix: claim-nilsson-pelger
first_published: 2026-11-07
last_revised: 2026-11-07
status: published
---

## The claim

In April 2003 the writer David Berlinski argued in *Commentary* that the most famous model of eye evolution contains no simulation at all.[^1] The paper, by Dan-Eric Nilsson and Susanne Pelger (1994), had been widely described as a computer simulation; Berlinski pointed out that the words "computer" and "simulation" do not appear in it, and said Nilsson had confirmed this to him by letter in 2001.[^1] He went further. The paper, he wrote, contains no random variation, gives natural selection no real role, never calculates visual acuity and derives its 1,829 steps from nothing.[^1] He compared random change to letters drawn from an urn, and accused those who had repeated the simulation story, Richard Dawkins above all, of what he was willing to call scientific fraud.[^1]

Jonathan Sarfati calls the paper "a simplistic computer simulation" and argues that it starts with light-sensitive cells and a transparent layer that are already complex.[^2] He also quotes the authors' own admission that an eye makes little sense on its own.[^2]

Put together, the claim is that the result was never tested: the authors drew a path to a known end point and assumed evolution would follow it.

## The evidence

### What the paper calculated

Nilsson and Pelger began with a flat patch of light-sensitive cells and asked how many small changes in optical geometry would turn it into a focused eye, with selection acting on resolution alone (Chapter 4, section 4.8).[^3] Resolution was worked out, not assumed. The paper's first figure plots it against the depth of the pit, the size of the aperture (allowing for photon noise) and the refractive index of a developing lens; its third plots how many image points the eye can resolve at each stage of the sequence.[^4] Nilsson later added that these curves were computer-generated in small increments, using the equation and theory given in the paper.[^5]

:::figure 1
Nilsson and Pelger's own calculation: how many image points their model eye can resolve at each of its first seven stages, against the number of 1% steps taken. Stage 8, the focused eye, is off the scale.
:::

The 1,829 steps are explained on page 56. Each structure was measured on its own, by length, arc length, or height and width, with refractive index converted to protein concentration.[^6] The authors acknowledge that any such measure of change is partly arbitrary.[^6] Readers can check every one of these figures in the paper itself.

### Variation and selection are in the sums

The number of generations comes from a standard equation of quantitative genetics, in which the change per generation depends on heritability, the strength of selection and the variation present in the population.[^7] With deliberately low values for selection and variation, each generation changes by 0.005%, and the whole sequence takes 363,992 generations.[^7] The paper states its assumption that selection acts on "small but random phenotypic variations".[^7] The authors also made every step happen one after another, although real selection would act on all the parts at once, and they expected real selection to find better routes than theirs.[^8]

Berlinski's urn treats change as one individual trying again and again. Nilsson replied that this assumes a population of one, in which there can be no selection at all.[^5]

### A simulation has now been run

Nilsson's view in 2003 was that a simulation would only automate the logic of the paper.[^5] Simulations have since been run. Tiwary and colleagues (2025), with Nilsson among the authors, evolved simulated animals whose genes set the position, optics and neural processing of their eyes, using repeated rounds of mutation and selection, with five independent runs of each experiment.[^9] All started with one eye containing one photoreceptor. Those selected for telling objects apart evolved two forward-facing camera-type eyes; those selected for getting through a maze evolved several eyes spread around the body.[^9]

When only the pupil could change, populations went from an open eye to a cup-like and then a near-pinhole eye, then stopped improving because a pinhole lets in too little light.[^9] When the optics could mutate as well, random lens shapes at first made performance worse, then were refined into well-focused lenses behind wider pupils, with higher fitness.[^9] That is the order Nilsson and Pelger calculated: a pinhole until it can improve no further, then a lens.[^4][^9]

:::figure 2
In a 2025 simulation, eyes shaped only by random mutation and selection passed through these stages in this order. Once a lens could evolve, the pupil widened again without losing sharpness.
:::

A smaller 2019 study reports a computer model in which selection to detect the direction of an approaching predator turned a flat light-sensitive surface, step by step, into a lensless pinhole eye.[^10]

## Where the claim has a point

**The label was wrong.** The 1994 paper contains no computer simulation, and neither word appears in it.[^3] Nilsson agreed in print that it had been wrongly described as one.[^5] A 2008 review calls the work a theoretical model, "not, as it is sometimes described, a 'simulation'".[^11] Popular accounts spread the error: Dawkins described the model eye deforming "on the computer screen".[^12] Berlinski was right to point this out.

**The model chose its own path.** Nilsson and Pelger followed one route and treated each structure as free to change without side effects; Hansen (2003) criticised the model for ignoring pleiotropy, where one gene affects several traits.[^12] Models of this kind also say nothing about which mutations supplied the variation. Molecular studies, such as work on squid lens proteins that arose by gene duplication, have begun to fill that gap.[^12]

**The 2025 simulation has limits of its own.** Its lens is a programmable optical mask, not living tissue, and its "cup" is a pupil setting, not a folding sheet of cells.[^9] The researchers switched on lens mutations part-way through, and the study aims at the general process, not the historical timeline.[^9] It shows selection finding the pinhole-then-lens route; it does not show how eye tissue arose.[^9]

**"An eye makes little sense on its own."** Sarfati quotes the paper accurately.[^2] In context, the authors use the line to explain why simple eyes persist: an animal gains nothing from sharp eyes without the brain and body to use them.[^13] Their estimate therefore shows only that optics would not hold evolution back; it does not say how long eyes actually took.[^13] The 2025 simulation found the same link, with better eyes paying off only when the neural network behind them grew too.[^9] How simple eyes work with simple nervous systems is covered in "What use is half an eye?".

[^1]: Berlinski D (2003). A scientific scandal. *Commentary*, April 2003. https://www.commentary.org/articles/david-berlinski/a-scientific-scandal/, accessed 7 Nov 2026.
[^2]: Sarfati J. *Refuting Evolution 2*, ch. 10, "Argument: 'Irreducible complexity'". Revised and expanded edition, 2011. https://creation.com/irred-complex, accessed 7 Nov 2026.
[^3]: Nilsson D-E, Pelger S (1994). A pessimistic estimate of the time required for an eye to evolve. *Proc R Soc Lond B* 256:53–58, pp.53–54. doi:10.1098/rspb.1994.0048
[^4]: Nilsson D-E, Pelger S (1994). A pessimistic estimate of the time required for an eye to evolve. *Proc R Soc Lond B* 256:53–58, pp.54–56 (Figs 1 and 3). doi:10.1098/rspb.1994.0048
[^5]: Nilsson D-E (2003). Beware of pseudo-science [reply to Berlinski]. *Commentary* 116(1):10–12. Reproduced at http://www.talkreason.org/articles/blurred.cfm, accessed 7 Nov 2026.
[^6]: Nilsson D-E, Pelger S (1994). A pessimistic estimate of the time required for an eye to evolve. *Proc R Soc Lond B* 256:53–58, p.56. doi:10.1098/rspb.1994.0048
[^7]: Nilsson D-E, Pelger S (1994). A pessimistic estimate of the time required for an eye to evolve. *Proc R Soc Lond B* 256:53–58, p.57. doi:10.1098/rspb.1994.0048
[^8]: Nilsson D-E, Pelger S (1994). A pessimistic estimate of the time required for an eye to evolve. *Proc R Soc Lond B* 256:53–58, pp.56–57. doi:10.1098/rspb.1994.0048
[^9]: Tiwary K, Young A, Tasneem Z, Klinghoffer T, Dave A, Poggio T, Nilsson D-E, Cheung B, Raskar R (2025). What if eye…? Computationally recreating vision evolution. *Sci Adv* 11:eady2888. doi:10.1126/sciadv.ady2888
[^10]: Vaughan N (2019). Evolution of biological eye in computer simulation. *2019 IEEE Congress on Evolutionary Computation (CEC)*, Wellington. doi:10.1109/CEC.2019.8790284
[^11]: Gregory TR (2008). The evolution of complex organs. *Evo Edu Outreach* 1:358–389 (Fig. 8 caption). doi:10.1007/s12052-008-0076-1
[^12]: Oakley TH, Pankey MS (2008). Opening the "black box": the genetic and biochemical basis of eye evolution. *Evo Edu Outreach* 1:390–402. doi:10.1007/s12052-008-0090-3
[^13]: Nilsson D-E, Pelger S (1994). A pessimistic estimate of the time required for an eye to evolve. *Proc R Soc Lond B* 256:53–58, p.58. doi:10.1098/rspb.1994.0048

## Editor's notes

Approved by Paul, 7 Nov 2026. The draft's "The short answer" section is shown in the claim box from front matter; its sources are all cited again in "The evidence".

Dossier trace: C1–C3 → 1; C5, C31 → 2; C7, C12 → 3; C13 → 4; C8, C14, C20, C21 → 5; C15 → 6; C16, C17 → 7; C18 → 8; C22–C26, C32 → 9; C27 → 10; C9 → 11; C10, C29, C30 → 12; C31 → 13. Not used: C4, C6, C11, C19.

Glossary terms to link: photoreceptor · resolution · aperture · pinhole eye · refractive index · graded-index lens · photon noise · heritability · selection intensity · quantitative genetics · pleiotropy · camera-type eye
