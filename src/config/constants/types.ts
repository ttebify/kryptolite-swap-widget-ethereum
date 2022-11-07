import JSBI from "jsbi";

export interface Address {
  97?: string;
  1: string;
}

// exports for external consumption
export type BigintIsh = JSBI | bigint | string;

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN = 0,
  ROUND_HALF_UP = 1,
  ROUND_UP = 2,
}

export type RecognizedChainId = 1 | 2 | 3 | 4 | 42 | 56 | 97;

export interface SerializedToken {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  projectLink?: string;
}

export enum SolidityType {
  uint8 = "uint8",
  uint256 = "uint256",
}

export const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

export const INIT_CODE_HASH = "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f";

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const TWO = JSBI.BigInt(2);
export const THREE = JSBI.BigInt(3);
export const FIVE = JSBI.BigInt(5);
export const TEN = JSBI.BigInt(10);
export const _100 = JSBI.BigInt(100);
export const FEES_NUMERATOR = JSBI.BigInt(9975);
export const FEES_DENOMINATOR = JSBI.BigInt(10000);

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt("0xff"),
  [SolidityType.uint256]: JSBI.BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
};

export enum FetchStatus {
  Idle = "IDLE",
  Fetching = "FETCHING",
  Fetched = "FETCHED",
  Failed = "FAILED",
}
