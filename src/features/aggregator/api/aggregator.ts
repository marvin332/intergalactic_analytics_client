class AggregatorApi {
     public async aggregate(rows: number, file: File): Promise<Response> {
          const formData = new FormData();

          formData.append("file", file);

          const response = await fetch(
               `${import.meta.env.VITE_API_BASE_URL}/aggregate?${new URLSearchParams({ rows: String(rows) })}`,
               { method: "POST", body: formData },
          );

          if (!response.ok) {
               throw new Error(`Сервер вернул ${response.status}`);
          }

          if (!response.body) {
               throw new Error("error");
          }

          return response;
     }
}

export const aggregatorApi = new AggregatorApi();
