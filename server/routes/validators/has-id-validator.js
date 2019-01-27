export default (req) => {
	const {id} = req.params;
	if (!id) return "Missing 'id' parameter";
	return true;
}