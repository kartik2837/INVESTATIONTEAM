const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-investation-api-keys'];
    // Check if API key is provided
    if (!apiKey) {
        return res.status(401).json({
            errorCode: 401,
            status: false,
            message: "API key is required",
        });
    }
    // Validate the API key (You can implement your own validation logic here)
    if (apiKey !== process.env.JWT_SECRET) {
        return res.status(403).json({
            errorCode: 403,
            status: false,
            message: "Invalid API key",
        });
    }
    // API key is valid, proceed to the next middleware or route handler
    next();
};

module.exports = apiKeyMiddleware;
