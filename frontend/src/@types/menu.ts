export interface IMenuItem {
    title: string
    route: string
    key: string
    icon: string
    children: Array<IMenuItem>
}