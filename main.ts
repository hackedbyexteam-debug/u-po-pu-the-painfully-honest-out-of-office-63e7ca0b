// The Painfully Honest Out-of-Office — make.fun program/v1 entry.
// Writes one sentence to /output/entry.txt: a brutally honest but still
// polite out-of-office auto-reply. The private truth (C2) is that the
// sender stopped pretending to climb the inbox landslide on Tuesday; the
// warmth (C3) is that the reader's email gets answered first on return;
// the quotable turn (C5) is the landslide the sender stopped pretending
// to climb. One sentence, 172 characters, inside the 200-character gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm on leave until Monday, and the honest truth is my inbox is a landslide I stopped pretending to climb on Tuesday, but yours is the email I'll answer first when I return.";

// The sealed gate only accepts 1–200 characters, one sentence, not blank.
// Also reject any stray newline or leading/trailing space, which would
// waste characters and could fail the gate's "not only white space" rule.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY !== ENTRY.trim() || ENTRY.includes("\n")) {
  throw new Error("entry must have no leading/trailing space or newline");
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !/\S/.test(ENTRY)) {
  throw new Error("entry must be exactly one non-blank sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
