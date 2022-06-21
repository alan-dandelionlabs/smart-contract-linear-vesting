import { utils } from 'ethers'

export const ethBalance = (balance: any) => {
  if (!balance) return 0
  const result = parseFloat(utils.formatEther(balance))
  return result
}
