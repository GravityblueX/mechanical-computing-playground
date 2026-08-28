# Why a Difference Engine can tabulate with addition

**Evidence boundary:** the polynomial finite-difference property is mathematical (grade A); this repository's leading-value crank is a pedagogical abstraction (grade D), not a complete reconstruction of Babbage's mechanism.

For a degree-k polynomial, the kth forward difference is constant. Advancing one row therefore requires adding each higher-order difference into the lower-order accumulator in a defined sequence. No general multiplication unit is needed for the table-generation step: multiplication is embedded in the initial differences and repeated addition. Real Difference Engine designs include more detailed columns, carries, printing, and sequencing; consult the cited reconstruction sources in `docs/PRIOR_ART.md` before making geometric claims.
