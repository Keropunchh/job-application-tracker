using Microsoft.Extensions.Options;

namespace Api.Auth;

public class AuthCookie(IOptions<JwtOptions> options, IHostEnvironment env)
{
    private readonly JwtOptions _options = options.Value;

    public void Set(HttpResponse response, string token)
    {
        response.Cookies.Append(_options.CookieName, token, BuildCookieOptions(expire: true));
    }

    public void Clear(HttpResponse response)
    {
        response.Cookies.Delete(_options.CookieName, BuildCookieOptions(expire: false));
    }

    private CookieOptions BuildCookieOptions(bool expire)
    {
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = !env.IsDevelopment(),
            SameSite = SameSiteMode.Lax,
            Path = "/",
            Expires = expire
                ? DateTimeOffset.UtcNow.AddMinutes(_options.ExpiryMinutes)
                : DateTimeOffset.UnixEpoch,
        };
    }
}
