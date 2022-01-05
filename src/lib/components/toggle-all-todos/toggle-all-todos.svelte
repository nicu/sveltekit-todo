<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let remaining = 0;

	const dispatch = createEventDispatcher();

	const toggleAllTodos = (evt) => {
		dispatch('toggleAllTodos', evt.target.checked);
	};
</script>

<input
	id="toggle-all"
	class="toggle-all"
	type="checkbox"
	checked={!remaining}
	on:click={toggleAllTodos}
/>
<label for="toggle-all">Mark all as complete</label>
