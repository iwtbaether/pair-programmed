import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

enum Stats {
    ticks = "ticks",
    accountCreated = "accountCreated",
}

export type StatsState = {
    [key in Stats]: number;
};

const initialState: StatsState = {
    ticks: 0,
    accountCreated: Date.now(),
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        incrementStat: (state, action: PayloadAction<Stats>) => {
            state[action.payload] += 1;
        }
    }
})

export const selectTicks = (state: RootState) => state.stats.ticks;
export const selectAccountCreated = (state: RootState) => state.stats.accountCreated;
