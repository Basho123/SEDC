/*
*/

USE SEDCHome

--SELECT * FROM dbo.Grade
--SELECT * FROM dbo.Teacher

--Calculate the count of all grades in the system
SELECT COUNT(Grade) as [Count of all grades]
from dbo.Grade
GO

--Calculate the count of all grades per Teacher in the system
SELECT t.FirstName, COUNT(Grade) as [Count of all grades per teacher]
FROM dbo.Grade g
JOIN dbo.Teacher t on g.TeacherID = t.ID
GROUP BY t.FirstName
GO

--Calculate the count of all grades per Teacher in the system for first 100 Students (ID < 100)
SELECT t.FirstName as TeacherFirstName,  COUNT(Grade) as [Count of all grades per teacher for first 100 students]
FROM dbo.Grade g
JOIN dbo.Teacher t on g.TeacherID = t.ID
WHERE StudentID < 100
GROUP BY t.FirstName
Order by COUNT(Grade)
GO

--Find the Maximal Grade, and the Average Grade per Student on all grades in the system
SELECT s.FirstName as studentFirstName, AVG(Grade) as [Average grade of student], MAX(Grade) as [Maximum grade of student]
from dbo.Grade g
join dbo.Student s on g.StudentID = s.ID
group by s.FirstName