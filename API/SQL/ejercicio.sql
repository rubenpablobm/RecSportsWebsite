CALL MasAforo(1);
SELECT * FROM 'Aforo';
CALL MenosAforo(1);
SELECT * FROM 'Aforo';

--hacer una consulta de FK en Azure SQL
SELECT name, type_desc
FROM sys.objects
WHERE parent_object_id = OBJECT_ID('NOMBRE_TABLA') AND type_desc LIKE '%CONSTRAINT';

update [dbo].[Area] set idAforo=0 where IdArea=1;
alter table [dbo].[Area] drop column idAforo;
select * from [dbo].[Area];

ALTER TABLE [dbo].[Aforo] ADD UNIQUE (IdArea);
