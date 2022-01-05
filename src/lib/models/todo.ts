let id = 0;

export default class Todo {
	id: number;
	text: string;
	completed: boolean;

	constructor(text: string, completed = false) {
		this.id = id++;
		this.text = text;
		this.completed = completed;
	}
}
