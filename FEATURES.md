# Spanish Conjugation Quick-Practice - Feature Overview

This document provides a high-level overview of the feature set and design decisions for human review.

## 1. Minimalist & Focused Design System
- **Strict Light Mode Only**: Completely light background (`#f1f5f9`) with clean white cards (`#ffffff`). Zero dark mode.
- **No Emojis & No Fluff**: Designed purely for fast, high-density muscle memory building. No distraction text, headers, marketing elements, or emojis.
- **Typography**: Uses **Lora** from Google Fonts (a clean, human serif font).
- **Color Palette**: Primary color palette (Primary Blue `#1d4ed8`, Primary Red `#dc2626`, Primary Amber `#d97706`, and Primary Green `#15803d`).
- **Mobile-First Compact Layout**:
  - **Section Order**: Subject Person 2x3 grid is placed FIRST, Time/Aspect timeline row is placed SECOND below it.
  - Tenses list on Home page displays Spanish proper names and grey English labels side-by-side in one line to save vertical space.

## 2. Settings & Practice Configuration (Landing View)
- **Tense Selection**: Selectable options for Spanish tenses using proper grammatical names and side-by-side English translations (*Presente (Present)*, *Pretérito Indefinido (Preterite)*, etc.).
- **Button Label Language Controls (3-State Controls)**:
  - **Time / Aspect Button Labels**: `Spanish` (*Presente*, *Pretérito Imperfecto*), `English` (*Present*, *Imperfect*), or `No Text` (icons only).
  - **Subject Person Button Labels**: `Spanish` (*yo*, *tú*, *él/ella*), `English` (*me*, *you*, *him*), or `No Text` (icons only).
- **Include Irregular Verbs Toggle**: Modern switch to enable/disable irregular verbs (*ser*, *estar*, *ir*, *tener*, etc.). Toggle ON to include irregular verbs alongside regular verbs.
- **Beginner Mode Toggle**: Modern switch to enable giveaway letter highlighting and English explanations.

## 3. Interactive Quiz & Instant Diagnostic Feedback
- **Prominent Word Display**: Displays the conjugated verb prominently in the card view.
- **Hidden Reveal Buttons Below Word**:
  - **Infinitive Button**: Off by default; click to reveal/hide the unconjugated verb.
  - **Translation Button**: Off by default; click to reveal/hide the English translation.
  - **Hint Button** (Normal Mode): Off by default; click to toggle giveaway letter highlights for that question.
- **Subject Person 2x3 Grid (Section 1 - FIRST)**:
  - Arranged in a strict 2-column x 3-row grid matching traditional school verb charts:
    - **Column 1 (Singular)**: me (yo), you (tú), him/her/usted (él/ella/usted)
    - **Column 2 (Plural)**: us (nosotros), yall (vosotros/ustedes), them (ellos/ellas)
  - Icons containing "me" (*yo* and *nosotros*) feature a **black / solid filled person** (solid head and solid body).
- **Time/Aspect Timeline (Section 2 - SECOND below Subject Person)**:
  - Text below icon:
    1. Ongoing past (imperfect - far left)
    2. One-time past (preterite)
    3. Present
    4. Future (far right)
- **Feedback Card Layout & Next Button Position**:
  - **Next Button at the TOP** of the feedback card for immediate access without scrolling down.
  - **Bilingual Diagnostic Comparison on Wrong Answers**:
    ```
    You picked:
    "bebíais"
    you all used to drink

    Correct answer:
    "bebía"
    I / he / she used to drink
    ```
- **English Giveaway Explanations**: Explains in plain English with icons why specific letters indicate the tense or subject.

## 4. Comprehensive Verb Database & Translator
- Contains regular `-ar`, `-er`, and `-ir` verbs alongside key irregular verbs (*ser*, *estar*, *ir*, *tener*, etc.) with pre-calculated giveaway markers, full conjugation tables, and natural English contextual phrase translation logic.

## 5. Technical Stack
- **Framework**: Vite + React + TypeScript.
- **Styling**: Vanilla CSS with CSS custom variables for state management and animations.
