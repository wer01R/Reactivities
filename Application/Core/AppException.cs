using System;

namespace Application.Core;

public class AppException(int statusCode, string message, string? detail) 
{
    public int StatusCode {get; set;} = statusCode;
    public string Message {get; set;} = message;
    public string? Detail {get; set;} = detail;
}

