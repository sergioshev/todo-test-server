import {BAD_REQUEST} from 'http-status-codes';


export default (wrappedResource, validators = null) =>
  (req, res) => {
    if (!validators) return wrappedResource(req, res);

    return Promise.all(validators.map(validator => validator(req)))
      .then(keepErrors)
      .then(triggerWrapped(req, res, wrappedResource))
  }

const triggerWrapped = (req, res, wrappedResource)  => (valdationErrors) => {
	if (valdationErrors.length === 0) return wrappedResource(req, res);
  return res.status(BAD_REQUEST).json(valdationErrors);
}

const keepErrors = (runResults) => runResults.filter(
	runResult => runResult !== true)