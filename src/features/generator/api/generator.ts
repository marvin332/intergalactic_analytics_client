class GeneratorApi {
     public async getReport(handle: FileSystemFileHandle, size: number, withErrors?: "off" | "on", maxSpend?: string) {
          const params: Record<string, string> = { size: size.toString() };
          if (withErrors) params.withErrors = withErrors;
          if (maxSpend) params.maxSpend = maxSpend;
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/report?${new URLSearchParams(params)}`, {
               method: "GET",
          });
          if (!response.ok || !response.body) {
               throw new Error(`Ошибка ${response.status}`);
          }

          const writable = await handle.createWritable();

          if (response.body.pipeTo) {
               await response.body.pipeTo(writable, { preventClose: true });
               await writable.close();
          } else {
               const reader = response.body.getReader();
               const writer = writable.getWriter();
               while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    await writer.write(value);
               }
               await writer.close();
          }
     }
}

export const generatorApi = new GeneratorApi();
