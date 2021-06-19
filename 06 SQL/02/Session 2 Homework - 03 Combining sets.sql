/*
List all Teacher First Names and Student First Names in single result set with duplicates
List all Teacher Last Names and Student Last Names in single result set. Remove duplicates
List all common First Names for Teachers and Students
*/

USE SEDCHome

SELECT FirstName from dbo.TeacherUNION ALLSELECT FirstName from dbo.StudentSELECT LastName FROM dbo.TeacherUNIONSELECT LastName FROM dbo.StudentSELECT FirstName from dbo.TeacherINTERSECTSELECT FirstName from dbo.Student
