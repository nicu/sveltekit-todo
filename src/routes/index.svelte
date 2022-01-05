<script context="module">
	import './index.css';
</script>

<script lang="ts">
	import NewTodo from '$lib/components/new-todo/new-todo.svelte';
	import TodoList from '$lib/components/todo-list/todo-list.svelte';
	import TodoToolbar from '$lib/components/todo-toolbar/todo-toolbar.svelte';
	import ToggleAllTodos from '$lib/components/toggle-all-todos/toggle-all-todos.svelte';
	import todos from '$lib/stores/todos-store';

	let currentFilter = 'all';

	const onNewTodo = (evt) => {
		const todo = evt.detail;
		todos.addTodo(todo);
	};

	const onTodoUpdated = (evt) => {
		const args = evt.detail;
		todos.updateTodo(args.id, args.todo);
	};

	const onTodoDeleted = (evt) => {
		const id = evt.detail;
		todos.deleteTodo(id);
	};

	const clearCompleted = () => {
		todos.clearCompleted();
	};

	const updateView = () => {
		currentFilter = 'all';
		if (window.location.hash === '#/active') {
			currentFilter = 'active';
		} else if (window.location.hash === '#/completed') {
			currentFilter = 'completed';
		}
	};

	const toggleAllTodos = (evt) => {
		const completed = evt.detail;
		todos.toggleAll(completed);
	};

	$: filtered =
		currentFilter === 'all'
			? $todos
			: currentFilter === 'completed'
			? $todos.filter((todo) => todo.completed)
			: $todos.filter((todo) => !todo.completed);

	$: remaining = $todos.filter((todo) => !todo.completed).length;
</script>

<svelte:window on:hashchange={updateView} />

<section class="todoapp">
	<header class="header">
		<h1>todos</h1>
		<NewTodo on:newTodo={onNewTodo} />
	</header>

	<section class="main">
		<ToggleAllTodos {remaining} on:toggleAllTodos={toggleAllTodos} />
		<TodoList todos={filtered} on:todoUpdated={onTodoUpdated} on:todoDeleted={onTodoDeleted} />
	</section>

	<TodoToolbar on:clearCompleted={clearCompleted} {currentFilter} {remaining} />
</section>
