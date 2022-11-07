import { BAD_SRCS } from "../components/Logo/index";
import { BASE_NETWORK_SCAN_URL } from "../config/constants";

import getRpcUrl from "./getRpcUrl";

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = parseInt(process.env.GATSBY_CHAIN_ID!, 10);
    try {
      if (!provider.request)
        throw new Error("Can't setup the network on metamask because window.ethereum.request is undefined");

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902 && provider.request) {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: "Ethereum Mainnet",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: [getRpcUrl()],
                blockExplorerUrls: [`${BASE_NETWORK_SCAN_URL}/`],
              },
            ],
          });
          return true;
        }
        // handle other "switch" errors
      }
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error("Can't setup the network on metamask because window.ethereum is undefined");
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenLogo?: string,
) => {
  // better leave this undefined for default image instead of broken image url
  const image = tokenLogo ? (BAD_SRCS[tokenLogo] ? undefined : tokenLogo) : undefined;

  const tokenAdded =
    window.ethereum?.request &&
    (await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image,
        },
      },
    }));

  return tokenAdded;
};
