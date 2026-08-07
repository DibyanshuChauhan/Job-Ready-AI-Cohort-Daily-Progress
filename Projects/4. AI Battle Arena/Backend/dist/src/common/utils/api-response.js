export class ApiResponse {
    static success(res, data, message = "Success", statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            result: data,
        });
    }
    static error(res, message = "Internal Server Error", statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            error: message,
        });
    }
}
//# sourceMappingURL=api-response.js.map