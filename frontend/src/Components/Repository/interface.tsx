import React from "react";

export interface IRepositoryRecord {
    repo_id: string
    place: string
    name: string
    admin_id: string
    repo_capacity: string
    repo_occupy: string
}

export interface IRepositoryMessRecord {
    repo_mess_id: string
    repo_mess_info: string
    repo_id: string
    direction: string
    quantity: string
    prod_id: string
    order_id: string
}

export interface IWorkMessRecord {
    work_mess_id: string
    work_mess_info: string
    admin_id: string
    direction: string
    quantity: string
    prod_id: string
    order_id: string
}