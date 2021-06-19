/*
List all possible combinations of Courses names and AchievementType names that can be passed by student
List all Teachers that has any exam Grade
List all Teachers without exam Grade
List all Students without exam Grade (using Right Join)
*/

SELECT s.FirstName as StudentName, a.Name as AchievmentType
from dbo.Student s
CROSS JOIN dbo.AchievementType a
GO

SELECT DISTINCT t.FirstName
FROM dbo.Teacher t
LEFT JOIN dbo.Grade g ON g.TeacherID = t.ID
GO

SELECT t.FirstName, g.TeacherID AS 'Grade id'
FROM dbo.Teacher t
LEFT JOIN dbo.Grade g ON g.TeacherID = t.ID
WHERE g.TeacherID IS NULL
GO

SELECT s.FirstName, g.StudentID AS 'Grade id'
FROM dbo.Grade G
RIGHT JOIN dbo.Student S ON s.ID = g.StudentID
GO

