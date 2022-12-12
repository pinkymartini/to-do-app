using System.ComponentModel.DataAnnotations;

namespace Unnamed.Models
{
    public class StringValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value.ToString()=="HIGH" || value.ToString() == "LOW" || value.ToString() == "MEDIUM")
            {
                return ValidationResult.Success;
            }
            return new ValidationResult("please enter a correct value");
        }
    }
}
