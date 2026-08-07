using Api.Auth;
using Api.Data;
using Api.Domain;
using Api.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

/// <summary>
/// Phase 1 placeholder — ownership filter is the teaching point (IDOR).
/// Full CRUD + status history lands in Phase 2.
/// </summary>
[ApiController]
[Authorize]
[Route("api/applications")]
public class ApplicationsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ApplicationResponse>>> List(
        CancellationToken cancellationToken)
    {
        var userId = CurrentUser.GetUserId(User);

        var items = await db.Applications.AsNoTracking()
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new ApplicationResponse(
                a.Id, a.Company, a.Title, a.Status, a.CreatedAt))
            .ToListAsync(cancellationToken);

        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<ApplicationResponse>> Create(
        [FromBody] CreateApplicationRequest request,
        CancellationToken cancellationToken)
    {
        // Hotspot: UserId from server identity — never from body
        var userId = CurrentUser.GetUserId(User);
        var now = DateTimeOffset.UtcNow;

        var entity = new JobApplication
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Company = request.Company.Trim(),
            Title = request.Title.Trim(),
            Status = "Wishlist",
            CreatedAt = now,
            UpdatedAt = now,
        };

        db.Applications.Add(entity);
        await db.SaveChangesAsync(cancellationToken);

        var response = new ApplicationResponse(
            entity.Id, entity.Company, entity.Title, entity.Status, entity.CreatedAt);

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApplicationResponse>> GetById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var userId = CurrentUser.GetUserId(User);

        // Hotspot: filter by both id AND userId → cross-user id looks like "not found" (404)
        var entity = await db.Applications.AsNoTracking()
            .Where(a => a.Id == id && a.UserId == userId)
            .SingleOrDefaultAsync(cancellationToken);

        if (entity is null)
        {
            return NotFound();
        }

        return Ok(new ApplicationResponse(
            entity.Id, entity.Company, entity.Title, entity.Status, entity.CreatedAt));
    }
}
