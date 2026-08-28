# Carry is the hard part

A decimal wheel needs only ten stable positions. The difficult mechanism is the boundary transition: when `9` rolls to `0`, a reliable transfer must reach the next wheel, wait for the correct phase, and stop at the first non-9 wheel. The register core exposes those transitions as ordered events rather than hiding them in a final integer.

This note is a general mechanism observation (grade D in this project), not a claim that every historical calculator used the same coupling. The exhibit uses a conservative abstract carry chain so visitors can inspect `0099 + 1 → 0100` one event at a time.
