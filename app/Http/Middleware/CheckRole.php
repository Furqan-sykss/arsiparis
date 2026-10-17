<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(
        Request $request,
        Closure $next,
        string $role
    ): Response {
        $user = $request->user();

        if (! $user || ! $user->hasRole($role)) {
            abort(403, 'Anda tidak memiliki role yang diperlukan.');
        }

        return $next($request);
    }
}
