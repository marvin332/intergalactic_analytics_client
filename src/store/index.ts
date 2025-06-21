import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createGeneratorSlice, type GeneratorSlice } from "./generator";
import { type AggregatorSlice, createAggregatorSlice } from "./aggregator";
import { createHistorySlice, type HistorySlice } from "./history";

export type Store = { generator: GeneratorSlice } & { aggregator: AggregatorSlice } & { history: HistorySlice };

export const useStore = create<Store>()(
     devtools((...a) => ({
          ...createGeneratorSlice(...a),
          ...createAggregatorSlice(...a),
          ...createHistorySlice(...a),
     })),
);
