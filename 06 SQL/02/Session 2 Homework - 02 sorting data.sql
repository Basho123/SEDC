/*
Find all Students with FirstName = Antonio ordered by Last Name
List all Students ordered by FirstName
Find all Male students ordered by EnrolledDate, starting from the last enrolled
*/
USE SEDCHome

SELECT * FROM dbo.Student
WHERE FirstName = 'Antonio'
ORDER BY LastName

SELECT * FROM dbo.Student
ORDER BY FirstName

SELECT * FROM dbo.Student
WHERE Gender = 'M'
ORDER BY EnrolledDate DESC



