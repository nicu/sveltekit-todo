<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let todos = [];

	const dispatch = createEventDispatcher();

	let todoBeingEdited: number = -1;
	let editInput = null;

	const setEditing = (id) => {
		todoBeingEdited = id;
	};

	const onKeyDown = (evt) => {
		if (evt.key === 'Enter') {
			const value = evt.target.value.trim();
			if (value.length) {
				dispatch('todoUpdated', {
					id: todoBeingEdited,
					todo: {
						text: value
					}
				});
			} else {
				dispatch('todoDeleted', todoBeingEdited);
			}
			cancelEdit();
		}

		if (evt.key === 'Escape') {
			cancelEdit();
		}
	};

	const deleteTodo = (todo) => {
		dispatch('todoDeleted', todo.id);
		cancelEdit();
	};

	const toggleChecked = (todo) => {
		cancelEdit();

		dispatch('todoUpdated', {
			id: todo.id,
			todo: {
				completed: !todo.completed
			}
		});
	};

	const cancelEdit = () => {
		todoBeingEdited = -1;
	};

	$: editInput && editInput.focus();
</script>

{#if todos.length}
	<ul class="todo-list">
		{#each todos as todo (todo.id)}
			<li class:completed={todo.completed} class:editing={todoBeingEdited === todo.id}>
				<div class="view">
					<input
						class="toggle"
						type="checkbox"
						checked={todo.completed}
						on:change={() => toggleChecked(todo)}
					/>
					<label on:dblclick={() => setEditing(todo.id)}>{todo.text}</label>
					<button class="destroy" on:click={() => deleteTodo(todo)} />
				</div>

				{#if todoBeingEdited === todo.id}
					<input
						class="edit"
						bind:this={editInput}
						value={todo.text}
						on:keydown={onKeyDown}
						on:blur={cancelEdit}
					/>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
