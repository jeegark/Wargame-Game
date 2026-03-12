# Grey Zone Grid

This is a standalone static game built from RenewableUK's March 2026 report:

- `New threats and new tools: reinventing energy security for an era of instability`

The game turns the report's tabletop wargame into an interactive single-player
exercise where the player manages:

- system stability
- public trust
- fiscal headroom
- attribution clarity

## What It Does

The experience is structured in three parts:

1. `Preparation`
   Choose two resilience tools adapted from the report's six recommendations.
2. `Six decision rounds`
   Play through:
   - North Sea gas-pipeline sabotage
   - a wind-farm cyberattack via compromised software
   - malware at a major gas terminal
3. `Debrief`
   Review the final doctrine, strategic trade-offs, and report-informed next
   steps.

## Files

- `index.html`: page structure
- `styles.css`: visual system and responsive layout
- `app.js`: scenario model, scoring, tool bonuses, and debrief logic

## Local Development

This is a plain static site. No build step is required.

From this directory:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## Notes

- The scenario content is paraphrased from the report rather than reproduced.
- The game keeps the report's central tension intact: the UK can maintain
  supply and still lose strategically if it relies too heavily on expensive gas
  and weak public coordination.
