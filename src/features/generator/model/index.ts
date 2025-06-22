import type { StateCreator } from "zustand";
import type { Store } from "../../../app/store";

import { generatorApi } from "../api/generator.ts";
import type { Status } from "../../../app/types.ts";

export type GeneratorSlice = {
     status: Status;
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
                    await generatorApi.getReport(
                         handle,
                         import.meta.env.VITE_SIZE,
                         import.meta.env.VITE_WITH_ERRORS,
                         import.meta.env.VITE_MAX_SPEND,
                    );
                    setStatus("done");
               } catch (error) {
                    console.log(error);
                    setStatus("error");
               }
          },
     },
});
