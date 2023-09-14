create database assetdb;
use assetdb;

create table category
(category_id int primary key,
category_name varchar(100),
lending_period int,
late_fees float,
banning_period int);

create table user
( user_id int primary key,
user_name varchar(100),
user_role varchar(100),
telephone varchar(100),
email varchar(100),
username varchar(100),
pswd varchar(100));

create table asset
(asset_id int primary key, 
asset_name varchar(100) not null,
category_id int,
asset_desc varchar(100),
is_available tinyint(1),
date_added date);

create table borrowedasset
(id int primary key,
asset_id int references asset(asset_id),
user_id int references user(user_id),
is_returned tinyint(1),
borrowing_date date);



