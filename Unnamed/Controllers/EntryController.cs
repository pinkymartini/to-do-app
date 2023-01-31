﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Unnamed.Data;
using Unnamed.Models;
using Unnamed.Services;

namespace Unnamed.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize(Policy = "AtLeast21")]
    public class EntryController : Controller
    {
        private readonly IEntryService _entryService;

        private readonly ToDoListDbContext _db;


        AuthorizationFilterContext context;

        public EntryController(IEntryService entryService, ToDoListDbContext db)
        {
            _entryService = entryService;
            _db = db;
        }

       
        [HttpGet]
        [Authorize(Roles = "Admin, Visitor ") ]
        //[CustomAuthFilter]
        public async Task<IActionResult> getEntries()
        {
            var entries = await _entryService.getEntries();

          
            return Ok(entries);
        }

        [HttpGet]
        [Route("/getPagedEntries")]
        //[AllowAnonymous]
        public async Task<IActionResult> getPagedEntries([FromQuery] ListParameters listParameters)
        {
            var entries = await _entryService.getPagedEntries(listParameters);

            return Ok(entries);

        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> getEntry([FromRoute] Guid id)
        {
            var entry = await _entryService.getEntry(id);

            if (entry == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(entry);
            }
        }

        [HttpPut]
        [Route("{id:Guid}")]
       // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> updateEntry([FromRoute] Guid id, Entry updatedEntry)
        {
            var entry = await _entryService.updateEntry(id, updatedEntry);

            Debug.WriteLine(entry);

            if (entry == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(entry);

            }

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> deleteEntry([FromRoute] Guid id)
        {
            var entry = await _entryService.deleteEntry(id);

            if (entry == null)
            {
                return NotFound("Entry cannot be found");
            }
            else
            {
                return Ok();

            }


        }

    




    }
}
