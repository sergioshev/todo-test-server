import {ListModel} from '../models';


class ListRepository {
	constructor (DefaultModel = ListModel) {
    this.listModel = new DefaultModel();
	}

	addList(listName) {
		return this.listModel.create(listName);
	}

	updateList(id, listName) {
		return this.listModel.update(id, listName);
	}

	getAll(criteria = null) {
		return this.listModel.findAll()
		  .then(this.listModel.sort(criteria))
	}

	deleteList(id) {
		return this.listModel.delete(id)
	}

	getTasks(listName, criteria = null) {
		return this.listModel.getTasks(listName)
		  .then(this.listModel.sort(criteria))
	}

  addTasks(listName, tasks) {
		return Promise.all(tasks.map(task => {
		  return this.addTask(listName, task)
		}))
	}

	addTask(listName, task) {
		return this.listModel.addTask(listName, task)
	}

	deleteTask(listName, taskId) {
		return this.listModel.removeTask(listName, taskId)
	}
}

export default ListRepository;