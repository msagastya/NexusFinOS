export declare const databaseSchema: Readonly<{
    version: import("@nozbe/watermelondb/Schema").SchemaVersion;
    tables: import("@nozbe/watermelondb/Schema").TableMap;
    unsafeSql?: (_: string, __: import("@nozbe/watermelondb/Schema").AppSchemaUnsafeSqlKind) => string;
}>;
