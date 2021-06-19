/*
Change GradeDetails table always to insert value 100 in AchievementMaxPoints column if no value is provided on insert
Change GradeDetails table to prevent inserting AchievementPoints that will more than AchievementMaxPoints
Change AchievementType table to guarantee unique names across the Achievement types
*/
USE SEDCHome

ALTER TABLE dbo.GradeDetails
ADD CONSTRAINT DF_Achievment_Default_Max_Points
DEFAULT 100 FOR AchievementMaxPoints
GO

ALTER TABLE dbo.GradeDetails
ADD CONSTRAINT DF_Prevent_Achievement_Points_More_Than_Max
CHECK (AchievementPoints <= AchievementMaxPoints)
GO

ALTER TABLE dbo.AchievementType
ADD CONSTRAINT UC_Name UNIQUE (Name)
GO