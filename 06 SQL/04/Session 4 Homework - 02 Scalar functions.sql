/*
Declare scalar function (fn_FormatStudentName) for retrieving the Student description for specific StudentId in the following format:
	- StudentCardNumber without “sc-”
	- “ – “
	- First character of student FirstName
	- “.”
	- Student LastName
	
	example:
	sc-77712 => 77712-P.Manaskov

*/

use SEDCHome
drop function if exists dbo.fn_FormatStudentName
go
create function dbo.fn_FormatStudentName (@StudentId int)
returns NVARCHAR(100)
as
begin
declare @Output NVARCHAR(100)
select @Output = SUBSTRING(StudentCardNumber, 4,8) +' - '+ left(FirstName,1) + '. ' + LastName
from dbo.Student
where ID = @StudentId;
return @Output
end 
go

select dbo.fn_FormatStudentName (s.ID) as [Short info for students]
from dbo.Student s
order by [Short info for students]