using System.ComponentModel.DataAnnotations;

namespace Api.Dtos;

public record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(8)] string Password);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password);

public record MeResponse(Guid Id, string Email, DateTimeOffset CreatedAt);

public record CreateApplicationRequest(
    [Required, MaxLength(200)] string Company,
    [Required, MaxLength(200)] string Title);

public record ApplicationResponse(
    Guid Id,
    string Company,
    string Title,
    string Status,
    DateTimeOffset CreatedAt);
