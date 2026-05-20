"use client";

// Single source of truth for GSAP + plugins. Importing from this file
// (instead of "gsap" directly) guarantees plugins are registered before
// any component's useEffect runs.
//
// React effect order is children-first, parent-last — so registering inside
// a Provider's useEffect would be too late for child effects that call
// ScrollTrigger.create() on mount.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
