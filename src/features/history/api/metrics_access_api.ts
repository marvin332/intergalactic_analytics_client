import type { Metric } from "../../aggregator/model";

export type Row = {
     fileName: string;
     isSuccess: boolean;
     date: Date;
     id: string;
};

class MetricsAccessApi {
     public setRow(fileName: string, isSuccess: boolean, metric: Metric | null) {
          const previous = localStorage.getItem("rows");
          const id = self.crypto.randomUUID();
          const row = { id, fileName, isSuccess, date: new Date() };

          if (previous) {
               localStorage.setItem("rows", JSON.stringify([...JSON.parse(previous), row]));
               if (isSuccess && metric) {
                    localStorage.setItem(id, JSON.stringify(metric));
               }
               return;
          }

          localStorage.setItem("rows", JSON.stringify([row]));
          if (isSuccess && metric) {
               localStorage.setItem(id, JSON.stringify(metric));
          }
     }

     public deleteRow(id: string) {
          const json = localStorage.getItem("rows");
          if (json) {
               const rows = JSON.stringify((JSON.parse(json) as Row[]).filter((row) => row.id !== id));
               localStorage.setItem("rows", rows);
               localStorage.removeItem(id);
          }
     }

     public getRows(): Row[] {
          const rows = localStorage.getItem("rows");
          if (rows) {
               return JSON.parse(rows);
          }
          return [];
     }

     public getMetricById(id: string): Metric | void {
          const metric = localStorage.getItem(id);

          if (metric) {
               return JSON.parse(metric) as Metric;
          }
     }

     public toEmptyStorage() {
          localStorage.clear();
     }
}

export const metricsAccessApi = new MetricsAccessApi();
