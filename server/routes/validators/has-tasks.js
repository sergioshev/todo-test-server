export default (req) => {
	const {tasks} = req.body;
	if (!tasks) return "Missing tasks array";
	if (!(tasks instanceof Array)) return "Bad tasks set";
	const hasNames = tasks.reduce((acc, task) => {
		if (acc === false || !task['name']) return false;
    return true;
	}, true);
	if (!hasNames) return "Bad format for tasks";
	return true;
}