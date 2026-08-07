import type { Request, Response, NextFunction } from "express";
export declare class ArenaController {
    /**
     * POST /api/arena/invoke
     * Handles user comparison prompt requests
     */
    static invoke(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/arena/history
     * Retrieves all past comparison sessions
     */
    static getHistory(_req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/arena/history/:id
     * Retrieves a specific comparison session by ID
     */
    static getHistoryById(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * DELETE /api/arena/history/:id
     * Deletes a specific comparison session
     */
    static deleteHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * DELETE /api/arena/history
     * Clears all comparison sessions
     */
    static clearAllHistory(_req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/arena/health
     * Healthcheck for the arena feature
     */
    static healthCheck(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=arena.controller.d.ts.map