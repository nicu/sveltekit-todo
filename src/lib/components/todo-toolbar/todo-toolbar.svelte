<script>
	import { createEventDispatcher } from 'svelte';

	export let currentFilter = 'all';
	export let remaining = 0;

	const dispatch = createEventDispatcher();

	const clearCompleted = () => {
		dispatch('clearCompleted');
	};
</script>

<footer class="footer">
	<!-- This should be `0 items left` by default -->
	<span class="todo-count"><strong>{remaining}</strong> item left</span>
	<!-- Remove this if you don't implement routing -->
	<ul class="filters">
		<li>
			<a class:selected={currentFilter === 'all'} href="#/">All</a>
		</li>
		<li>
			<a class:selected={currentFilter === 'active'} href="#/active">Active</a>
		</li>
		<li>
			<a class:selected={currentFilter === 'completed'} href="#/completed">Completed</a>
		</li>
	</ul>
	<!-- Hidden if no completed items are left ↓ -->
	<button class="clear-completed" on:click={clearCompleted}>Clear completed</button>
</footer>
