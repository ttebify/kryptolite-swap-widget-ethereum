import { createAction } from "@reduxjs/toolkit";
import { DerivedPairDataNormalized, PairDataNormalized, PairDataTimeWindowEnum } from "./types";

export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export const selectCurrency = createAction<{ field: Field; currencyId: string; baseCurrency: string }>(
  "swap/selectCurrency",
);
export const switchCurrencies = createAction<void>("swap/switchCurrencies");
export const typeInput = createAction<{ field: Field; typedValue: string }>("swap/typeInput");
export const replaceSwapState = createAction<{
  field: Field;
  typedValue: string;
  inputCurrencyId?: string;
  outputCurrencyId?: string;
  baseCurrencyId: string;
}>("swap/replaceSwapState");
export const updatePairData = createAction<{
  pairData: PairDataNormalized;
  pairId: string;
  timeWindow: PairDataTimeWindowEnum;
}>("swap/updatePairData");
export const updateDerivedPairData = createAction<{
  pairData: DerivedPairDataNormalized;
  pairId: string;
  timeWindow: PairDataTimeWindowEnum;
}>("swap/updateDerivedPairData");
export const updateSwapBaseCurrency = createAction<{ currencyId: string }>("swap/updateSwapBaseCurrency");
