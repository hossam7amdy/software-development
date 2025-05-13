import { WarehouseItem } from './WarehouseItem'

function main() {
  const item = new WarehouseItem('5821')
  console.log(item.describe())

  item.store('1ZH3')
  console.log(item.describe())

  item.deliver('John Smith, 1st Avenue, New York')
  console.log(item.describe())
}

main()
