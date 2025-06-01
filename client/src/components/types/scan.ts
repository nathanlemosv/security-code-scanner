import type { Occurrence } from "./occurrence.ts";

export interface Scan {
    file: File
    occurrences?: Occurrence[]
}