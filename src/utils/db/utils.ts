import type { AnyColumn, InferColumnsDataTypes, SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";

export function jsonBuildObject<T extends Record<string, AnyColumn>>(
  shape: T,
): SQL<InferColumnsDataTypes<T>>;
export function jsonBuildObject(
  shape: Record<string, AnyColumn | SQL>,
): SQL<any>;
export function jsonBuildObject(shape: Record<string, AnyColumn | SQL>) {
  const chunks = Object.entries(shape).flatMap(([key, value]) => [
    sql.raw(`'${key}'`),
    value,
  ]);

  return sql`json_build_object(${sql.join(chunks, sql`, `)})`;
}

export function jsonAgg<T extends Record<string, AnyColumn>>(shape: T) {
  return sql<InferColumnsDataTypes<T>[]>`json_agg(${jsonBuildObject(shape)})`;
}
