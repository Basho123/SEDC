use SEDCHome

--Calculate the count of all grades per Teacher in the system and filter only grade count greater then 200

SELECT t.FirstName as TeacherName, COUNT(Grade) as GradeCount
FROM dbo.Grade
join dbo.Teacher t on Grade.TeacherID = t.ID
GROUP BY t.FirstName
HAVING COUNT(Grade) > 200
GO


--Calculate the count of all grades per Teacher in the system for first 100 Students (ID < 100) and filter teachers with more than 50 Grade count
SELECT t.FirstName as [Teacher First Name], COUNT(Grade) as GradeCountForFirst100Students
FROM dbo.Grade g
JOIN dbo.Teacher t on g.TeacherID = t.ID
WHERE StudentID < 100
GROUP BY t.FirstName
HAVING COUNT(Grade) > 50



--Find the Grade Count, Maximal Grade, and the Average Grade per Student on all grades in the system. Filter only records where Maximal Grade is equal to Average Grade
--List Student First Name and Last Name next to the other details from previous query

SELECT s.ID, s.FirstName, s.LastName, COUNT(Grade) as GradeCountForStudent, AVG(Grade) as [Average grade for student], MAX(Grade) as [Maximal grade for student]
from dbo.Grade g
JOIN dbo.Student s on g.StudentID = s.ID
GROUP BY s.ID, s.FirstName, s.LastName
HAVING AVG(Grade)= MAX(Grade)
GO





