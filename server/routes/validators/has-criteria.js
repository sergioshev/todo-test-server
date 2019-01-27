export default (req) => {
	const {criteria} = req.body;
	const supportedCriteria = ['date', 'name', 'order', 'itemsCount'];
	if (!criteria) return 'Missing criteria';
	if (!supportedCriteria.includes(criteria))
	  return "Not supported criteria provided";
	return true; 
}