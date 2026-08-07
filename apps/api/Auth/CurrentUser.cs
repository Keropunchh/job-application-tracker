using System.Security.Claims;

namespace Api.Auth;

public static class CurrentUser
{
    /// <summary>
    /// Hotspot: owner id must come from validated JWT claims — never from request body.
    /// </summary>
    public static Guid GetUserId(ClaimsPrincipal user)
    {
        var raw = user.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? user.FindFirstValue("sub");

        if (raw is null || !Guid.TryParse(raw, out var userId))
        {
            throw new InvalidOperationException("Authenticated user is missing a valid id claim.");
        }

        return userId;
    }
}
