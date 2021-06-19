/*
Find all Students with FirstName = Antonio
Find all Students with DateOfBirth greater than ‘01.01.1999’
Find all Male students
Find all Students with LastName starting With ‘T’
Find all Students Enrolled in January/1998
Find all Students with LastName starting With ‘J’ enrolled in January/1998
*/

SELECT * FROM dbo.Student
WHERE FirstName = 'Antonio'

SELECT * FROM dbo.Student
WHERE DateOfBirth >= '19990101'

SELECT * FROM dbo.Student
WHERE Gender = 'M'

SELECT * FROM dbo.Student
WHERE LastName LIKE 'S%'

SELECT * FROM dbo.Student
WHERE EnrolledDate BETWEEN '19980101' AND '19980201'

SELECT * FROM dbo.Student
WHERE EnrolledDate BETWEEN '19980101' AND '19980201'
AND LastName LIKE 'J%';
