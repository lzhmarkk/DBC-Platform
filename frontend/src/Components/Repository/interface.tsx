import React from "react";

export interface IRepo {
    repo_id: string
    place: string
    name: string
    admin_id: string
    repo_capacity: string
    repo_occupy: string
}

export interface IRepoMess {
    repo_mess_id: string
    repo_mess_info: string
    repo_id: string
    direction: string
    quantity: string
    prod_id: string
    order_id: string
}

export interface IWorkMess {
    work_mess_id: string
    work_mess_info: string
    admin_id: string
    direction: string
    quantity: string
    prod_id: string
    order_id: string
}

export interface IProd {
    prod_id: string
    prod_name: string
    prod_desc: string
}

export interface IOrder {
    order_id: string
    order_date: string
    cust_id: string
    state: string
    order_info:string
}

export interface IRepoItem {
    repo_item: string,
    repo_id: string
    prod_id: string
    quantity: string
}