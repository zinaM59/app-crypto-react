import { cryptoData, cryptoAssets } from "./data"

export function fakeFetchCrypto() {
   return new Promise((resolve) => {
      setTimeout(() => { resolve(cryptoData) }, 10)

   })
}
export function fetchAssetes() {
   return new Promise((resolve) => {
      setTimeout(() => { resolve(cryptoAssets) }, 10)
   })
}