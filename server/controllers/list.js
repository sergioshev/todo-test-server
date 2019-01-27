import {BAD_REQUEST} from 'http-status-codes';

import {ListRepository} from '../repositories';


const listRepository = new ListRepository();

export function addList(req, res) {
	const {name} = req.body;
	return listRepository.addList(name)
	  .then(list => res.json(list))
	  .catch(err => res.status(BAD_REQUEST).send(err))
}

export function updateList(req, res) {
	const {id} = req.params;
	const {name} = req.body;
	return listRepository.updateList(id, name)
    .then(list => res.json(list))
	  .catch(err => res.status(BAD_REQUEST).send(err))
}

export function getAll(req, res) {
	return listRepository.getAll()
	  .then(lists => res.json(lists))
}

export function sortByCriteria(req, res) {
	const {criteria} = req.body;
	return listRepository.getAll(criteria)
	  .then(lists => res.json(lists))
}

export function deleteList(req, res) {
  const {id} = req.params;
	return listRepository.deleteList(id)
	  .then(list => res.json(list))	
	  .catch(err => res.status(BAD_REQUEST).send(err))
}

export function addTasks(req, res) {
	const {tasks} = req.body;
	const {listName} = req.params;
	return Promise.all(tasks.map(task => {
		return listRepository.addTask(listName, task);
	}))
	.then(result => res.json(result))
	.catch(err => res.status(BAD_REQUEST).send(err))
}

export function getTasks(req, res) {
	const {listName} = req.params;
	const {criteria} = req.body;
	return listRepository.getTasks(listName, criteria)
	  .then(tasks => res.json(tasks))
}

export function deleteTask(req, res) {
	const {listName, taskId} = req.params;
	return listRepository.deleteTask(listName, taskId)
	  .then(result => res.json(result))
	  .catch(err => res.status(BAD_REQUEST).send(err))
}