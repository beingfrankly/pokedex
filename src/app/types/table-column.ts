export type Column<T> = {
  label: string,
  value: keyof T
  sortable: boolean
}
