import { drinkItem } from "./drink.menu";
import { foodItem } from "./food.menu";

export interface Order{

    id?: number,
    foods?: any[];
    tableId?: number;
    creation?: Date
    waiterId?: number;
    items?: string;
    status?: string;
    deviceId?: any;
    total?: number;

}