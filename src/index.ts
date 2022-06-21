import detectEthereumProvider from '@metamask/detect-provider'
import { ethers, providers, utils } from 'ethers'
import Vesting from './abis/Vesting'
import Erc20 from './abis/Erc20'
import Factory from './abis/Factory'
import { ethBalance } from './utils'

class SmartContractLinearVesting {
  handleWeb3Provider: () => Promise<any> = async () => {
    const provider: any = await detectEthereumProvider()
    const web3Provider = new providers.Web3Provider(provider)

    return web3Provider
  }
  handleGetDetailInfoAddress = async (pool: string, account: string) => {
    if (!account) {
      return null
    }

    const web3Provider = await this.handleWeb3Provider()
    const vestingInstance = new ethers.Contract(
      pool,
      Vesting,
      web3Provider.getSigner()
    )
    const grant = await vestingInstance.getTokenGrant(account)
    const amount = ethBalance(grant.amount)
    const claimable = await vestingInstance.calculateGrantClaim(account)

    return {
      address: pool,
      amount,
      claimed: ethBalance(grant.totalClaimed),
      claimable: ethBalance(claimable),
      remain: amount - ethBalance(grant.totalClaimed) - ethBalance(claimable),
    }
  }
  handleGetErc20Balance = async (account: string, token: string) => {
    const web3Provider = await this.handleWeb3Provider()

    const Erc20Instance = new ethers.Contract(
      token,
      Erc20,
      web3Provider.getSigner()
    )
    const balance = await Erc20Instance.balanceOf(account)

    return ethBalance(balance)
  }
  handleClaim = async (address = '') => {
    const web3Provider = await this.handleWeb3Provider()
    const vestingInstance = new ethers.Contract(
      address,
      Vesting,
      web3Provider.getSigner()
    )

    return await vestingInstance.claimVestedTokens()
  }
  handleChangeStakeholder = async (
    prevStakeholder: string,
    newStakeholder: string,
    address = ''
  ) => {
    const web3Provider = await this.handleWeb3Provider()
    const vestingInstance = new ethers.Contract(
      address,
      Vesting,
      web3Provider.getSigner()
    )

    return await vestingInstance.changeInvestor(prevStakeholder, newStakeholder)
  }
  handleApproveStakeholders = async (
    poolAddress: string,
    token = '',
    amount = 0
  ) => {
    const web3Provider = await this.handleWeb3Provider()

    const ERC20Instance = new ethers.Contract(
      token,
      Erc20,
      web3Provider.getSigner()
    )

    return await ERC20Instance.approve(
      poolAddress,
      utils.parseEther(amount.toString())
    )
  }
  handleAddStakeholders = async (poolAddress: string, amountList = []) => {
    const web3Provider = await this.handleWeb3Provider()
    const vestingInstance = new ethers.Contract(
      poolAddress,
      Vesting,
      web3Provider.getSigner()
    )

    return await vestingInstance.addTokenGrants(poolAddress, amountList)
  }
  handleCreatePool = async (
    name: string,
    token = '',
    start: number,
    duration: number
  ) => {
    const web3Provider = await this.handleWeb3Provider()
    const contract = new ethers.Contract(
      process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS || '',
      Factory,
      web3Provider.getSigner()
    )
    return await contract.createFullPool(name, token, start, duration)
  }
  handleTransferOwnership = async (
    poolAddress: string,
    valueAddress: string
  ) => {
    const web3Provider = await this.handleWeb3Provider()
    const vestingInstance = new ethers.Contract(
      poolAddress,
      Vesting,
      web3Provider.getSigner()
    )

    return await vestingInstance.changeAdmin(valueAddress)
  }
  handleAddManager = async (
    poolAddress = '',
    token: string,
    itemManager: string
  ) => {
    const web3Provider = await this.handleWeb3Provider()

    const vestingInstance = new ethers.Contract(
      poolAddress,
      Vesting,
      web3Provider.getSigner()
    )
    return await vestingInstance.grantRole(token, itemManager)
  }
  handleRemoveManager = async (
    poolAddress = '',
    token: string,
    itemManager: string
  ) => {
    const web3Provider = await this.handleWeb3Provider()

    const vestingInstance = new ethers.Contract(
      poolAddress,
      Vesting,
      web3Provider.getSigner()
    )
    return await vestingInstance.revokeRole(token, itemManager)
  }
}

export default SmartContractLinearVesting
