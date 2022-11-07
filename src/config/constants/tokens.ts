import { Token } from "../entities/token";
import { serializeToken } from "../../state/user/hooks/helpers";
import { SerializedToken } from "./types";
import { ChainId } from "./networks";

const { MAINNET } = ChainId;

interface TokenList {
  [symbol: string]: Token;
}

const defineTokens = <T extends TokenList>(t: T) => t;

interface SerializedTokenList {
  [symbol: string]: SerializedToken;
}

export const mainnetTokens = defineTokens({
  busd: new Token(
    MAINNET,
    "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    18,
    "BUSD",
    "Binance USD",
    "https://www.paxos.com/busd/"
  ),
  usdt: new Token(
    MAINNET,
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    6,
    "USDT",
    "Tether USD",
    "https://tether.to/"
  ),
  weth: new Token(
    MAINNET,
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    18,
    "WETH",
    "Wrapped Ether",
    "https://weth.io/"
  ),
  bnb: new Token(
    MAINNET,
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    18,
    "BNB",
    "BNB",
    "https://www.binance.com/"
  ),
  eth: new Token(
    MAINNET,
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    18,
    "ETH",
    "Ethereum Token",
    "https://ethereum.org/en/"
  ),
  usdc: new Token(
    MAINNET,
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    6,
    "USDC",
    "USD Coin",
    "https://www.centre.io/usdc"
  ),
  wbtc: new Token(
    MAINNET,
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    8,
    "WBTC",
    "Wrapped BTC",
    "https://www.wbtc.network/"
  ),
});

export const testnetTokens = defineTokens({} as const);

const tokens = () => {
  const chainId = process.env.GATSBY_CHAIN_ID!;

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      // @ts-ignore
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] };
    }, {} as typeof testnetTokens & typeof mainnetTokens);
  }

  return mainnetTokens;
};

const unserializedTokens = tokens();

export const serializeTokens = () => {
  const serializedTokens = Object.keys(unserializedTokens).reduce(
    (accum, key) => {
      //@ts-ignore
      return { ...accum, [key]: serializeToken(unserializedTokens[key]) };
    },
    {} as SerializedTokenList
  );

  return serializedTokens;
};

export default unserializedTokens;
