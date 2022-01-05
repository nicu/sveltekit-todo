<script>
	import { createEventDispatcher } from 'svelte';

	// component properties
	export let placeholder = 'What needs to be done?';

	// internals
	const dispatch = createEventDispatcher();

	const onKeyDown = (evt) => {
		if (evt.key === 'Enter') {
			const value = evt.target.value.trim();

			if (value.length) {
				dispatch('newTodo', value);
				evt.target.value = '';
			}
		}
	};
</script>

<input class="new-todo" {placeholder} autofocus on:keydown={onKeyDown} />
