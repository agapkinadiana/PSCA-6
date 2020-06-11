create database UNIVERSITY;
use UNIVERSITY;

create table FACULTY (
	FACULTY varchar(100),
    FACULTY_NAME varchar(100),
    primary key(FACULTY)
);

create table PULPIT (
	PULPIT varchar(100),
    PULPIT_NAME varchar(100),
    FACULTY varchar(100),
    primary key(PULPIT),
    foreign key(FACULTY) references FACULTY(FACULTY)
);

create table TEACHER (
	TEACHER varchar(100),
    TEACHER_NAME varchar(100),
    PULPIT varchar(100),
    primary key(TEACHER),
    foreign key(PULPIT) references PULPIT(PULPIT)
);

create table SUBJECT (
	SUBJECT varchar(100),
    SUBJECT_NAME varchar(100),
    PULPIT varchar(100),
    primary key(SUBJECT),
    foreign key(PULPIT) references PULPIT(PULPIT)
);

create table AUDITORIUM_TYPE (
	AUDITORIUM_TYPE varchar(100),
    AUDITORIUM_TYPENAME varchar(100),
    primary key(AUDITORIUM_TYPE)
);

create table AUDITORIUM (
	AUDITORIUM varchar(100),
    AUDITORIUM_NAME varchar(100),
    AUDITORIUM_CAPACITY int,
    AUDITORIUM_TYPE varchar(100),
    primary key(AUDITORIUM),
    foreign key(AUDITORIUM_TYPE) references AUDITORIUM_TYPE(AUDITORIUM_TYPE)
);

insert into FACULTY values ('LH', 'LH'); 
select * from FACULTY;