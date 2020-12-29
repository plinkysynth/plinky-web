<script>
	import UI from "./components/UI.svelte";
	import Help from "./components/Help.svelte";
	import Editor from "./components/Editor.svelte";
	import Synth from './lib/Synth';
	import { onMount } from "svelte";

	let synth;

	onMount(() => {

	}) 

	//export let name;
</script>

<main>
	<div class="UIContainer">
		<div class="InterfaceContainer">
			<div class="Interface">
				<UI />
				<Help />
			</div>
		</div>
		<Editor />
	</div>
</main>

<style>
	.Interface {
		position: relative;
	}
	.InterfaceContainer {
		position: relative;
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
	}
	.UIContainer {
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		width: 100%;
		height: 100%;
		justify-content: center;
	}
	main {
		text-align: center;
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}
  :global(body, html) {
		margin: 0;
		padding: 0;
		font-size: 8px;
		background: #111;
		color: white;
		background-image: url('/aaa.png');
	}
	@media(max-width:1440px) {
		.InterfaceContainer {
			zoom: 0.75;
		}
	}
	@media(max-width:1280px) {
		.InterfaceContainer {
			zoom: 0.65;
		}
	}
	@media(max-width:1024px) {
		.InterfaceContainer {
			zoom: 0.65;
		}
	}
	@media(max-width:740px) {
		.InterfaceContainer {
			zoom: 0.35;
		}
	}
	@media(max-width:667px) {
		.InterfaceContainer {
			zoom: 0.33;
		}
	}
</style>