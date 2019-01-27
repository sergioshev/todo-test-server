import {Router} from 'express';

import {listController} from '../controllers';
import requestValidator from './validators/validators-runner';
import {
	createValidator, hasIdValidator, hasCriteria, hasTasks
} from './validators';


export default (app) => {
	const router = Router();

	router.put('/list', requestValidator(
		listController.addList, [createValidator]));

	router.post('/list/:id', requestValidator(
	  listController.updateList, [createValidator, hasIdValidator]));

	router.delete('/list/:id', listController.deleteList);

  router.get('/lists', listController.getAll);

  router.post('/lists', requestValidator(
    listController.sortByCriteria, [hasCriteria]));

  router.put('/list/:listName/tasks', requestValidator(
  	listController.addTasks, [hasTasks]));

  router.delete('/list/:listName/task/:taskId', listController.deleteTask);

  router.get('/list/:listName/tasks', listController.getTasks);

  router.post('/list/:listName/tasks', requestValidator(
  	listController.getTasks, [hasCriteria]));

  router.get('/health-check', (req, res) => res.json(200));
  app.use(router)
  return app;
}