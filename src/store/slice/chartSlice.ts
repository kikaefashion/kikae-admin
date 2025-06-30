import { StateCreator } from "zustand";

export type ChartState = {
  
    totalUsersThreeMonths: number;
    totalUsersSixMonths: number;
    totalUsersOneYear: number;
    totalUsers: {
        totalLast3Months: number;
        totalLast6Months: number;
        totalLast1Year: number;
    }

    };

  export  type ChartActions = {

            setTotalUsersThreeMonths: (data: number) => void;
            setTotalUsersSixMonths: (data: number) => void;
            setTotalUsersOneYear: (data: number) => void;
            setTotalUsers: (totalUsers: {
                 totalLast3Months: number;
        totalLast6Months: number;
        totalLast1Year: number;

            }) => void;
    }

    const initialState: ChartState = {
     
        totalUsersThreeMonths: 0,
        totalUsersSixMonths: 0,
        totalUsersOneYear: 0,
        totalUsers: {
            totalLast3Months: 0,
            totalLast6Months: 0,
            totalLast1Year: 0,}                               
    };



export const createChartSlice: StateCreator<ChartState & ChartActions> = (set) => ({
    ...initialState,

    setTotalUsersThreeMonths: (data) => {
        set(() => ({
            totalUsersThreeMonths: data,
        }));
    },
    setTotalUsersSixMonths: (data) => {
        set(() => ({
            totalUsersSixMonths: data,
        }));
    },
    setTotalUsersOneYear: (data) => {
        set(() => ({
            totalUsersOneYear: data,
        }));
    },
    setTotalUsers: (data) => {
        set(() => ({
            totalUsers: data,
        }));
    },
    
});

    