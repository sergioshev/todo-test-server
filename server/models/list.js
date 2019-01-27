//Emlation for tasks and lists data store.
//all data is kept in memory.
class FakeList {
	constructor() {
		this.collection = {};
		this.lastIndex = 0;
		this.tasks ={}
    this.sorters = {
    	'name': (a, b) => { return a.name > b.name ? 1 :
    	  a.name < b.name ? -1 : 0},
    	'date': (a, b) => { return a.createdAt > b.createdAt ? 1 :
    	  a.createdAt < b.createdAt ? -1 : 0},
    	'order': (a, b) => {
    		return a['order'] > b['order'] ? 1 :
    		  a['order'] < b['order'] ? -1 : 0;
    	},
    	'itemsCount': (a, b) => {
    		return a['itemsCount'] > b['itemsCount'] ? 1 :
    		  a['itemsCount'] < b['itemsCount'] ? -1 : 0;
    	}
    }
	}

  __getTaskIndex(listIndex, tasksIndex) {
  	return `${listIndex}.${tasksIndex}`;
  }

  create(name) {
  	const item = {
  		name: name,
  		index: this.lastIndex,
  		itemsCount: 0,
  		createdAt: new Date()
  	};

  	this.collection[this.lastIndex] = item;
  	this.tasks[this.lastIndex] = {
  		lastIndex: 0,
  		todoList: {}
  	};
  	this.lastIndex++;
  	return Promise.resolve(item);
  }

  findById(id) {
  	return this.collection[id] ?
  	  Promise.resolve(this.collection[id]) : Promise.resolve(null)
  }

  findByName(name) {
  	return this.findAll()
  	  .then(collection => collection.filter(
  		   list => list.name === name).shift())
  }

  findAll() {
  	const keys = Object.keys(this.collection);
  	return Promise.all(keys.map(this.findById.bind(this)));
  }

  update(id, name) {
  	return this.findById(id)
      .then(list => {
      	if (!list) return null;
    	  this.collection[id].name = name;
    	  return this.collection[id]
      })
  }

  delete(id) {
    return this.findById(id)
      .then(list => {
         if (!list) return null;
         const deletedList = new Object(this.collection[id]);
  	     const deletedTasks = new Object(
  	     	Object.values(this.tasks[id].todoList));
         delete(this.collection[id]);
         delete(this.tasks[id]);
         return {deletedList, deletedTasks}
      });
  }

  sort(criteria = null) {
  	return (items) => {
	  	return	criteria ? 
	  	  items.sort(this.sorters[criteria]) : items;
  	}
  }

  addTask(name, task) {
  	const {name: taskName, order = 0} = task;
    return this.findByName(name)
      .then(list => {
      	if (!list) return null;
      	const lastIndex = this.tasks[list.index].lastIndex;
      	const taskIndex = this.__getTaskIndex(list.index, lastIndex);
      	const taskItem = {
      		index: lastIndex, name: taskName, order, createdAt: new Date()};
      	this.tasks[list.index].lastIndex++;
      	this.tasks[list.index].todoList[taskIndex] = taskItem;
      	this.collection[list.index].itemsCount++;
      	return taskItem; 
      })
  }

  getTasks(name) {
  	return this.findByName(name)
      .then(list => {
        if (!list) return [];
        return Object.values(this.tasks[list.index].todoList);
      });
  }

  removeTask(name, taskId) {
    return this.findByName(name)
      .then(list => {
        if (!list) return null;
        const taskIndex = this.__getTaskIndex(list.index, taskId);
        const deletedTask = new Object(
        	this.tasks[list.index].todoList[taskIndex]);
        if (this.tasks[list.index].todoList[taskIndex])
          this.collection[list.index].itemsCount--;
        delete(this.tasks[list.index].todoList[taskIndex]);
        return {deletedTask};      	
      })
  }
}

export default FakeList;