import { get, writable } from "svelte/store";

const touching = new writable(false);

export default touching;
