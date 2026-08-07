namespace Api.Domain;

/// <summary>
/// Named JobApplication to avoid clash with Microsoft.AspNetCore.Http.ApplicationBuilder abstractions.
/// Table maps to "applications".
/// </summary>
public class JobApplication
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Company { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = "Wishlist";
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    public User User { get; set; } = null!;
}
