import type { StateCreator } from "zustand";
import type { Store } from "../../../app/store";
import { metricsAccessApi } from "../../history/api/metrics_access_api.ts";
import { aggregatorApi } from "../api/aggregator.ts";
import type { Status } from "../../../app/types.ts";

export type Metric = {
     average_spend_galactic: number;
     big_spent_at: number;
     big_spent_civ: string;
     big_spent_value: number;
     less_spent_at: number;
     less_spent_civ: string;
     less_spent_value: number;
     rows_affected: number;
     total_spend_galactic: number;
};

export type AggregatorSlice = {
     metric: Metric | null;
     status: Status;

     setMetric: (metric: Metric | null) => void;
     setStatus: (status: Status) => void;

     fetchToSetMetric: (file: File) => Promise<void>;
};

export const createAggregatorSlice: StateCreator<Store, [], [], { aggregator: AggregatorSlice }> = (set, get) => ({
     aggregator: {
          metric: null,
          status: "active",

          setMetric: (metric) =>
               set((state) => ({
                    aggregator: {
                         ...state.aggregator,
                         metric,
                    },
               })),

          setStatus: (status) =>
               set((state) => ({
                    aggregator: {
                         ...state.aggregator,
                         status,
                    },
               })),

          fetchToSetMetric: async (file) => {
               const { setMetric, setStatus } = get().aggregator;

               setStatus("parsing");
               try {
                    const response = await aggregatorApi.aggregate(10000, file);
                    const textStream = response.body?.pipeThrough(new TextDecoderStream()) as ReadableStream<string>;

                    const reader = textStream.getReader();
                    let buffer = "";

                    while (true) {
                         const { value, done } = await reader.read();
                         if (done) {
                              if (buffer.trim()) {
                                   const obj = JSON.parse(buffer) as Metric;
                                   setMetric(obj);
                              }
                              break;
                         }

                         buffer += value;
                         const lines = buffer.split("\n");
                         buffer = lines.pop() as string;

                         for (const line of lines) {
                              if (line.trim()) {
                                   try {
                                        const obj = JSON.parse(line) as Metric;
                                        // console.log(obj);
                                        if (
                                             obj.average_spend_galactic &&
                                             obj.big_spent_at &&
                                             obj.big_spent_civ &&
                                             obj.big_spent_value &&
                                             obj.less_spent_at &&
                                             obj.less_spent_civ &&
                                             obj.less_spent_value &&
                                             obj.rows_affected &&
                                             obj.total_spend_galactic
                                        ) {
                                             setMetric(obj);
                                        }
                                   } catch (err) {
                                        console.error("Ошибка парсинга JSON:", err, line);
                                   }
                              }
                         }
                    }
                    const metric = get().aggregator.metric;

                    if (metric) {
                         metricsAccessApi.setRow(file.name, true, metric);
                    }

                    setStatus("done");
               } catch (err) {
                    console.error(err);

                    const metric = get().aggregator.metric;
                    console.log("попали");
                    metricsAccessApi.setRow(file.name, false, metric);

                    setMetric(null);
                    setStatus("error");
               }
          },
     },
});
