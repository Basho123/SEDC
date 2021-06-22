

/*
Declare scalar variable for storing FirstName values
	Assign value ‘Antonio’ to the FirstName variable
	Find all Students having FirstName same as the variable	
*/

USE SEDCHome
DECLARE @FirstName nvarchar(100)
set @FirstName = 'Antonio'

select * from dbo.Student s
where s.FirstName = @FirstName

/*
Declare table variable that will contain StudentId, Student Name and DateOfBirth
	Fill the table variable with all Female students
*/

declare @StudentList table
(StudentId int, [Student Name] NVARCHAR(100), DateOfBirth date);
insert into @StudentList
select Id, FirstName, DateOfBirth
from dbo.Student
where Gender = 'F'

select * from @StudentList
go


/*
Declare temp table that will contain LastName and EnrolledDate columns
	Fill the temp table with all Male students having First Name starting with ‘A’
	Retrieve the students from the table which last name is with 7 characters
*/

drop table if exists #Enroled
create table #Enroled 
([Last Name] NVARCHAR(100), [Enrolled Date] date)
insert into #Enroled
select s.LastName as [Male Students Last Names], s.EnrolledDate as [Enrolled Date Of Students]
from dbo.Student s
where s.FirstName like 'A%' AND Gender = 'M'


select * from #Enroled
order by [Enrolled Date] desc


/*
Find all teachers whose FirstName length is less than 5
	, and the first 3 characters of their FirstName and LastName are the same
*/

select * from dbo.Teacher
where len(FirstName) < 5 and SUBSTRING(FirstName,0,4) = SUBSTRING(LastName,0,4)