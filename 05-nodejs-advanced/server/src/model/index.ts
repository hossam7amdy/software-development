import { PoolConnection, ResultSetHeader } from "mysql2/promise";

import { mysql } from "../services/mysql";

export const PLACEHOLDER = "SCHEMA";

const SqlDataStore = {};

export const db = SqlDataStore;
