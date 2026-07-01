# Triage labels

The `triage` skill moves issues through five canonical states. This repo uses the default label strings — apply these exact strings when triaging (as a `Label:` line in the issue markdown file, since this repo uses local-markdown tracking).

| Role | Label string | Meaning |
|---|---|---|
| needs-triage | `needs-triage` | Maintainer needs to evaluate |
| needs-info | `needs-info` | Waiting on reporter |
| ready-for-agent | `ready-for-agent` | Fully specified, AFK-ready — an agent can pick it up with no human context |
| ready-for-human | `ready-for-human` | Needs human implementation |
| wontfix | `wontfix` | Will not be actioned |
