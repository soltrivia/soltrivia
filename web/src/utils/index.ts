

export function formatAddress(address:string,size = 4){
  return address.slice(0,size)+'..'+address.slice(-size)
}