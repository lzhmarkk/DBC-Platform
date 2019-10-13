create table if not exists orders (
	order_id int not null auto_increment primary key,
    order_date timestamp not null default current_timestamp()
);

create table if not exists products (
	prod_id int not null auto_increment primary key,
    prod_name char(50) not null,
    prod_desc text
);

create table if not exists orderitems (
	order_item int not null auto_increment primary key,
    quantity int not null,
    order_id int not null,
    prod_id int not null,
    
    foreign key (order_id) references orders (order_id) on delete cascade,
    foreign key (prod_id) references products (prod_id)
);
