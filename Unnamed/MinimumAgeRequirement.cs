using Microsoft.AspNetCore.Authorization;

namespace Unnamed
{
    public class MinimumAgeRequirement: IAuthorizationRequirement
    {
        public MinimumAgeRequirement(int minimumAge) => MinimumAge = minimumAge;

        public int MinimumAge { get; }
    }
}
