namespace Api.Auth;

public class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = "job-application-tracker";
    public string Audience { get; set; } = "job-application-tracker";
    /// <summary>Signing key — override via env/user-secrets in real deploy.</summary>
    public string SigningKey { get; set; } = string.Empty;
    public int ExpiryMinutes { get; set; } = 60 * 8;
    public string CookieName { get; set; } = "access_token";
}
