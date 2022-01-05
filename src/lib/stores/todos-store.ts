import { writable } from 'svelte/store';
import Todo from '$lib/models/todo';

const { subscribe, update } = writable([]);

export default {
	subscribe,

	addTodo(text: string): void {
		update((prev) => {
			return [...prev, new Todo(text)];
		});
	},

	updateTodo(id: number, props: { text?: string; completed?: boolean }): void {
		update((prev) => {
			const targetIndex = prev.findIndex((todo) => todo.id === id);
			const updatedTodo = prev[targetIndex];

			for (const key in props) {
				updatedTodo[key] = props[key];
			}

			return [
				// copy all todos up to the target index
				...prev.slice(0, targetIndex),
				// update the oldTodo with props from the new one
				updatedTodo,
				// copy the remaining todos
				...prev.slice(targetIndex + 1, prev.length)
			];
		});
	},

	deleteTodo(id: number): void {
		update((prev) => {
			return prev.filter((todo) => todo.id !== id);
		});
	},

	clearCompleted(): void {
		update((prev) => {
			return prev.filter((todo) => !todo.completed);
		});
	},

	toggleAll(completed: boolean): void {
		update((prev) => {
			return prev.map((todo) => {
				const updated = todo;
				updated.completed = completed;
				return updated;
			});
		});
	}
};
