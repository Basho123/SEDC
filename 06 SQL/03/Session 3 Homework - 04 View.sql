/*

 */

 use SEDCHome

 select * from dbo.Student

 select * from dbo.Grade
 ORDER BY Grade

 select * from dbo.Course
 select * from dbo.AchievementType


 select * from dbo.GradeDetails


 --Create new view (vv_StudentGrades) that will List all StudentIds and count of Grades per student
 CREATE OR ALTER VIEW vv_StudentGrades
 AS
 select s.ID as [Student ID], COUNT(Grade) as StudentGrades
 from dbo.Grade
 INNER JOIN dbo.Student s on dbo.Grade.StudentID = s.ID
 GROUP BY s.ID
 go

 select * from vv_StudentGrades
 
-- Change the view to show Student First and Last Names instead of StudentID
 ALTER VIEW vv_StudentGrades
 AS
 select s.FirstName as [Student First Name],s.LastName as [Student Last Name], COUNT(Grade) as StudentGradesCount
 from dbo.Grade
 INNER JOIN dbo.Student s on dbo.Grade.StudentID = s.ID
 GROUP BY s.FirstName,s.LastName
 go

 select * from vv_StudentGrades 

 --List all rows from view ordered by biggest Grade Count
 select * from vv_StudentGrades
 ORDER BY StudentGradesCount DESC
 
-- Create new view (vv_StudentGradeDetails) that will List all Students (FirstName and LastName) and Count the courses he passed through the exam(Ispit) 
create or alter view vv_StudentGradeDetails
	as
	select s.FirstName as [Student First Name],s.LastName as [Student Last Name], COUNT(CourseID) as [Courses passed]
	from dbo.Grade g
	INNER JOIN dbo.Student s on g.StudentID = s.ID
	GROUP BY s.FirstName, s.LastName
	go

	select * from vv_StudentGradeDetails
	order by [Courses passed]

