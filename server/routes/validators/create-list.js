export default (req) => {
	const {name} = req.body;

	if (!name) return "Missing 'name' attribute";
	return true;
}