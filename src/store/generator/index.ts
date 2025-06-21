import type { StateCreator } from "zustand";
import type { Store } from "../index.ts";
import { analyticsApi } from "../../api/analytics_api.ts";

export type GeneratorSlice = {
     status: "active" | "process" | "parsing" | "done" | "error";
     setStatus: (status: GeneratorSlice["status"]) => void;
     fetchToGenerate: (handle: FileSystemFileHandle) => void;
};

export const createGeneratorSlice: StateCreator<Store, [], [], { generator: GeneratorSlice }> = (set, get) => ({
     generator: {
          status: "active",
          setStatus: (status) => {
               set((state) => ({
                    generator: {
                         ...state.generator,
                         status,
                    },
               }));
          },
          fetchToGenerate: async (handle) => {
               const { setStatus } = get().generator;

               setStatus("parsing");

               try {
                    await analyticsApi.getReport(handle, 0.01, "on");
                    setStatus("done");
               } catch (error) {
                    console.log(error);
                    setStatus("error");
               }
          },
     },
});
