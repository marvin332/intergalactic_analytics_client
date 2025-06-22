import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createGeneratorSlice, type GeneratorSlice } from "../../features/generator/model";
import { type AggregatorSlice, createAggregatorSlice } from "../../features/aggregator/model";
import { createHistorySlice, type HistorySlice } from "../../features/history/model";

export type Store = { generator: GeneratorSlice } & { aggregator: AggregatorSlice } & { history: HistorySlice };

export const useStore = create<Store>()(
     devtools((...a) => ({
          ...createGeneratorSlice(...a),
          ...createAggregatorSlice(...a),
          ...createHistorySlice(...a),
     })),
);
