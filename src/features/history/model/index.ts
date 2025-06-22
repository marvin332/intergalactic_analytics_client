import type { StateCreator } from "zustand";
import type { Store } from "../../../app/store";

import { metricsAccessApi, type Row } from "../api/metrics_access_api.ts";
import type { Metric } from "../../aggregator/model";

export type HistorySlice = {
     rows: Row[];
     metric: Metric | null;
     getRows: () => void;
     getMetric: (id: string) => void;
     deleteRow: (id: string) => void;
     clear: () => void;
};

export const createHistorySlice: StateCreator<Store, [], [], { history: HistorySlice }> = (set, get) => ({
     history: {
          rows: [],
          metric: null,
          getRows: () => {
               const rows = metricsAccessApi.getRows();
               set((state) => ({ ...state, history: { ...state.history, rows } }));
          },
          getMetric: (id) => {
               const metric = metricsAccessApi.getMetricById(id);
               if (!metric) return;
               set((state) => ({ ...state, history: { ...state.history, metric } }));
          },
          deleteRow: (id: string) => {
               const rows = get().history.rows;
               metricsAccessApi.deleteRow(id);
               set((state) => ({ ...state, history: { ...state.history, rows: rows.filter((row) => row.id !== id) } }));
          },

          clear: () => {
               metricsAccessApi.toEmptyStorage();
               set((state) => ({ ...state, history: { ...state.history, rows: [], metric: null } }));
          },
     },
});
